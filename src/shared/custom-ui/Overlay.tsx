import { motion } from "framer-motion";

const Overlay = () => (
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.5,
    }}
    animate={{
      opacity: 0.5,
      scale: 1,
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="fixed inset-0 bg-black"
  />
);

export { Overlay };
