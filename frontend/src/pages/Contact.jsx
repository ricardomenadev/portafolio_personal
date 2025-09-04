// pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import contactService from '../services/contactService'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+54",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Array de códigos de país comunes en Latinoamérica
  const countryCodes = [
    { code: "+54", country: "Argentina" },
    { code: "+55", country: "Brasil" },
    { code: "+56", country: "Chile" },
    { code: "+57", country: "Colombia" },
    { code: "+58", country: "Venezuela" },
    { code: "+51", country: "Perú" },
    { code: "+52", country: "México" },
    { code: "+598", country: "Uruguay" },
    { code: "+595", country: "Paraguay" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.sendContact(formData);
      
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center justify-between p-4`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                ¡Mensaje enviado con éxito!
              </p>
              <p className="text-sm text-gray-500">
                Me pondré en contacto contigo pronto.
              </p>
            </div>
          </div>
        </motion.div>
      ));
  
      setFormData({
        name: '',
        email: '',
        countryCode: '+54',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.message || 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="container mx-auto relative z-10">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block p-2 px-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm mb-8"
          >
            <h2 className="text-lg text-gray-300">Hablemos</h2>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
            Contáctame
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Creemos juntos 
            <span className="text-blue-400 font-semibold"> soluciones digitales</span> que 
            <span className="text-purple-400 font-semibold"> impulsen tu negocio</span>.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario mejorado */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="countryCode" className="block text-gray-300 mb-2 font-medium">
                    Código País
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white transition-all duration-300"
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code} className="bg-gray-800">
                        {code} ({country})
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Ej: 3794123456"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white resize-none transition-all duration-300"
                  placeholder="Cuéntame sobre tu proyecto... ¿Qué necesitas desarrollar?"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Información de contacto mejorada */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Información de contacto
                </h3>
              </div>
              
              <div className="space-y-4">
                <a
                  href="mailto:ricardoamena@gmail.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-700/30"
                >
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">ricardoamena@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/5493794739888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-700/30"
                >
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="font-medium">WhatsApp: +54 379 4739888</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Respuesta rápida
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Normalmente respondo en menos de 24 horas. ¡Estaré encantado de
                discutir tu proyecto y encontrar la mejor solución para tus necesidades!
              </p>
            </motion.div>

            {/* Nueva sección de especialidades */}
            <motion.div
              className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                ¿En qué puedo ayudarte?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Desarrollo Web",
                  "Apps Móviles", 
                  "Análisis de Datos",
                  "Soluciones con IA",
                  "E-commerce",
                  "Consultoría Tech"
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
                    <span className="text-gray-300 text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;