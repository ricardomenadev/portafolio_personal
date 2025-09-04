// pages/About.jsx
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Scale, Smartphone, BarChart3, Brain } from "lucide-react";
import TypewriterText from "../utils/TypewriterText";
import perfil1 from "../assets/images/perfil1.jpg";

const About = () => {
  const experiences = [
    {
      icon: <Code2 className="w-6 h-6" />,
      period: "2022 - Presente",
      title: "Desarrollador Full Stack",
      description: "Desarrollo de aplicaciones web y móviles con React, React Native, Node.js, Python y PHP. Especialización en análisis de datos e implementación de soluciones con IA.",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      period: "2015 - Presente",
      title: "Abogado",
      description: "Experiencia en diversas áreas del derecho, incluyendo litigios y asesoramiento legal. Esta experiencia me proporciona una visión única para el desarrollo de software legal y de gestión.",
    },
  ];

  const education = [
    {
      icon: <Code2 className="w-6 h-6" />,
      year: "2022",
      title: "Diplomatura en Programación Web FullStack",
      institution: "Universidad Tecnológica Nacional Facultad Regional Resistencia Chaco - UTN FRRe",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      year: "2015",
      title: "Abogado",
      institution: "UNNE - Universidad Nacional del Nordeste - Sede: Corrientes Cap. - Argentina",
    },
  ];

  const techSkills = [
    {
      category: "Frontend",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: <Briefcase className="w-5 h-5" />,
      skills: ["Node.js", "Python", "PHP", "REST APIs", "Microservicios"]
    },
    {
      category: "Mobile",
      icon: <Smartphone className="w-5 h-5" />,
      skills: ["React Native", "iOS Development", "Android Development", "Cross-Platform"]
    },
    {
      category: "Data & AI",
      icon: <Brain className="w-5 h-5" />,
      skills: ["Análisis de Datos", "Python Data Science", "Pandas", "AI Integration"]
    },
    {
      category: "Database",
      icon: <BarChart3 className="w-5 h-5" />,
      skills: ["MySQL", "MongoDB", "PostgreSQL", "Data Modeling", "Query Optimization"]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      {/* Fondo animado más sutil */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #2563eb 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, #7c3aed 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #2563eb 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Partículas más sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block p-2 px-6 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm mb-8"
          >
            <h2 className="text-lg text-gray-300">Mi Historia</h2>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-8">
            <TypewriterText text="Sobre Mí" />
          </h1>
          
          <div className="text-gray-300 text-lg max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Contenedor de la foto con efectos mejorados */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={perfil1}
                      alt="Ricardo A. Mena"
                      className="w-full h-full object-cover rounded-full filter brightness-110 contrast-110"
                    />
                  </motion.div>
                  
                  {/* Efecto de brillo sutil */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full"
                    animate={{ 
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              {/* Contenido de presentación mejorado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex-1 text-center lg:text-left"
              >
                <h2 className="text-3xl font-semibold text-blue-400 mb-4">
                  <TypewriterText 
                    text="Desarrollador Full Stack | Abogado" 
                    delay={1.5}
                  />
                </h2>
                <p className="text-xl mb-6 leading-relaxed">
                  <TypewriterText 
                    text="Combinando mi experiencia legal con la pasión por el desarrollo de software, creo soluciones tecnológicas innovadoras que van desde aplicaciones web hasta sistemas móviles con inteligencia artificial."
                    delay={2}
                  />
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["Web Development", "Mobile Apps", "Data Analysis", "AI Solutions"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full border border-gray-500/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5 + index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Habilidades técnicas organizadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Stack Tecnológico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {techSkills.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-400">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + index * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline y Education en grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Experiencia */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="relative"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-400" />
              Experiencia
            </h2>
            <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="flex gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.8 + (index * 0.3) }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-blue-400 z-10 border border-blue-500/30">
                  {exp.icon}
                </div>
                <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 flex-1 hover:bg-gray-700/40 transition-all duration-300">
                  <span className="text-blue-400 text-sm font-medium bg-blue-500/10 px-2 py-1 rounded">{exp.period}</span>
                  <h3 className="text-xl font-semibold text-white mt-3 mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Educación */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="relative"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-400" />
              Educación
            </h2>
            <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50" />
            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                className="flex gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.3 + (index * 0.3) }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-purple-400 z-10 border border-purple-500/30">
                  {edu.icon}
                </div>
                <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 flex-1 hover:bg-gray-700/40 transition-all duration-300">
                  <span className="text-purple-400 text-sm font-medium bg-purple-500/10 px-2 py-1 rounded">{edu.year}</span>
                  <h3 className="text-xl font-semibold text-white mt-3 mb-2">
                    {edu.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{edu.institution}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sección final con llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Trabajamos juntos?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Estoy siempre abierto a nuevos desafíos y proyectos interesantes. 
              Si tienes una idea o necesitas desarrollar una solución, ¡hablemos!
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/contact")}
            >
              Contactar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;