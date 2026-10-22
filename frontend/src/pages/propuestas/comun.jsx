// Piezas compartidas por las 5 propuestas de inicio: datos, barra de navegación y piso en perspectiva.
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Code, Server, Database, Brain, Smartphone, BarChart3, Menu, X } from "lucide-react";
import "./propuestas.css";

// gancho: la promesa en una línea · d: qué resuelve · items: lo que incluye · cta: el botón de cada pantalla
export const SERVICIOS = [
  {
    id: "web", t: "Desarrollo Web", corto: "WEB", Icon: Code,
    gancho: "Tu negocio, abierto las 24 horas.",
    d: "Sitios, tiendas online y paneles a medida: rápidos, pensados para vender y listos para verse bien en cualquier pantalla.",
    items: ["Landings y sitios que convierten visitas en clientes", "Tiendas online con pagos y gestión de stock", "Paneles de administración a tu medida", "Velocidad y SEO técnico para aparecer en Google"],
    techs: ["React", "Next.js", "JavaScript", "Tailwind"], cta: "Quiero mi web",
  },
  {
    id: "backend", t: "Desarrollo Backend", corto: "BACKEND", Icon: Server,
    gancho: "El motor que no se ve, pero no falla.",
    d: "APIs seguras y preparadas para crecer, que conectan tu sistema con pagos, WhatsApp, facturación y todo lo que tu negocio ya usa.",
    items: ["APIs REST con arquitectura por features", "Integraciones con pagos, WhatsApp y facturación", "Usuarios, roles y seguridad desde el primer día", "Sistemas multi-cliente listos para escalar"],
    techs: ["Node.js", "Express", "Python", "PHP"], cta: "Quiero mi sistema",
  },
  {
    id: "movil", t: "Desarrollo Móvil", corto: "MÓVIL", Icon: Smartphone,
    gancho: "Tu marca, en el bolsillo de tus clientes.",
    d: "Apps para iOS y Android desde un solo código: llegás antes al mercado y pagás un desarrollo en lugar de dos.",
    items: ["Una sola app para iOS y Android", "Turnos, reservas y pedidos desde el celular", "Notificaciones push para que vuelvan", "Publicación en App Store y Google Play"],
    techs: ["React Native", "iOS", "Android"], cta: "Quiero mi app",
  },
  {
    id: "db", t: "Base de Datos", corto: "DATOS", Icon: Database,
    gancho: "Tu información, ordenada y siempre a mano.",
    d: "Bases de datos que crecen sin trabarse: consultas rápidas, respaldos al día y el fin de las planillas sueltas.",
    items: ["Diseño de bases SQL y NoSQL", "Migración desde Excel o sistemas viejos", "Consultas lentas que pasan a ser instantáneas", "Respaldos y protección de la información"],
    techs: ["MySQL", "PostgreSQL", "MongoDB", "SQL"], cta: "Ordenar mis datos",
  },
  {
    id: "analisis", t: "Análisis de Datos", corto: "ANÁLISIS", Icon: BarChart3,
    gancho: "Decisiones con números, no con intuición.",
    d: "Convierto la información de tu negocio en tableros claros que muestran qué se vende, qué no y dónde está la oportunidad.",
    items: ["Tableros y reportes que se arman solos", "Métricas de ventas, stock y clientes", "Datos de distintas fuentes en un solo lugar", "Tendencias y proyecciones para planificar"],
    techs: ["Python", "Pandas", "SQL", "Dashboards"], cta: "Ver mis números",
  },
  {
    id: "ia", t: "Inteligencia Artificial", corto: "IA", Icon: Brain,
    gancho: "Tu equipo, multiplicado con IA.",
    d: "Agentes y automatizaciones que trabajan 24/7: atienden clientes, procesan documentos y conectan tus sistemas mientras vos te enfocás en crecer.",
    items: ["Automatización de tareas repetitivas", "Orquestación de agentes que trabajan en equipo", "Harness, evaluación y control de agentes en producción", "Asistentes que conocen tu catálogo y tus documentos (RAG)"],
    techs: ["Agentes", "MCP", "RAG", "Python"], cta: "Automatizar mi negocio",
  },
];
export const STACK = ["JavaScript", "React", "Node.js", "Python", "PHP", "React Native"];

const SECCIONES = [["/home", "Inicio"], ["/projects", "Proyectos"], ["/about", "Sobre mí"]];

export const PNav = ({ claro = false }) => {
  const [abierto, setAbierto] = useState(false);
  const activo = ({ isActive }) => (isActive ? (claro ? "text-white" : "text-[#7cc4ff]") : "");
  return (
    <nav className={`pp-nav ${claro ? "claro" : ""}`}>
      <Link to="/" className="flex items-center gap-3" aria-label="Ricardo Mena, ir a la bienvenida">
        <img src="/logoani.svg" alt="" className="w-9 h-9" />
        <b className="font-display text-sm tracking-[.2em]">RICARDO MENA</b>
      </Link>
      <span className="hidden md:flex items-center gap-8 text-sm">
        {SECCIONES.map(([to, t]) => <NavLink key={to} to={to} className={activo}>{t}</NavLink>)}
        <Link to="/contact" className="pp-btn pp-btn-sm">Contacto</Link>
      </span>
      <button type="button" className="md:hidden p-2" aria-expanded={abierto} aria-label="Abrir menú" onClick={() => setAbierto((a) => !a)}>
        {abierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {abierto && (
        <div className="md:hidden absolute left-3 right-3 top-full mt-1 p-4 grid gap-3 bg-[#040912]/95 border border-[#7cc4ff]/40 text-[#d7e2ee] font-display text-sm tracking-[.12em]">
          {SECCIONES.map(([to, t]) => <NavLink key={to} to={to} className={activo} onClick={() => setAbierto(false)}>{t.toUpperCase()}</NavLink>)}
          <Link to="/contact" className="pp-btn pp-btn-sm justify-center" onClick={() => setAbierto(false)}>Contacto</Link>
        </div>
      )}
    </nav>
  );
};

// Piso en perspectiva que avanza (el mismo de la intro y los cierres)
export const GridFloor = ({ className = "", speed = 1 }) => {
  const ref = useRef();
  useEffect(() => {
    const svg = ref.current;
    let g = '<defs><linearGradient id="pfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4ff" stop-opacity=".06"/><stop offset="1" stop-color="#7cc4ff" stop-opacity=".7"/></linearGradient></defs><g stroke="url(#pfade)" stroke-width="2">';
    for (let k = -16; k <= 16; k++) g += `<line x1="${960 + k * 30}" y1="0" x2="${960 + k * 330}" y2="440"/>`;
    svg.innerHTML = g + '</g><g class="hl" stroke="#7cc4ff" stroke-width="2"></g>';
    const hls = Array.from({ length: 14 }, () => {
      const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
      l.setAttribute("x1", 0); l.setAttribute("x2", 1920);
      svg.querySelector(".hl").append(l);
      return l;
    });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, t0 = performance.now();
    const loop = (now) => {
      const f = still ? 0.5 : (((now - t0) / 1000) * 0.9 * speed) % 1;
      hls.forEach((l, i) => {
        const z = (i + f) / 14, y = 440 * z * z;
        l.setAttribute("y1", y); l.setAttribute("y2", y);
        l.setAttribute("stroke-opacity", (0.06 + z * 0.7).toFixed(2));
      });
      if (!still) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  return <svg ref={ref} className={`pp-grid ${className}`} viewBox="0 0 1920 440" preserveAspectRatio="none" aria-hidden="true" />;
};

export const HudCorners = () => (
  <>
    <i className="pp-hudc" style={{ left: 24, top: 88, borderLeftWidth: 2, borderTopWidth: 2 }} />
    <i className="pp-hudc" style={{ right: 24, top: 88, borderRightWidth: 2, borderTopWidth: 2 }} />
    <i className="pp-hudc" style={{ left: 24, bottom: 24, borderLeftWidth: 2, borderBottomWidth: 2 }} />
    <i className="pp-hudc" style={{ right: 24, bottom: 24, borderRightWidth: 2, borderBottomWidth: 2 }} />
  </>
);

// Texto que se desencripta letra por letra
const GLY = "!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
export const decrypt = (gsap, el, opts = {}) => {
  // el texto original queda guardado: si React monta dos veces no se toma el texto a medio desencriptar
  const full = (el.dataset.full ??= el.textContent), o = { p: 0 };
  return gsap.to(o, {
    p: 1, duration: opts.duration ?? 1, delay: opts.delay ?? 0, ease: "none",
    onUpdate: () => {
      const k = Math.floor(o.p * full.length);
      el.textContent = full.slice(0, k) + [...full.slice(k)].map((c) => (c === " " ? " " : GLY[(Math.random() * GLY.length) | 0])).join("");
    },
    onComplete: () => (el.textContent = full),
  });
};
