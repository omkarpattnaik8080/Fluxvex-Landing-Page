/* CrossFade3D — the final word on the "2D first, then 3D" flash.
   WebGL browsers render ONLY the 3D scene (fading in when the pre-warmed
   chunk mounts — typically within the first beat of page load, so by the time
   a user scrolls anywhere near a section the 3D is already live).
   The SVG composition is reserved exclusively for environments without WebGL
   (or a scene error), where it renders instead of the 3D — never on top of it,
   never before it. No swap is possible in any environment. */
import { Suspense } from "react";
import { motion } from "framer-motion";
import Scene3D, { glSupported } from "./Scene3D";

/* Single shared WebGL-capability probe (defined in Scene3D.jsx) — CrossFade3D
   consumes the cached result instead of creating its own probe canvas. */

export default function CrossFade3D({ scene, props, legacy, className = "", testid }) {
  const supported = glSupported();
  return (
    <div className={className} data-testid={testid}>
      {supported ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Suspense fallback={null}>
            <Scene3D scene={scene} props={props} fallback={null} className="h-full w-full" />
          </Suspense>
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">{legacy}</div>
      )}
    </div>
  );
}
