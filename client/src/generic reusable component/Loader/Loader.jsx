import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      
      {/* Subtle Background Glow / Accent */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-tr from-gray-200 to-white rounded-full blur-3xl opacity-40"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* Logo Circle */}
      <motion.div
        className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-gray-100 via-white to-gray-50 shadow-2xl border border-gray-200"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      >
        <img
          src="/Luxxora.png"
          alt="Luxxora Logo"
          className="w-16 h-16 object-contain"
        />
      </motion.div>

      {/* Brand Name */}
      <motion.h1
        className="mt-6 text-3xl font-bold tracking-wide text-gray-800 uppercase"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Luxxora
      </motion.h1>

      {/* Elegant Divider */}
      <motion.div
        className="w-16 h-[2px] mt-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Loader Dots */}
      <motion.div
        className="flex space-x-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-6 text-base text-gray-600 tracking-wide italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Curating your style...
      </motion.p>
    </div>
  );
};

export default Loader;
