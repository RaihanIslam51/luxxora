import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex flex-col items-center justify-center">

        {/* Main Spinner */}
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
            {/* Inner circle with text */}
            <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="text-blue-600 font-semibold animate-pulse tracking-wide">
                Loading
              </span>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <motion.h2
          className="mt-8 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent tracking-widest"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          L U X X O R A
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-2 text-xs md:text-sm text-gray-500 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          WEAR YOUR CONFIDENCE
        </motion.p>

        {/* Loading Dots */}
        <motion.div
          className="flex items-center mt-5 space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        {/* Progress shimmer */}
        <motion.div
          className="relative mt-6 w-48 h-1.5 rounded-full overflow-hidden bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Subtle animated glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
