// Propuesta 6 · Destello + Staccato: arriba el celeste de "Destello"; al bajar, el círculo oscuro
// lleva a la secuencia fijada de "Staccato", donde cada tramo de scroll es una habilidad.
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { SERVICIOS, STACK, PNav } from "./comun";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const P6Mezcla = () => {
  const root = useRef();
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // entrada del hero (Destello)
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".c6-h .ln > span", { yPercent: 115, duration: 1, stagger: 0.12 })
        .fromTo(".c6-rol", { x: "60vw", filter: "blur(24px)", skewX: -16 }, { x: 0, filter: "blur(0px)", skewX: 0, duration: 0.9 }, 0.45)
        .from(".c6-in", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.8);
      gsap.to(".c6-h", { yPercent: 30, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".c6-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".c6-noche", { clipPath: "circle(0% at 50% 100%)" }, { clipPath: "circle(150% at 50% 100%)", ease: "none", scrollTrigger: { trigger: ".c6-hero", start: "40% top", end: "bottom top", scrub: true } });
    });

    // secuencia de habilidades (Staccato); con movimiento reducido cambia de escena sin desenfoque ni flash
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slides = gsap.utils.toArray(".c6-slide", root.current);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".c6-pin", start: "top top", end: () => "+=" + window.innerHeight * slides.length,
        pin: true, scrub: 0.4, snap: slides.map((_, i) => (i + 0.6) / slides.length),
      },
    });
    slides.forEach((s, i) => {
      const claro = i % 2 === 0;
      tl.set(".c6-bg", { clipPath: claro ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }, i)
        .set(s, { autoAlpha: 1 }, i)
        .fromTo(s.querySelector(".c6-w"), { scale: still ? 1 : 1.35, filter: still ? "none" : "blur(12px)" }, { scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, i)
        .fromTo(s.querySelectorAll(".c6-det > *"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, i + 0.15);
      if (!still) tl.fromTo(".c6-flash", { opacity: 0.35 }, { opacity: 0, duration: 0.15 }, i);
      if (i < slides.length - 1) tl.set(s, { autoAlpha: 0 }, i + 1);
    });
    tl.to(".c6-bar", { scaleX: 1, ease: "none", duration: slides.length }, 0);
  }, { scope: root });

  return (
    <div ref={root} className="pp">
      {/* Arriba · Destello */}
      <section className="c6-hero pp-celeste relative min-h-screen overflow-hidden">
        <PNav claro />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20">
          <p className="c6-in font-display font-bold text-sm md:text-base tracking-[.3em] text-[#040912]">HOLA, SOY</p>
          <h1 className="c6-h origin-left font-display font-black uppercase leading-[.9] text-[#040912] text-[clamp(64px,13vw,190px)] mt-2">
            <span className="ln"><span>Ricardo</span></span>
            <span className="ln"><span>Mena</span></span>
          </h1>
          <p className="c6-rol font-display font-black uppercase text-white text-2xl md:text-5xl mt-4 [text-shadow:0_8px_30px_rgba(4,9,18,.35)]">Desarrollador Full Stack.</p>
          <p className="c6-in mt-6 max-w-xl text-lg text-[#0a1a33]">Apps web y móviles, análisis de datos e inteligencia artificial. Transformo ideas en realidad digital.</p>
          <div className="c6-in mt-6 flex flex-wrap gap-2">
            {STACK.map((s) => <span key={s} className="font-mono text-xs px-3 py-1.5 bg-[#040912] text-[#7cc4ff]">{s}</span>)}
          </div>
          <div className="c6-in mt-8 flex gap-3">
            <Link to="/projects" className="pp-btn !bg-[#040912] !text-white">Explorar proyectos</Link>
            <Link to="/contact" className="pp-btn pp-btn-line !text-[#040912] ![box-shadow:inset_0_0_0_2px_#040912]">Contacto</Link>
          </div>
        </div>
        <div className="c6-noche pp-cielo absolute inset-0 z-20" />
      </section>

      {/* Medio · Staccato */}
      <section className="c6-pin relative h-screen overflow-hidden pp-cielo">
        <div className="c6-bg pp-celeste absolute inset-0" />
        {SERVICIOS.map(({ id, t, corto, gancho, d, items, techs, cta, Icon }, i) => {
          const claro = i % 2 === 0;
          const tinta = claro ? "text-[#040912]" : "text-white";
          const suave = claro ? "text-[#0a1a33]" : "text-[#c9d6e6]";
          return (
            <div key={id} className="c6-slide invisible absolute inset-0 flex items-center px-6 pt-16 pb-28">
              <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-14 items-center">
                <div>
                  <p className={`flex items-center gap-2 font-display font-bold tracking-[.15em] text-xs md:text-sm ${suave}`}><Icon className="w-4 h-4" /> 0{i + 1} / 06 · {t.toUpperCase()}</p>
                  <h2 className={`c6-w origin-left font-display font-black uppercase leading-none mt-3 text-[clamp(44px,9vw,150px)] ${claro ? "text-[#040912]" : "text-[#7cc4ff] glow"}`}>{corto}.</h2>
                  <p className={`mt-4 font-display font-black text-xl md:text-3xl leading-tight ${tinta}`}>{gancho}</p>
                </div>
                <div className={`c6-det ${suave}`}>
                  <p className="text-base md:text-lg">{d}</p>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm md:text-base">
                    {items.map((x) => (
                      <li key={x} className="flex gap-2.5">
                        <Check className={`w-5 h-5 shrink-0 mt-0.5 ${claro ? "text-[#040912]" : "text-[#7cc4ff]"}`} />
                        <span className={tinta}>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex flex-wrap gap-2">
                    {techs.map((x) => <span key={x} className={`font-mono text-xs px-2.5 py-1 ${claro ? "bg-[#040912] text-[#7cc4ff]" : "border border-[#7cc4ff]/50 text-[#7cc4ff]"}`}>{x}</span>)}
                  </p>
                  <Link to="/contact" className={`pp-btn mt-6 ${claro ? "!bg-[#040912] !text-white" : ""}`}>{cta} →</Link>
                </div>
              </div>
            </div>
          );
        })}
        <div className="c6-flash absolute inset-0 bg-[#7cc4ff] opacity-0 mix-blend-screen pointer-events-none" />
        <div className="absolute left-6 right-6 bottom-20 h-[3px] bg-[#7cc4ff]/20"><i className="c6-bar block h-full bg-[#7cc4ff] origin-left scale-x-0" /></div>
      </section>

      {/* Cierre */}
      <section className="relative py-32 px-6 text-center pp-cielo">
        <h2 className="font-display font-black text-3xl md:text-6xl text-white">¿Arrancamos <span className="text-[#7cc4ff]">tu proyecto</span>?</h2>
        <div className="mt-8 flex justify-center gap-3"><Link to="/projects" className="pp-btn">Explorar proyectos</Link><Link to="/contact" className="pp-btn pp-btn-line">Contacto</Link></div>
      </section>
    </div>
  );
};

export default P6Mezcla;
