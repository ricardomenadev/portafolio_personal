// Piezas compartidas por las bienvenidas: redes, botón "Ingresar" magnético y preferencia de movimiento.
import { useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Instagram, FileDown, ArrowRight } from "lucide-react";

export const quieto = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Redes = ({ claro = false, className = "" }) => (
  <div className={`flex justify-center items-center gap-6 ${className}`}>
    {[
      ["https://github.com/ricardomenadev", "GitHub", Github],
      ["https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257/", "LinkedIn", Linkedin],
      ["https://www.instagram.com/ricardoa_mena/", "Instagram", Instagram],
    ].map(([href, label, Icon]) => (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        className={`${claro ? "text-[#040912] hover:text-white" : "text-[#d7e2ee] hover:text-[#7cc4ff]"} hover:scale-110 transition`}>
        <Icon className="w-6 h-6" />
      </a>
    ))}
    <a href="/CV.pdf" download className={`flex items-center gap-2 ${claro ? "text-[#040912] hover:text-white" : "text-[#d7e2ee] hover:text-[#7cc4ff]"} hover:scale-110 transition`}>
      <FileDown className="w-6 h-6" /><span className="font-mono text-xs tracking-[.2em]">CV</span>
    </a>
  </div>
);

// Botón con imán: se acerca al cursor y vuelve con resorte
export const Ingresar = ({ onClick, claro = false, children = "Ingresar", className = "" }) => {
  const ref = useRef();
  const move = (e) => {
    if (quieto()) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  return (
    <button ref={ref} type="button" onClick={onClick} onPointerMove={move} onPointerLeave={leave}
      className={`pp-btn group text-base px-9 py-4 ${claro ? "!bg-[#040912] !text-white" : ""} ${className}`}>
      {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};
