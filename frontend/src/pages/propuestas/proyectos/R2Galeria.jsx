// Opción 2 · Galería: sección fijada que avanza de costado; cada proyecto es una tarjeta grande
// con contador "01 / 06" y la portada moviéndose a otra velocidad (parallax).
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROYECTOS } from "../../../data/proyectos";
import { Encabezado, Cierre, Portada, Links } from "./comunes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const R2Galeria = () => {
  const root = useRef();
  const [actual, setActual] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".pr-h .ln > span", { yPercent: 110, duration: 1, stagger: 0.1 })
        .from(".pr-in", { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.4);
    });
    // en pantallas anchas la galería se fija y corre de costado
    mm.add("(min-width: 900px)", () => {
      const pista = root.current.querySelector(".r2-pista");
      const tl = gsap.to(pista, {
        x: () => -(pista.scrollWidth - window.innerWidth + 64), ease: "none",
        scrollTrigger: {
          trigger: ".r2-pin", start: "top top", end: () => "+=" + pista.scrollWidth, pin: true, scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: (s) => setActual(Math.min(PROYECTOS.length - 1, Math.round(s.progress * (PROYECTOS.length - 1)))),
        },
      });
      // parallax de cada portada dentro de su tarjeta
      gsap.utils.toArray(".r2-port", root.current).forEach((el) =>
        gsap.fromTo(el, { xPercent: 8 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: el, containerAnimation: tl, start: "left right", end: "right left", scrub: true } })
      );
    });
  }, { scope: root });

  return (
    <div ref={root} className="pp">
      <Encabezado titulo="Algunos proyectos" acento="que construí" />

      <section className="r2-pin relative pp-cielo min-h-screen flex flex-col justify-center py-16 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-6 mb-8 flex items-end justify-between">
          <p className="font-mono text-xs tracking-[.3em] text-[#7cc4ff]">DESLIZÁ PARA RECORRER →</p>
          <p className="hidden md:block font-display font-black text-white text-2xl tabular-nums">
            {String(actual + 1).padStart(2, "0")} <span className="text-[#7cc4ff]/50">/ {String(PROYECTOS.length).padStart(2, "0")}</span>
          </p>
        </div>
        <div className="r2-pista flex flex-col md:flex-row gap-8 px-6 md:w-max">
          {PROYECTOS.map((p, i) => (
            <article key={p.id} className="md:w-[min(78vw,980px)] shrink-0 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center p-6 md:p-8 bg-[#0a1a33]/70 border border-[#7cc4ff]/30">
              <div className="overflow-hidden"><div className="r2-port"><Portada p={p} /></div></div>
              <div>
                <p className="font-display font-black text-6xl text-[#7cc4ff]/15 leading-none">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display font-black text-2xl md:text-3xl text-white">{p.nombre}</h3>
                <p className="mt-1 font-mono text-xs tracking-[.2em] text-[#7cc4ff]">{p.tipo.toUpperCase()} · {p.año}</p>
                <p className="mt-4 text-[#c9d6e6]">{p.resumen}</p>
                <p className="mt-2 text-sm text-[#9fb0c8]">{p.detalle}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="pp-chip">{s}</span>)}</div>
                <Links p={p} className="mt-6" />
              </div>
            </article>
          ))}
          <article className="md:w-[420px] shrink-0 p-8 pp-celeste flex flex-col justify-center">
            <p className="font-mono text-xs tracking-[.3em] text-[#0a1a33]">Y HAY MÁS</p>
            <h3 className="mt-2 font-display font-black text-3xl text-[#040912]">Esto es solo una parte</h3>
            <p className="mt-3 text-[#0a1a33]">Más proyectos en GitHub y sistemas privados que no puedo mostrar.</p>
          </article>
        </div>
      </section>

      <Cierre />
    </div>
  );
};

export default R2Galeria;
