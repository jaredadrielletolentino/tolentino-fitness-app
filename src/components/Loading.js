import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="loading-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="loading-spinner mb-3"></div>
        <motion.h3
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Loading your fitness journey...
        </motion.h3>
        <motion.p
          className="text-white opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Please wait while we prepare everything for you
        </motion.p>
      </motion.div>
    </div>
  );
}