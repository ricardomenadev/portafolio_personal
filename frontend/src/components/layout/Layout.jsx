import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Welcome" },
    { path: "/home", label: "Inicio" },
    { path: "/projects", label: "Proyectos" },
    { path: "/about", label: "Sobre mí" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gry-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h16">
            <NavLink
              to="/"
              className="font-bold text-xl text-gray-800 dark:text-white"
            >
              <img
                src="/favicon.svg"
                alt="Ricardo Mena Logo"
                className="w-10 h-10"
              />
            </NavLink>
            {/* Navegacion de escritorio */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({
                    isActive,
                  }) => `text-sm font-medium transition-colors hover:text-blue-500 
                    ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            {/* Boton de menu animado */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Navegacion Movil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-medium transition-colors hover:text-blue-500 
                      ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-600 dark:text-gray-300"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main */}
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            {/* Redes sociales */}
            <div className="flex space-x-6 mb-4">
              <a
                href="https://github.com/ricardoamena"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:ricardoamena@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5493794739888"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Ricardo A. Mena. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
