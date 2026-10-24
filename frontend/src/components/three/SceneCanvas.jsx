/* SceneCanvas — ONE shared WebGL context for every Iso3D view on the page.
   Fixed layer above section backgrounds, pointer-events none, transparent clear.
   If WebGL is unavailable the canvas never mounts and every Scene3D falls back
   to its SVG composition — the page must never crash. */
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { onAnyViewVisible } from "./viewVisibility";
import { onPostScrollFrame } from "./frameBus";
import { glSupported } from "./Scene3D";

/* Clear the whole canvas each frame BEFORE views paint their scissored regions —
   otherwise stale pixels linger at old scroll positions on the fixed canvas. */
function FullClear() {
  const gl = useThree((s) => s.gl);
  const size = useThree((s) => s.size);
  useFrame(() => {
    gl.setScissor(0, 0, size.width, size.height);
    gl.setScissorTest(true);
    gl.clear(true, true, true);
    gl.setScissorTest(false);
  }, 0);
  return null;
}

/* Runs after every view has painted (priority 2 > View's default 1): the first
   frame of a freshly resumed loop is the signal that what sits in the drawing
   buffer matches the current scroll position, so the layer can be shown. */
function PaintGate({ painted, onPainted }) {
  useFrame(() => {
    if (!painted) onPainted(true);
  }, 2);
  return null;
}

/* The canvas has no loop of its own (frameloop="never"). Every frame is
   advanced from the page's single ticker, immediately AFTER Lenis has written
   this frame's scroll position — so each illustration is drawn against the
   same scroll offset the browser is about to paint the DOM at.
   The clock is accumulated here with a capped delta, so a long frame or a
   paused section can never make the animations jump on resume. */
function FrameDriver({ active }) {
  const advance = useThree((s) => s.advance);
  const clock = useRef(0);
  const last = useRef(null);
  useEffect(() => {
    if (!active) return undefined;
    return onPostScrollFrame((time) => {
      const prev = last.current;
      last.current = time;
      clock.current += prev === null ? 0 : Math.min(Math.max(time - prev, 0), 0.05);
      advance(clock.current);
    });
  }, [active, advance]);
  return null;
}

export default function SceneCanvas() {
  const [glOk] = useState(glSupported);
  /* The render loop only runs while at least one 3D section is near the
     viewport — everywhere else (hero, calculator, pricing, footer…) the
     canvas costs literally zero GPU/CPU per frame. */
  const [active, setActive] = useState(false);
  /* A paused canvas keeps its last drawn frame in the drawing buffer, and the
     canvas is fixed to the viewport — so those pixels would hang in mid-air
     over whatever the user scrolls to next. The layer is therefore hidden
     whenever the loop is not running, and only revealed again after the loop
     has painted a fresh frame at the current scroll position. */
  const [painted, setPainted] = useState(false);
  useEffect(
    () =>
      onAnyViewVisible((any) => {
        setActive(any);
        if (!any) setPainted(false);
      }),
    []
  );
  if (!glOk) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35]"
      style={{ visibility: active && painted ? "visible" : "hidden" }}
      aria-hidden="true"
    >
      <Canvas
        orthographic
        frameloop="never"
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
        camera={{ position: [14, 14, 14], zoom: 45, near: -100, far: 500 }}
        onCreated={({ gl, camera }) => {
          gl.setClearAlpha(0);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        }}
      >
        <FullClear />
        <View.Port />
        <PaintGate painted={painted} onPainted={setPainted} />
        <FrameDriver active={active} />
      </Canvas>
    </div>
  );
}
