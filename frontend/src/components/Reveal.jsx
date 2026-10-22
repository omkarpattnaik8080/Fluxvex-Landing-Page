import { motion } from "framer-motion";

/* Site-wide reveal: premium cubic-bezier, fires as a section enters the lower
   viewport, GPU-composited, and only ever plays once. */
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    className={`will-change-transform ${className}`}
  >
    {children}
  </motion.div>
);

export default Reveal;
