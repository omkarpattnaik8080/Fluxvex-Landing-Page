import { motion } from "framer-motion";

/* Site-wide reveal: premium cubic-bezier, fires just BEFORE a section enters
   the viewport so a fast scroll never lands on half-faded content, and only
   ever plays once. No persistent will-change — 135 permanently promoted
   layers cost more than they save; Framer Motion sets will-change for the
   duration of the animation itself. */
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px 12% 0px" }}
    transition={{ duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
