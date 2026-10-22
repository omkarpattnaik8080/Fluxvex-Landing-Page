/* SceneCanvas — ONE shared WebGL context for every Iso3D view on the page.
   Fixed layer above section backgrounds, pointer-events none, transparent clear. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";

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
  return (
    <div className="pointer-events-none fixed inset-0 z-[35]" aria-hidden="true">
      <Canvas
        orthographic
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [14, 14, 14], zoom: 45, near: -100, far: 500 }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
      >
        <FullClear />
        <View.Port />
      </Canvas>
    </div>
  );
}
