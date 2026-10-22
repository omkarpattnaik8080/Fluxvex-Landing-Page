/* CrossFade3D — layered 3D stage that kills the "1D first, 3D later" swap.
   The crisp SVG composition is the permanent base layer; the WebGL scene fades
   in over it only after its first painted frame (chunk is pre-warmed at page
   load, so the fade usually lands before the section is even scrolled to).
   If WebGL is unavailable or a scene throws, the SVG base simply stays. */
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Scene3D from "./Scene3D";

export default function CrossFade3D({ scene, props, legacy, className = "", testid }) {
  const [ready, setReady] = useState(false);
  return (
    <div className={`relative ${className}`} data-testid={testid}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        aria-hidden={ready}
      >
        {legacy}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <Suspense fallback={null}>
          <Scene3D
            scene={scene}
            props={props}
            fallback={null}
            onReady={() => setReady(true)}
            className="h-full w-full"
          />
        </Suspense>
      </motion.div>
    </div>
  );
}
