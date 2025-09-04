import React from "react";
import { motion } from "framer-motion";
import { Construction, Rocket, Timer, Code, Smartphone, BarChart3 } from "lucide-react";

const Projects = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      {/* Fondo animado sutil como el Home */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 30% 70%, #2563eb 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, #7c3aed 0%, transparent 50%)",
            "radial-gradient(circle at 30% 70%, #2563eb 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Partículas más sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
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
          {/* Header con badge estilo Home */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-block p-2 px-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm mb-8"
            >
              <h2 className="text-lg text-gray-300">Portfolio</h2>
            </motion.div>

            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="mb-6"
            >
              <Rocket className="w-20 h-20 text-blue-400 mx-auto" />
            </motion.div>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Próximamente
              </span>
            </h1>

            {/* Subtítulo mejorado */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estoy desarrollando proyectos increíbles que pronto compartiré contigo. 
              <span className="text-blue-400 font-semibold"> Aplicaciones web</span>,
              <span className="text-purple-400 font-semibold"> soluciones móviles</span> y
              <span className="text-green-400 font-semibold"> sistemas con IA</span>.
            </p>
          </motion.div>

          {/* Características mejoradas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mb-16">
            {[
              {
                icon: <Construction className="w-8 h-8" />,
                title: "En Desarrollo",
                description: "Sistemas empresariales con IA, plataformas de e-commerce y apps móviles",
                color: "from-blue-500/20 to-cyan-500/20",
                iconColor: "text-blue-400"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Tecnologías Avanzadas",
                description: "React, React Native, Node.js, Python, análisis de datos y machine learning",
                color: "from-purple-500/20 to-blue-500/20",
                iconColor: "text-purple-400"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Próximo Lanzamiento",
                description: "Proyectos reales con casos de uso empresarial y soluciones innovadoras",
                color: "from-green-500/20 to-blue-500/20",
                iconColor: "text-green-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (index * 0.2), duration: 0.6 }}
                className={`bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center hover:bg-gray-700/40 transition-all duration-300 group`}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sección de tipos de proyectos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mb-16 w-full max-w-4xl"
          >
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Tipos de Proyectos en Desarrollo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <Code className="w-5 h-5" />, name: "Aplicaciones Web", color: "from-blue-400 to-cyan-500" },
                { icon: <Smartphone className="w-5 h-5" />, name: "Apps Móviles", color: "from-purple-400 to-pink-500" },
                { icon: <BarChart3 className="w-5 h-5" />, name: "Análisis de Datos", color: "from-green-400 to-emerald-500" },
                { icon: <Construction className="w-5 h-5" />, name: "E-commerce", color: "from-orange-400 to-red-500" },
                { icon: <Timer className="w-5 h-5" />, name: "Sistemas Empresariales", color: "from-indigo-400 to-blue-500" },
                { icon: <Rocket className="w-5 h-5" />, name: "Soluciones con IA", color: "from-violet-400 to-purple-500" },
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  className="flex items-center gap-3 bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:bg-gray-700/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${project.color} rounded-full flex items-center justify-center text-white`}>
                    {project.icon}
                  </div>
                  <span className="text-gray-300 font-medium">{project.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mensaje final con CTA mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Mientras desarrollo mi portfolio, estoy disponible para crear 
                la solución digital que tu negocio necesita.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Hablemos de tu proyecto
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;