import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Welcome from '../pages/Welcome';

// Cada página se descarga recién cuando se visita
const Inicio = lazy(() => import('../pages/propuestas/P6Mezcla'));
const Proyectos = lazy(() => import('../pages/propuestas/proyectos/R2Galeria'));
const SobreMi = lazy(() => import('../pages/propuestas/SobreMiCodigo'));
const Contacto = lazy(() => import('../pages/propuestas/Contacto'));

// Al cambiar de página, arrancar desde arriba
const ScrollArriba = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollArriba />
      <Suspense fallback={<div className="min-h-screen bg-[#040912]" />}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Inicio />} />
          <Route path="/projects" element={<Proyectos />} />
          <Route path="/about" element={<SobreMi />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
