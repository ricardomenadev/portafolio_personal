// pages/About.jsx
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Scale } from "lucide-react";
import TypewriterText from "../utils/TypewriterText";
import perfil1 from "../assets/images/perfil1.jpg";

const About = () => {
  const experiences = [
    {
      icon: <Code2 className="w-6 h-6" />,
      period: "2022 - Presente",
      title: "Desarrollador de Software",
      description: "Desarrollo de aplicaciones web y móviles utilizando tecnologías modernas.",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      period: "2015 - Presente",
      title: "Abogado",
      description: "Experiencia en diversas áreas del derecho, incluyendo litigios y asesoramiento legal.",
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background: 'linear-gradient(45deg, #7c3aed 0%, #2563eb 100%)',
          filter: 'blur(100px)',
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
          
          <div className="text-gray-300 text-lg max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Contenedor de la foto con efectos */}
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
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={perfil1}
                      alt="Ricardo Paz"
                      className="w-full h-full object-cover rounded-full
                        filter brightness-110 contrast-110 saturate-110"
                    />
                  </motion.div>
                  
                  {/* Efecto de brillo */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </motion.div>

              {/* Contenido de presentación */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex-1 text-center md:text-left"
              >
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                  <TypewriterText 
                    text="Desarrollador de Software | Abogado " 
                    delay={1.5}
                  />
                </h2>
                <p className="mb-4">
                  <TypewriterText 
                    text="👨‍💻 Apasionado por crear soluciones tecnológicas innovadoras y personalizadas, combinando mi experiencia legal con el desarrollo de software."
                    delay={2}
                  />
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">🔧 Skills</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Excelencia técnica y aprendizaje continuo</li>
                  <li>Soluciones efectivas para necesidades complejas</li>
                  <li>Enfoque centrado en el usuario</li>
                  <li>Gestión de proyectos y trabajo en equipo</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">💪 Experiencia</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Desarrollo de soluciones escalables</li>
                  <li>Comunicación clara y constante</li>
                  <li>Cumplimiento de plazos y objetivos</li>
                  <li>Visión integral de proyectos</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline y Education en grid */}
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Experiencia */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="relative"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Experiencia</h2>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="flex gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 + (index * 0.3) }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 z-10">
                  {exp.icon}
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm flex-1">
                  <span className="text-blue-400 text-sm">{exp.period}</span>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{exp.description}</p>
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
            <h2 className="text-2xl font-bold text-white mb-8">Educación</h2>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50" />
            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                className="flex gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 + (index * 0.3) }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 z-10">
                  {edu.icon}
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm flex-1">
                  <span className="text-purple-400 text-sm">{edu.year}</span>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    {edu.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{edu.institution}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;