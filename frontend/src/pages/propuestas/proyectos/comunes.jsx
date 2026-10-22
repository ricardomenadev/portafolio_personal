// Piezas compartidas por las opciones de Proyectos: portada, encabezado, links y cierre.
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { MAS_PROYECTOS } from "../../../data/proyectos";
import { PNav, HudCorners } from "../comun";
import { PisoCircuito } from "../Pisos";

// Portada dibujada: ventana de navegador con el nombre del proyecto en su color.
// Si el proyecto trae `imagen` (captura real), se muestra esa.
export const Portada = ({ p, className = "" }) => (
  <div className={`relative overflow-hidden bg-[#060d1a] border border-[#7cc4ff]/25 ${className}`} style={{ aspectRatio: "16 / 10" }}>
    {p.imagen ? (
      <img src={p.imagen} alt={`Captura de ${p.nombre}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    ) : (
      <>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(${p.color}22 1px, transparent 1px), linear-gradient(90deg, ${p.color}22 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 30%, ${p.color}33, transparent 60%)` }} />
        <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-3 py-2 border-b border-white/10 font-mono text-[10px] text-[#9fb0c8]">
          <span className="tracking-[.2em]" style={{ color: p.color }}>● ● ●</span>
          <span className="truncate">{p.demo ? p.demo.split("//").pop() : p.privado ? "sistema privado de cliente" : "demo en proceso"}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-6 pt-6">
          <p className="font-mono text-[10px] tracking-[.3em]" style={{ color: p.color }}>{p.tipo.toUpperCase()} · {p.año}</p>
          <p className="mt-2 font-display font-black uppercase leading-[.95] text-white text-[clamp(18px,2.4vw,30px)]" style={{ textShadow: `0 0 24px ${p.color}88` }}>{p.nombre}</p>
        </div>
        <div className="absolute left-6 right-6 bottom-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 border" style={{ borderColor: `${p.color}66`, color: p.color }}>{s}</span>)}
        </div>
      </>
    )}
    {p.ejemplo && <span className="absolute right-2 top-9 font-mono text-[9px] tracking-[.2em] px-1.5 py-0.5 bg-[#ffb454] text-[#040912]">EJEMPLO</span>}
  </div>
);

// Botones de demo y código; si todavía no hay link, lo dice
export const Links = ({ p, className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {p.demo ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn-sm"><ExternalLink className="w-3.5 h-3.5" /> Ver demo</a>
      : <span className="pp-chip opacity-80">{p.privado ? "sistema privado de cliente" : p.propio ? "proyecto propio · demo en proceso" : "demo en proceso"}</span>}
    {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn-sm pp-btn-line"><Github className="w-3.5 h-3.5" /> Código</a>}
  </div>
);

export const Encabezado = ({ titulo = "Proyectos", acento = "seleccionados", children }) => (
  <section className="relative pp-cielo pt-32 pb-14 px-6 overflow-hidden">
    <PNav />
    <HudCorners />
    <div className="relative z-10 max-w-6xl mx-auto">
      <p className="pr-in font-mono text-xs tracking-[.3em] text-[#7cc4ff] mb-4">PROYECTOS · UNA SELECCIÓN</p>
      <h1 className="pr-h font-display font-black text-4xl md:text-6xl leading-[1.04] text-white">
        <span className="ln"><span>{titulo}</span></span>
        <span className="ln"><span className="text-[#7cc4ff] glow">{acento}</span></span>
      </h1>
      <p className="pr-in mt-5 text-lg text-[#c9d6e6] max-w-2xl">
        Acá muestro algunos de los sistemas que construí. La mayoría son sistemas privados de clientes: te cuento qué hacen y con qué tecnologías, sin mostrar datos ni accesos. Y no están todos: hay más.
      </p>
      {children}
    </div>
  </section>
);

export const Cierre = () => (
  <section className="relative pp-cielo pt-24 pb-56 px-6 text-center overflow-hidden">
    {/* el piso queda solo en la franja de abajo, debajo de los botones */}
    <div className="absolute inset-x-0 bottom-0 h-44"><PisoCircuito /></div>
    <div className="relative z-10">
      <p className="font-mono text-xs tracking-[.3em] text-[#7cc4ff]">ESTOS SON SOLO ALGUNOS</p>
      <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-white">Hay <span className="text-[#7cc4ff] glow">más proyectos</span></h2>
      <p className="mt-4 text-lg text-[#c9d6e6] max-w-xl mx-auto">Muchos son sistemas privados que no puedo publicar. Contame qué querés construir y te muestro en una llamada trabajos parecidos.</p>
      <div className="mt-8 flex justify-center flex-wrap gap-3">
        <a href={MAS_PROYECTOS} target="_blank" rel="noopener noreferrer" className="pp-btn"><Github className="w-4 h-4" /> Mi GitHub</a>
        <Link to="/contact" className="pp-btn pp-btn-line">Hablemos de tu proyecto</Link>
      </div>
    </div>
  </section>
);
