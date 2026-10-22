// Presentación a pantalla completa al tocar "Ingresar".
// Misma receta que el cierre del canal: arranque en terminal → punto que explota → staccato →
// red de sistemas → firma con glitch RGB. Se puede saltar (botón, Esc o Enter).
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PisoCircuito } from "../../pages/propuestas/Pisos";
import "./intro.css";

gsap.registerPlugin(useGSAP);

const GLY = "!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
const LINES = [
  "> ./ricardo.sh",
  "> cargando experiencia ......... <span class='ok'>OK</span>",
  "> desarrollando desde 2022 ..... <span class='ok'>✓</span>",
  "> iniciando portafolio ......... <span class='ok'>EN CURSO</span>",
];
const WORDS = ["PROGRAMACIÓN.", "DESARROLLO WEB.", "APPS MÓVILES.", "IA."];
// Nodos de la red: posición en % dentro del bloque de la izquierda
const NODES = [
  ["WEB", 18, 16], ["BACKEND", 82, 16], ["MÓVIL", 12, 62], ["DATOS", 88, 62], ["IA", 50, 92],
];

const IntroSequence = ({ onDone }) => {
  const root = useRef();
  const tlRef = useRef();
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);
  soundRef.current = sound;

  const play = (name, volume = 0.35) => {
    if (!soundRef.current) return;
    const a = new Audio(`/sfx/${name}.wav`);
    a.volume = volume;
    a.play().catch(() => {});
  };

  const done = useRef(false);
  const finish = () => {
    if (done.current) return;
    done.current = true;
    tlRef.current?.kill();
    gsap.to(root.current, { opacity: 0, duration: 0.45, ease: "power2.out", onComplete: onDone });
  };

  useEffect(() => {
    const onKey = (e) => (e.key === "Escape" || e.key === "Enter") && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const $ = (s) => root.current.querySelector(s);
      const $$ = (s) => [...root.current.querySelectorAll(s)];
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
      tlRef.current = tl;
      if (import.meta.env.DEV) window.__introTl = tl; // para revisar cuadros desde la consola
      const show = (s, t) => tl.set(s, { visibility: "visible" }, t);
      const hide = (s, t) => tl.set(s, { visibility: "hidden" }, t);
      const sfx = (name, t, v) => tl.call(() => play(name, v), null, t);

      // ---------- ambiente: el piso es el circuito (anima solo); acá corre el reloj del HUD ----------
      const gp = { p: 0 };
      const reloj = $(".reloj");
      gsap.to(gp, {
        p: 60, duration: 60, ease: "none",
        onUpdate: () => (reloj.textContent = "RICARDO//DEV · T+00:" + String(Math.floor(gp.p)).padStart(2, "0")),
      });
      tl.from(".i-hudc", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.06, ease: "back.out(2)" }, 0);

      // ---------- desencriptar y glitch ----------
      const decrypt = (el, t, d) => {
        const full = el.textContent, o = { p: 0 };
        tl.set(el, { opacity: 1 }, t).to(o, {
          p: 1, duration: d, ease: "none", onUpdate: () => {
            const k = Math.floor(o.p * full.length);
            el.textContent = full.slice(0, k) + [...full.slice(k)].map((c) => (c === " " ? " " : GLY[(Math.random() * GLY.length) | 0])).join("");
          },
        }, t);
      };
      const glitchOut = (s, t) => {
        sfx("glitch", t, 0.25);
        tl.to(s, { keyframes: { x: [0, -40, 30, -15, 0], skewX: [0, 20, -15, 0], opacity: [1, 0.6, 1, 0.3, 0] }, duration: 0.35, ease: "steps(5)" }, t)
          .fromTo(".i-flash", { opacity: 0.5 }, { opacity: 0, duration: 0.25, immediateRender: false }, t + 0.2);
        hide(s, t + 0.4);
      };

      // ---------- A · arranque (0 – 3.1) ----------
      $(".i-term").innerHTML = LINES.map((l) => `<div class="tl">${l}</div>`).join("");
      show(".scA", 0);
      $$(".i-term .tl").forEach((l, i) => {
        tl.fromTo(l, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "steps(18)" }, 0.25 + i * 0.42);
        sfx(i ? "ok" : "blip", 0.6 + i * 0.42, 0.25);
      });
      const pp = { v: 0 };
      tl.fromTo(".i-pbar i", { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: "power2.inOut" }, 0.4)
        .to(pp, { v: 100, duration: 2.3, ease: "power2.inOut", onUpdate: () => ($(".i-pct").textContent = Math.round(pp.v) + "%") }, 0.4);
      sfx("rise", 1.2, 0.3);
      glitchOut(".scA", 2.85);

      // ---------- B · punto que explota + "Hola, soy Ricardo Mena" (3.2 – 7.0) ----------
      sfx("boom", 3.4, 0.4);
      tl.fromTo(".i-dot", { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(3)", immediateRender: false }, 3.2)
        .to(".i-dot", { scale: 0.45, duration: 0.22, ease: "power2.in" }, 3.5)
        .to(".i-dot", { scale: 1.7, duration: 0.1, ease: "power2.out" }, 3.7)
        .fromTo(".i-bgA", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.55, ease: "expo.out", immediateRender: false }, 3.73)
        .set(".i-dot", { scale: 0 }, 3.83);
      show(".scB", 3.8);
      tl.fromTo(".b1", { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out", immediateRender: false }, 3.9)
        .fromTo([".b2", ".b3"], { yPercent: 115 }, { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.12, immediateRender: false }, 4.05);
      sfx("whoosh", 4.5, 0.3);
      tl.fromTo(".b4", { x: "110vw", filter: "blur(30px)", skewX: -18 }, { x: 0, filter: "blur(0px)", skewX: 0, duration: 0.75, ease: "expo.out", immediateRender: false }, 4.55);
      // estela del rol
      const src = $(".b4");
      [1, 2, 3].forEach((i) => {
        const c = src.cloneNode(true);
        c.classList.remove("b4");
        Object.assign(c.style, { position: "absolute", left: 0, top: "0.04em", opacity: 0 });
        src.parentNode.insertBefore(c, src);
        tl.fromTo(c, { x: "110vw", opacity: 0.35 - i * 0.1 }, { x: 0, opacity: 0, duration: 0.6 + i * 0.12, ease: "expo.out", immediateRender: false }, 4.55 + 0.04 * i);
      });
      sfx("whoosh", 6.5, 0.3);
      tl.to(".scB", { x: "-100vw", filter: "blur(24px)", duration: 0.5, ease: "power4.in" }, 6.5);
      hide(".scB", 7.0);

      // ---------- C · a qué me dedico, en staccato (7.0 – 9.4) ----------
      show(".scC", 7.0);
      $$(".i-word span").forEach((s, i) => {
        const t = 7.0 + i * 0.55, claro = i % 2 === 0;
        s.style.color = claro ? "#040912" : "#7cc4ff";
        tl.set(".i-bgA", { clipPath: claro ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }, t)
          .set(s, { opacity: 1 }, t)
          .fromTo(s, { scale: 1.35, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, t)
          .fromTo(".i-flash", { opacity: 0.35 }, { opacity: 0, duration: 0.18, immediateRender: false }, t)
          .set(s, { opacity: 0 }, t + 0.55);
        sfx("blip", t, 0.3);
      });
      tl.set(".i-bgA", { clipPath: "circle(0% at 50% 50%)" }, 9.2);
      hide(".scC", 9.2);

      // ---------- D · red de sistemas + paneles (9.2 – 12.3) ----------
      show(".scD", 9.2);
      tl.set(".i-dTit", { opacity: 0 }, 0);
      decrypt($(".i-dTit"), 9.25, 0.9);
      tl.fromTo(".nc", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)", immediateRender: false }, 9.4);
      $$(".i-arco").forEach((p, i) => {
        gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 });
        tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, 9.75 + i * 0.1);
      });
      tl.fromTo(".nn", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.1, immediateRender: false }, 10.1);
      sfx("ok", 10.1, 0.25);
      tl.fromTo(".i-panel", { x: 160, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "expo.out", stagger: 0.25, immediateRender: false }, 10.6);
      tl.to(".nc", { boxShadow: "0 0 80px rgba(124,196,255,0.9)", duration: 0.4, yoyo: true, repeat: 3 }, 10.7);
      glitchOut(".scD", 12.0);

      // ---------- E · firma con glitch RGB (12.5 – 16) ----------
      show(".scE", 12.5);
      sfx("boom", 12.5, 0.35);
      tl.set([".i-sub", ".i-hola"], { opacity: 0 }, 0)
        .fromTo(".ff", { opacity: 0, scale: 1.6, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out", immediateRender: false }, 12.5)
        .fromTo(".fm", { x: 0 }, { keyframes: { x: [-30, 14, -8, 4, -18, 0] }, duration: 1.2, ease: "steps(6)", immediateRender: false }, 12.5)
        .fromTo(".fc", { x: 0 }, { keyframes: { x: [30, -14, 8, -4, 18, 0] }, duration: 1.2, ease: "steps(6)", immediateRender: false }, 12.5)
        .to(".ff", { keyframes: { clipPath: ["inset(20% 0 60% 0)", "inset(0 0 0 0)", "inset(55% 0 20% 0)", "inset(0 0 0 0)"] }, duration: 0.5, ease: "steps(4)" }, 13.5);
      sfx("glitch", 13.5, 0.25);
      decrypt($(".i-sub"), 12.9, 1.1);
      tl.fromTo(".i-hola", { opacity: 0, scale: 1.3, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "expo.out", immediateRender: false }, 13.8);
      // salida: destello y se abre el portafolio
      sfx("rise", 15.0, 0.3);
      tl.to(".i-flash", { opacity: 0.9, duration: 0.35, ease: "power2.in" }, 15.4)
        .to(".scE", { scale: 1.15, filter: "blur(12px)", duration: 0.5, ease: "power2.in" }, 15.3);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="intro" role="dialog" aria-label="Presentación de Ricardo A. Mena">
      {/* ambiente fijo */}
      <div className="absolute inset-x-0 bottom-0 h-[46%]"><PisoCircuito /></div>
      <div className="i-hudc" style={{ left: "2.6%", top: "4.6%", borderLeftWidth: 3, borderTopWidth: 3 }} />
      <div className="i-hudc" style={{ right: "2.6%", top: "4.6%", borderRightWidth: 3, borderTopWidth: 3 }} />
      <div className="i-hudc" style={{ left: "2.6%", bottom: "4.6%", borderLeftWidth: 3, borderBottomWidth: 3 }} />
      <div className="i-hudc" style={{ right: "2.6%", bottom: "4.6%", borderRightWidth: 3, borderBottomWidth: 3 }} />
      <div className="i-hud-txt reloj" style={{ left: "7.3%" }}>RICARDO//DEV · T+00:00</div>
      <div className="i-hud-txt r" style={{ right: "7.3%" }}>DESARROLLO · IA · SEGURIDAD</div>

      <div className="i-bgA" />
      <div className="i-dot" />

      {/* A · arranque */}
      <div className="i-sc scA">
        <div className="i-term" />
        <div className="i-pbar"><i /></div>
        <div className="i-pct">0%</div>
      </div>

      {/* B · presentación */}
      <div className="i-sc scB">
        <div className="i-B i-X">
          <span className="ln hola"><span className="b1">Hola, soy</span></span>
          <span className="nombre">
            <span className="ln"><span className="b2">Ricardo</span></span>
            <span className="ln"><span className="b3">Mena</span></span>
          </span>
          <span className="ln rol"><span className="b4">Desarrollador de software.</span></span>
        </div>
      </div>

      {/* C · staccato */}
      <div className="i-sc scC">
        <div className="i-word i-X">
          {WORDS.map((w) => <span key={w}>{w}</span>)}
        </div>
      </div>

      {/* D · red de sistemas */}
      <div className="i-sc scD">
        <div className="i-dTit">LO QUE CONSTRUYO, LO USO DE VERDAD</div>
        <div className="i-D">
          <div className="i-net">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" stroke="#7cc4ff" strokeWidth="3" strokeLinecap="round">
                {NODES.map(([n, x, y]) => (
                  <path key={n} className="i-arco" pathLength="1" vectorEffect="non-scaling-stroke" d={`M50 50 Q ${(50 + x) / 2} ${y < 50 ? 50 : y} ${x} ${y}`} />
                ))}
              </g>
            </svg>
            <div className="i-nodo centro nc" style={{ left: "50%", top: "50%" }}>⚙ SISTEMAS</div>
            {NODES.map(([n, x, y]) => (
              <div key={n} className="i-nodo nn" style={{ left: `${x}%`, top: `${y}%` }}>{n}</div>
            ))}
          </div>
          <div className="i-panels">
            <div className="i-panel"><div className="v">CÓDIGO REAL</div><div className="l">NADA DE EJEMPLOS DE JUGUETE</div></div>
            <div className="i-panel"><div className="v">EN PRODUCCIÓN</div><div className="l">SISTEMAS QUE SE USAN TODOS LOS DÍAS</div></div>
            <div className="i-panel"><div className="v">PARA EMPRESAS</div><div className="l">PROBLEMAS DE VERDAD</div></div>
          </div>
        </div>
      </div>

      {/* E · firma */}
      <div className="i-sc scE">
        <div className="i-E">
          <div className="i-rgb">
            <span className="fm" style={{ color: "var(--w)" }}>RICARDO MENA</span>
            <span className="fc" style={{ color: "var(--c)" }}>RICARDO MENA</span>
            <b className="ff glow" style={{ position: "relative", color: "#fff" }}>RICARDO MENA</b>
          </div>
          <div className="i-sub">DESARROLLO · IA · SEGURIDAD</div>
          <div className="i-hola">BIENVENIDO.</div>
        </div>
      </div>

      <div className="i-flash" /><div className="i-vig" /><div className="i-scan" />

      <div className="i-ctrl">
        <button type="button" onClick={() => setSound((s) => !s)} aria-pressed={!sound}>
          {sound ? "Silenciar" : "Activar sonido"}
        </button>
        <button type="button" onClick={finish}>Saltar intro ▸</button>
      </div>
    </div>
  );
};

export default IntroSequence;
