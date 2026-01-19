import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, y = 40 }) => (
  <motion.div
    initial={{ opacity: 0, y: y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 1, 
      delay: delay, 
      ease: [0.215, 0.61, 0.355, 1] // Power Ease Out
    }}
  >
    {children}
  </motion.div>
);