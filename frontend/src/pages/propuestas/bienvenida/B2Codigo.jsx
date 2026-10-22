// Bienvenida 2 · Lluvia de código: columnas de caracteres que caen y un nombre que se desencripta.
// Para entrar hay que mantener apretado el botón (con teclado, Enter entra directo).
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Redes, quieto } from "./comunes";
import { decrypt } from "../comun";

const GLIFOS = "アイウエオカキクケコ01{}[]<>/=+*#$&RICARDOMENA";

const Lluvia = ({ velRef }) => {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    let cols = [], raf, fs = 18;
    const size = () => {
      c.width = innerWidth * devicePixelRatio; c.height = innerHeight * devicePixelRatio;
      x.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      fs = innerWidth < 640 ? 14 : 18;
      cols = Array.from({ length: Math.ceil(innerWidth / fs) }, () => Math.random() * -innerHeight / fs);
    };
    size();
    addEventListener("resize", size);
    const loop = () => {
      x.fillStyle = "rgba(4,9,18,0.14)";
      x.fillRect(0, 0, innerWidth, innerHeight);
      x.font = `${fs}px "JetBrains Mono", monospace`;
      cols.forEach((y, i) => {
        const ch = GLIFOS[(Math.random() * GLIFOS.length) | 0];
        x.fillStyle = Math.random() > 0.97 ? "#d7e2ee" : "#7cc4ff";
        x.globalAlpha = 0.35 + Math.random() * 0.4;
        x.fillText(ch, i * fs, y * fs);
        cols[i] = y * fs > innerHeight && Math.random() > 0.975 ? 0 : y + velRef.current;
      });
      x.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    if (!quieto()) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, [velRef]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

const B2Codigo = ({ onIngresar }) => {
  const root = useRef();
  const vel = useRef(0.5);
  const carga = useRef();
  const [txt, setTxt] = useState("Mantené apretado para ingresar");

  const { contextSafe } = useGSAP(() => {
    if (quieto()) return;
    const q = (s) => root.current.querySelector(s);
    gsap.timeline()
      .from(".b2-caja", { opacity: 0, scale: 0.92, duration: 0.8, ease: "expo.out" }, 0.3)
      .add(decrypt(gsap, q(".b2-n1"), { duration: 1.1 }), 0.5)
      .add(decrypt(gsap, q(".b2-n2"), { duration: 0.9 }), 0.8)
      .add(decrypt(gsap, q(".b2-sub"), { duration: 1 }), 1.2)
      .from(".b2-in", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 1.6);
  }, { scope: root });

  const salir = contextSafe(() => {
    if (quieto()) return onIngresar();
    setTxt("Acceso concedido ✓");
    gsap.timeline({ onComplete: onIngresar })
      .to(vel, { current: 3, duration: 0.6, ease: "power2.in" })
      .to(".b2-caja", { scale: 1.08, opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, 0.2)
      .to(".b2-flash", { opacity: 1, duration: 0.3 }, 0.55);
  });

  // mantener apretado ~1 s llena la barra; soltar antes la vacía
  const apretar = contextSafe(() => {
    setTxt("Cargando acceso...");
    carga.current = gsap.to(".b2-barra", { scaleX: 1, duration: quieto() ? 0.01 : 1, ease: "power1.in", onComplete: salir });
    gsap.to(vel, { current: 1.4, duration: 1 });
  });
  const soltar = contextSafe(() => {
    if (!carga.current || carga.current.progress() === 1) return;
    carga.current.kill();
    setTxt("Mantené apretado para ingresar");
    gsap.to(".b2-barra", { scaleX: 0, duration: 0.3 });
    gsap.to(vel, { current: 0.5, duration: 0.5 });
  });

  return (
    <div ref={root} className="pp relative h-screen overflow-hidden bg-[#040912]">
      <Lluvia velRef={vel} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,9,18,.92)_20%,rgba(4,9,18,.35)_70%)] pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="b2-caja text-center px-6 md:px-14 py-12 border border-[#7cc4ff]/40 bg-[#040912]/80 shadow-[0_0_80px_rgba(124,196,255,.15)] [clip-path:polygon(0_0,94%_0,100%_10%,100%_100%,6%_100%,0_90%)]">
          <p className="b2-in font-mono text-[11px] tracking-[.35em] text-[#7cc4ff]/70 mb-6">ricardo@dev:~$ ./acceso</p>
          <h1 className="font-display font-black uppercase leading-[.95] text-white glow text-[clamp(40px,8vw,104px)]">
            <span className="b2-n1 block">Ricardo</span>
            <span className="b2-n2 block text-[#7cc4ff]">Mena</span>
          </h1>
          <p className="b2-sub mt-5 font-mono text-sm tracking-[.4em] text-[#d7e2ee]">DESARROLLADOR FULL STACK</p>
          <button type="button" className="b2-in relative mt-10 w-full max-w-sm mx-auto block px-6 py-4 border-2 border-[#7cc4ff] text-[#7cc4ff] font-display font-bold tracking-[.2em] uppercase text-sm overflow-hidden select-none touch-none"
            onPointerDown={apretar} onPointerUp={soltar} onPointerLeave={soltar}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), salir())}>
            <span className="b2-barra absolute inset-0 bg-[#7cc4ff] origin-left scale-x-0" />
            <span className="relative mix-blend-difference text-[#7cc4ff]">Ingresar</span>
          </button>
          <p className="b2-in mt-3 font-mono text-[11px] tracking-[.2em] text-[#9fb0c8]" aria-live="polite">{txt}</p>
          <Redes className="b2-in mt-8" />
        </div>
      </div>
      <div className="b2-flash absolute inset-0 bg-[#7cc4ff] opacity-0 pointer-events-none z-20" />
    </div>
  );
};

export default B2Codigo;
