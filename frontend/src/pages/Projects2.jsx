// pages/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Tienda Online",
      description: "Plataforma para la gestión de casos legales y seguimiento de expedientes. Sistema completo con autenticación, dashboard y reportes.",
      tags: ["React", "Node.js", "SQL", "Express", "Prisma", "JWT", "Tailwind"],
      image: "/project1.jpg",
      repo: "https://github.com/tuuser/proyecto1",
      demo: "https://demo.proyecto1.com",
      status: "En desarrollo"
    },
    {
      title: "Sitema de Gestion de Denuncias",
      description: "API RESTful para la gestión de servicios jurídicos, integración con pasarelas de pago y sistema de notificaciones.",
      tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Tailwind"],
      image: "/project2.jpg",
      repo: "https://github.com/tuuser/proyecto2",
      demo: "https://api.proyecto2.com/docs",
      status: "En desarrollo"
    },
    {
      title: "Portal de Consultas Legales",
      description: "Plataforma web para consultas legales online, chat en tiempo real y agenda de citas.",
      tags: ["React", "Firebase", "Tailwind", "Socket.io"],
      image: "/project3.jpg",
      repo: "https://github.com/tuuser/proyecto3",
      status: "Completado"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
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

      {/* Efecto de estrellas */}
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

      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Mis Proyectos
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="p-6">
                  {/* Header del proyecto */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Completado' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Código</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;