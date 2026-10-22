/* Scene3D — renders an Iso3D scene into the shared page canvas via drei <View>.
   Falls back to the original SVG composition when WebGL is unavailable or a
   scene throws at render time (per-view error boundary keeps one bad scene
   from taking down the page). */
import { Component, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { View, OrthographicCamera } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { SCENES, WORLD } from "./scenes";

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function SceneHost({ scene, props, input, reduce, visible, zoom, onReady }) {
  const Scene = SCENES[scene];
  /* Two rAFs past mount = the scene's first painted frame — signal the host so
     it can cross-fade the SVG stage out instead of hard-swapping. */
  useEffect(() => {
    if (!onReady) return undefined;
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  if (!Scene) return null;
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[14, 14, 14]}
        zoom={zoom || 40}
        near={-100}
        far={500}
        onUpdate={(c) => c.lookAt(0, 0, 0)}
      />
      <Scene input={input} reduce={reduce} visible={visible} zoom={zoom} {...props} />
    </>
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
  const reduce = useReducedMotion();
  const input = useRef({ px: 0, py: 0, hover: false, yaw: 0, pulseAt: 0, down: false, lastX: 0 }).current;
  const readySentRef = useRef(false);
  const handleReady = useCallback(() => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    if (onReady) onReady();
  }, [onReady]);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setGlOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) {
      setGlOk(false);
    }
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
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "20% 0px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [glOk]);

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
        {size && <SceneHost scene={scene} props={props} input={input} reduce={!!reduce} visible={inView} zoom={fitZoom(size, world)} onReady={handleReady} />}
      </View>
    </SceneBoundary>
  );
}
