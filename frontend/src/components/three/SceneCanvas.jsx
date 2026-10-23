/* SceneCanvas — ONE shared WebGL context for every Iso3D view on the page.
   Fixed layer above section backgrounds, pointer-events none, transparent clear.
   If WebGL is unavailable the canvas never mounts and every Scene3D falls back
   to its SVG composition — the page must never crash. */
import { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { onAnyViewVisible } from "./viewVisibility";
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

export default function SceneCanvas() {
  const [glOk] = useState(glSupported);
  /* The render loop only runs while at least one 3D section is near the
     viewport — everywhere else (hero, calculator, pricing, footer…) the
     canvas costs literally zero GPU/CPU per frame. */
  const [active, setActive] = useState(true);
  useEffect(() => onAnyViewVisible(setActive), []);
  if (!glOk) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[35]" aria-hidden="true">
      <Canvas
        orthographic
        frameloop={active ? "always" : "never"}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [14, 14, 14], zoom: 45, near: -100, far: 500 }}
        onCreated={({ gl, camera }) => {
          gl.setClearAlpha(0);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        }}
      >
        <FullClear />
        <View.Port />
      </Canvas>
    </div>
  );
}
