// pages/Welcome.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Github, Linkedin, FileDown } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center text-white p-4">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 w-24 h-24 mx-auto" // Ajusta el tamaño según necesites
        >
          <img src="/logoani.svg" alt="Logo" className="w-full h-full" />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Ricardo A. Mena
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Desarrollador de Software
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative inline-block mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => navigate("/home")}
            className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            Ingresar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-6 mt-6"
        >
          <motion.a
            href="https://github.com/ricardomenadev"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            <Github className="w-7 h-7" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257/"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            <Linkedin className="w-7 h-7" />
          </motion.a>

          <motion.a
            href="/CV.pdf"
            download
            variants={socialVariants}
            whileHover="hover"
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            <FileDown className="w-7 h-7" />
            <span className="text-sm">CV</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-500 rounded-full" />
      </motion.div>
    </div>
  );
};

export default Welcome;
