/* Scene3D — renders an Iso3D scene into the shared page canvas via drei <View>.
   Falls back to the original SVG composition when WebGL is unavailable or a
   scene throws at render time (per-view error boundary keeps one bad scene
   from taking down the page). */
import { Component, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { SCENES, WORLD, CAM_TARGETS } from "./scenes";
import { reportViewVisible } from "./viewVisibility";
import { SceneActiveContext } from "./sceneFrame";
import { queueIdleMount } from "./idleMount";

/* The Canvas default orthographic camera (zoom 45) is the ONE camera every
   view renders with — per-scene makeDefault cameras would stomp it and break
   every other illustration. Each scene is instead fit-scaled about its look-at
   target so it fills its section exactly. */
const BASE_ZOOM = 45;

/* Single shared WebGL-capability probe — one throwaway context for the whole
   app, released via WEBGL_lose_context, so section checks never accumulate
   contexts ("Too many active WebGL contexts" console spam). */
let GL_SUPPORTED = null;
export function glSupported() {
  if (GL_SUPPORTED === null) {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      GL_SUPPORTED = !!gl;
      if (gl) {
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      }
    } catch (e) {
      GL_SUPPORTED = false;
    }
  }
  return GL_SUPPORTED;
}


class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* Uploads geometries/textures and compiles this scene's programs the moment it
   is built (in an idle slot) instead of on the frame it first becomes visible —
   so scrolling into a section never pays the first-render cost. */
function Prewarm() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    try {
      if (gl.compileAsync) gl.compileAsync(scene, camera).catch(() => {});
      else gl.compile(scene, camera);
    } catch (e) {
      /* pre-warm is best-effort */
    }
  }, [gl, scene, camera]);
  return null;
}

function SceneHost({ scene, props, input, reduce, visible, zoom, onReady, gate }) {
  const Scene = SCENES[scene];
  /* Fit-scale about the scene's look-at target: the shared camera (zoom 45)
     then renders the scene exactly fitted to its section, for every view,
     regardless of mount order. */
  const s = (zoom || BASE_ZOOM) / BASE_ZOOM;
  const t = CAM_TARGETS[scene] || [0, 0, 0];
  /* Two rAFs past mount = the scene's first painted frame — signal the host so
     it can cross-fade the SVG stage out instead of hard-swapping. */
  useEffect(() => {
    if (!onReady) return undefined;
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  if (!Scene) return null;
  return (
    <SceneActiveContext.Provider value={gate}>
      <group scale={s} position={[-t[0] * s, -t[1] * s, -t[2] * s]}>
        <Scene input={input} reduce={reduce} visible={visible} zoom={zoom} {...props} />
      </group>
      <Prewarm />
    </SceneActiveContext.Provider>
  );
}

function fitZoom(size, world) {
  if (!size) return null;
  return Math.min(size.w / world.w, size.h / world.h) * 0.94;
}

export default function Scene3D({ scene, props = {}, fallback, className = "", style, testid, onReady }) {
  const ref = useRef(null);
  const world = WORLD[scene] || { w: 10, h: 6 };
  const [glOk, setGlOk] = useState(false);
  const [size, setSize] = useState(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const input = useRef({ px: 0, py: 0, hover: false, yaw: 0, pulseAt: 0, down: false, lastX: 0 }).current;
  /* Animation gate shared with every primitive inside this scene — flipping it
     costs no re-render and stops all per-frame work while off screen. */
  const gate = useRef(false);
  const readySentRef = useRef(false);
  const handleReady = useCallback(() => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    if (onReady) onReady();
  }, [onReady]);

  useEffect(() => {
    setGlOk(glSupported());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setSize({ w: r.width, h: r.height });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "30% 0px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [glOk]);

  /* Report visibility to the shared canvas so it can pause its render loop when
     no 3D section is near the viewport. Exactly one claim per visible view,
     released exactly once (on hide or unmount). Releasing twice — as an earlier
     version did — paused the canvas while illustrations were still on screen,
     and because the canvas is fixed, its last drawn frame stayed frozen on the
     viewport: illustrations appeared to slide out of their cards while
     scrolling. Never report from both the body and the cleanup. */
  useEffect(() => {
    gate.current = inView;
    if (!inView) return undefined;
    reportViewVisible(1);
    return () => reportViewVisible(-1);
  }, [inView]);

  /* Scene build — a section that is approaching gets built immediately, every
     other scene is pre-built in an idle moment (never during a scroll), so no
     illustration is ever constructed on the scroll path. */
  useEffect(() => {
    if (mounted) return undefined;
    if (inView) {
      setMounted(true);
      return undefined;
    }
    return queueIdleMount(() => setMounted(true));
  }, [inView, mounted]);

  if (!glOk) {
    return (
      <div className={className} style={style} data-testid={testid}>
        {typeof fallback === "function" ? fallback() : fallback}
      </div>
    );
  }

  const handlers = reduce
    ? {}
    : {
        onPointerMove: (e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          input.px = ((e.clientX - r.left) / r.width) * 2 - 1;
          input.py = -(((e.clientY - r.top) / r.height) * 2 - 1);
          if (input.down) {
            input.yaw = THREE.MathUtils.clamp(input.yaw + (e.clientX - input.lastX) * 0.006, -0.85, 0.85);
            e.preventDefault();
          }
          input.lastX = e.clientX;
        },
        onPointerDown: (e) => {
          input.down = true;
          input.lastX = e.clientX;
          try {
            ref.current?.setPointerCapture?.(e.pointerId);
          } catch (err) {
            /* noop */
          }
        },
        onPointerUp: () => {
          input.down = false;
        },
        onPointerEnter: () => {
          input.hover = true;
        },
        onPointerLeave: () => {
          input.hover = false;
          input.down = false;
        },
        onClick: () => {
          input.pulseAt = performance.now();
        },
      };

  return (
    <SceneBoundary
      fallback={
        <div className={className} style={style} data-testid={testid}>
          {typeof fallback === "function" ? fallback() : fallback}
        </div>
      }
    >
      <View
        track={ref}
        ref={ref}
        visible={inView}
        className={`iso3d-host ${className}`}
        style={{ touchAction: "pan-y", ...style }}
        data-testid={testid}
        {...handlers}
      >
        {size && mounted && <SceneHost scene={scene} props={props} input={input} reduce={!!reduce} visible={inView} zoom={fitZoom(size, world)} onReady={handleReady} gate={gate} />}
      </View>
    </SceneBoundary>
  );
}
