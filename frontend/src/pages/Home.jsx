import { Code, Server, Database, Brain } from "lucide-react";
import { motion } from "framer-motion";
import TypewriterText from "../utils/TypewriterText";

const Home = () => {
  const feature = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desarrollo Web",
      description:
        "Creación de interfaces modernas y responsivas utilizando las ultimas tecnologias web.",
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Desarrollo Backend",
      description: "Implementación de APIs robustas y sistemas escalables.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Base de Datos",
      description: "Diseño y optimización de estructuras de datos eficientes.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Soluciones Innovadoras",
      description: "Enfoque creativo para resolver problemas complejos.",
    },
  ];


  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/*  */}
      <section className="py-20 px-4 relative overflow-hidden">
  {/* Fondo animado */}
  <motion.div
    className="absolute inset-0 opacity-20"
    initial={{ backgroundPosition: '0% 0%' }}
    animate={{ backgroundPosition: '100% 100%' }}
    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
    style={{
      background: 'linear-gradient(45deg, #2563eb 0%, #7c3aed 100%)',
      filter: 'blur(100px)',
    }}
  />

  <div className="container mx-auto text-center relative z-10">
    {/* Título principal con animación por letra */}
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
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text bg-size-200 animate-gradient">
            Realidad Digital
          </span>
        </motion.div>
      </motion.h1>
    </motion.div>

    {/* Descripción con efecto fade y slide */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative"
    >
      <motion.p 
        className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Desarrollador de software especializado en crear
        <span className="text-blue-400 font-semibold"> soluciones tecnológicas innovadoras </span>
        que impulsan el
        <span className="text-purple-400 font-semibold"> éxito de tu negocio</span>.
      </motion.p>

      {/* Elementos decorativos */}
      <motion.div 
        className="absolute -z-10 inset-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-500 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-500 rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-indigo-500 rounded-full" />
      </motion.div>
    </motion.div>

    {/* Botón de llamada a la acción */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="mt-12"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
      >
        Explorar Proyectos
      </motion.button>
    </motion.div>
  </div>
  </section>

      {/*  */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            transition={{ duration: 0.5 }}
          >
            {feature.map((features, index) => (
              <motion.div
                key={features.title}
                className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.6 }}
              >
                <div className="text-blue-400 mb-4">{features.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {features.title}
                </h3>
                <p className="text-gray-400">{features.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*  */}
      <section className="py-20 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r fron-blue-600 to-purple-600 p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <TypewriterText
              text="¿Listo para comenzar tu proyecto?"
              delay={2}
              />
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Transformemos tu visión en una solución digital única y efectiva.
            </p>
            <motion.button
              className="hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
