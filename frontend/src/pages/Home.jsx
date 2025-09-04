import { Code, Server, Database, Brain, Smartphone, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import TypewriterText from "../utils/TypewriterText";

const Home = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desarrollo Web",
      description: "Interfaces modernas con React, JavaScript y las últimas tecnologías web.",
      techs: ["React", "JavaScript", "HTML5", "CSS3"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Desarrollo Backend",
      description: "APIs robustas y sistemas escalables con múltiples tecnologías.",
      techs: ["Node.js", "Python", "PHP"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Desarrollo Móvil",
      description: "Aplicaciones móviles multiplataforma con React Native.",
      techs: ["React Native", "iOS", "Android"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Base de Datos",
      description: "Diseño y optimización de estructuras de datos eficientes.",
      techs: ["SQL", "NoSQL", "MongoDB", "MySQL"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análisis de Datos",
      description: "Extracción de insights valiosos mediante análisis avanzado de datos.",
      techs: ["Python", "Pandas", "Analytics"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Inteligencia Artificial",
      description: "Implementación de soluciones inteligentes y machine learning.",
      techs: ["AI", "ML", "Python"]
    },
  ];

  const techStack = [
    { name: "JavaScript", color: "from-gray-400 to-gray-700" },
    { name: "React", color: "from-gray-400 to-gray-700" },
    { name: "Node.js", color: "from-gray-400 to-gray-700" },
    { name: "Python", color: "from-gray-400 to-gray-700" },
    { name: "PHP", color: "from-gray-400 to-gray-700" },
    { name: "React Native", color: "from-gray-400 to-gray-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Fondo sutil animado */}
        <motion.div
          className="absolute inset-0 opacity-10"
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

        <div className="container mx-auto text-center relative z-10">
          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transformando
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Ideas
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                en
              </motion.span>
              <motion.div
                className="mt-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
                  Realidad Digital
                </span>
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Descripción mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-8"
          >
            <motion.p
              className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Desarrollador Full Stack especializado en 
              <span className="text-blue-400 font-semibold"> desarrollo web y móvil</span>,
              <span className="text-purple-400 font-semibold"> análisis de datos</span> e
              <span className="text-green-400 font-semibold"> inteligencia artificial</span>.
              Creando soluciones tecnológicas innovadoras que impulsan el éxito de tu negocio.
            </motion.p>
          </motion.div>

          {/* Stack de tecnologías */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${tech.color} text-white opacity-90`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Botón de llamada a la acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/projects")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Explorar Proyectos
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section Mejorada */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Servicios <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Especializados</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Soluciones tecnológicas completas desde el concepto hasta la implementación
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-2xl relative overflow-hidden">
            {/* Efecto de brillo sutil */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, white 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <TypewriterText
                  text="¿Listo para llevar tu proyecto al siguiente nivel?"
                  delay={2}
                />
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Desde aplicaciones web hasta soluciones móviles con IA. 
                Transformemos tu visión en una solución digital única y efectiva.
              </p>
              <motion.button
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/contact")}
              >
                Iniciar Proyecto
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;