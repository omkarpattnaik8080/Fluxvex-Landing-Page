import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);
const HOVER = { scale: 1.045, y: -2 };
const TAP = { scale: 0.96 };
const SPRING = { type: "spring", stiffness: 400, damping: 24 };

/** Shared press-animated CTA — spring lift on hover, gentle press on tap. Renders a router Link when `to` is given. */
export function TapCTA({ to, type = "button", className = "", testid, children, onClick, ...rest }) {
  const props = {
    className,
    "data-testid": testid,
    onClick,
    whileHover: HOVER,
    whileTap: TAP,
    transition: SPRING,
    ...rest,
  };
  if (to) return <MotionLink to={to} {...props}>{children}</MotionLink>;
  return <motion.button type={type} {...props}>{children}</motion.button>;
}

export default TapCTA;
