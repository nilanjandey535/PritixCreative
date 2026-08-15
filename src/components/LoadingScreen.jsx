import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="loading-screen"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="loading-logo"
          >
            PRITIX<span className="text-primary">360</span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
