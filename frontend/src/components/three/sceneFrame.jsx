/* useSceneFrame — the ONE place every 3D animation callback is gated.
   Every Iso3D primitive (Tile, Wire, Billboard, Burst, Satellite…) animates in
   its own useFrame. With a dozen scenes mounted on the page that is hundreds of
   callbacks per frame — most of them for sections nobody is looking at. Each
   scene publishes a plain ref through this context; while that ref is false the
   callback is skipped entirely, so an off-screen illustration costs nothing.

   Scenes drop-in replace `useFrame` with this hook (same signature), so the
   gate applies everywhere without touching a single animation body. */
import { createContext, useContext } from "react";
import { useFrame } from "@react-three/fiber";

/* value is a React ref ({ current: boolean }) so flipping it never re-renders
   the scene graph — the gate is read inside the render loop. */
export const SceneActiveContext = createContext(null);

export function useSceneFrame(callback, priority = 0) {
  const gate = useContext(SceneActiveContext);
  useFrame((state, delta, frame) => {
    if (gate && gate.current === false) return;
    callback(state, delta, frame);
  }, priority);
}
