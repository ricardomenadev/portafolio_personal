import React from "react";
import { motion } from "framer-motion";
import { Construction, Rocket, Timer } from "lucide-react";

const Projects = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      {/* Fondo */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background: "linear-gradient(45deg, #7c3aed 0%, #2563eb 100%)",
          filter: "blur(100px)",
        }}
      />
      {/* Efecto de partículas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 flex flex-col min-h-[80vh]">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/*Icono animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <Rocket className="w-24 h-24 text-blue-400" />
          </motion.div>

          {/* Titulo */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-center mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Próximamente
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12"
          >
            Estoy trabajando en proyectos increíbles que pronto compartiré contigo.
          </motion.p>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-16">
            {[
              {
                icon: <Construction className="w-8 h-8" />,
                title: "En Desarrollo",
                description: "Proyectos innovadores en proceso de creación"
              },
              {
                icon: <Timer className="w-8 h-8" />,
                title: "Muy Pronto",
                description: "Contenido emocionante está en camino"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Lanzamiento",
                description: "Prepárate para ver algo asombroso"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.2) }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mensaje adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-auto"
          >
            <p className="text-gray-400 text-xl mb-6">
              Mientras tanto, ¿te gustaría discutir un proyecto?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="mt-4 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Contáctame
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;