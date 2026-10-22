// Sobre mí · versión "Código en vivo": la página es un IDE con vista previa.
// El scroll escribe el código de cada archivo y la vista previa "compila" lo que describe.
// Interacción: pestañas que saltan de archivo, valores del código que se pueden tocar,
// resaltado cruzado código ↔ vista previa, editor que sigue al mouse y una terminal con comandos.
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, GitCommit } from "lucide-react";
import perfil from "../../assets/images/perfil2.jpg";
import { PNav } from "./comun";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
const AREAS = ["Full Stack", "Web", "Backend", "Móvil", "Datos", "IA"];

// Cada archivo: líneas de código (k = clave que se resalta junto con la vista previa)
const ARCHIVOS = [
  { nombre: "sobre-mi.ts", lineas: [
    { t: "export const ricardo = {" },
    { t: '  nombre: "Ricardo A. Mena",', k: "nombre" },
    { t: "  rol: ROL,", k: "rol", rol: true },
    { t: "  desde: 2022,", k: "desde" },
    { t: '  base: "Corrientes, Argentina",', k: "base" },
    { t: "  disponible: DISP,", k: "disponible", disp: true },
    { t: "};" },
  ] },
  { nombre: "principios.ts", lineas: [
    { t: "const principios = [" },
    { t: '  "Código real",      // nada de ejemplos de juguete', k: "p0" },
    { t: '  "En producción",    // sistemas que se usan a diario', k: "p1" },
    { t: '  "Para empresas",    // problemas de verdad', k: "p2" },
    { t: '  "Claro y sencillo", // te explico cada decisión', k: "p3" },
    { t: "];" },
  ] },
  { nombre: "stack.json", lineas: [
    { t: "{" },
    { t: '  "frontend": ["React", "Next.js", "Tailwind"],', k: "frontend" },
    { t: '  "backend":  ["Node.js", "Express", "Python", "PHP"],', k: "backend" },
    { t: '  "movil":    ["React Native", "iOS", "Android"],', k: "movil" },
    { t: '  "datos":    ["MySQL", "PostgreSQL", "MongoDB"],', k: "datos" },
    { t: '  "ia":       ["Agentes", "MCP", "RAG", "Automatizaciones"]', k: "ia" },
    { t: "}" },
  ] },
  { nombre: "trayectoria.sh", lineas: [
    { t: "$ git log --oneline ricardo" },
    { t: "a1f3c2e  2022   feat: diplomatura Full Stack (UTN FRRe)", k: "h0" },
    { t: "c47e9b1  2022+  feat: web, móvil, datos e IA para empresas", k: "h1" },
    { t: "f09d2aa  hoy    feat: SaaS en producción + contenido técnico", k: "h2" },
    { t: "" },
    { t: "// siguiente commit: tu proyecto", k: "h3" },
  ] },
];

const STACK = {
  frontend: ["React", "Next.js", "Tailwind"],
  backend: ["Node.js", "Express", "Python", "PHP"],
  movil: ["React Native", "iOS", "Android"],
  datos: ["MySQL", "PostgreSQL", "MongoDB"],
  ia: ["Agentes", "MCP", "RAG", "Automatizaciones"],
};
const HITOS = [
  ["2022", "Diplomatura Full Stack", "UTN · Facultad Regional Resistencia."],
  ["2022 → hoy", "Desarrollador Full Stack", "Web, móvil, datos e IA para empresas."],
  ["Hoy", "Construyo y enseño", "Un SaaS en producción y contenido técnico en redes."],
];

// Resaltado de sintaxis simple: comentarios, textos, palabras clave, números y claves
const TOKEN = /(\/\/.*$)|("[^"]*")|\b(export|const|true|false)\b|\b(\d{4}|\d+)\b|^(\s*)([\wáéíóú]+)(?=:)|(\$ .*)|^([0-9a-f]{7})/g;
const pintar = (linea) => {
  const out = [];
  let last = 0;
  linea.replace(TOKEN, (m, com, str, kw, num, sp, key, cmd, hash, i) => {
    if (i > last) out.push([linea.slice(last, i), "text-[#d7e2ee]"]);
    if (com) out.push([com, "text-[#6b7f99] italic"]);
    else if (str) out.push([str, "text-[#7cff9b]"]);
    else if (kw) out.push([kw, "text-[#c792ea]"]);
    else if (num) out.push([num, "text-[#ffb454]"]);
    else if (key) { out.push([sp, ""]); out.push([key, "text-[#7cc4ff]"]); }
    else if (cmd) out.push([cmd, "text-[#bfe3ff]"]);
    else if (hash) out.push([hash, "text-[#ffb454]"]);
    last = i + m.length;
    return m;
  });
  if (last < linea.length) out.push([linea.slice(last), "text-[#d7e2ee]"]);
  return out.map(([t, c], j) => <span key={j} className={c}>{t}</span>);
};

// Respuestas de la terminal
const AYUDA = "comandos: sobre · stack · trayectoria · contacto · cv · whoami · clear · sudo contratar";
const COMANDOS = {
  help: () => [AYUDA],
  ayuda: () => [AYUDA],
  whoami: () => ["visitante · pero podés ser el próximo cliente ;)"],
  sobre: () => ["Ricardo A. Mena · Desarrollador Full Stack desde 2022 · Corrientes, Argentina.", "Construyo apps web y móviles, sistemas con datos e IA para empresas."],
  stack: () => Object.entries(STACK).map(([k, v]) => `${k.padEnd(9)} ${v.join(" · ")}`),
  trayectoria: () => HITOS.map(([a, t]) => `${a.padEnd(11)} ${t}`),
  contacto: () => ["email     ricardoamena@gmail.com", "whatsapp  +54 9 379 473-9888", "linkedin  /in/ricardo-alexandro-mena", "instagram @ricardoa_mena", "github    @ricardomenadev"],
  cv: () => ["descargando CV.pdf ... ✓"],
  "sudo contratar": () => ["[sudo] contraseña: ********", "permiso concedido ✓ — abriendo contacto..."],
};

const SobreMiCodigo = () => {
  const root = useRef();
  const navigate = useNavigate();
  const st = useRef();
  const [cap, setCap] = useState(0);
  const [rol, setRol] = useState(0);
  const [disp, setDisp] = useState(true);
  const [hist, setHist] = useState([{ c: "", o: ["Escribí help para ver los comandos."] }]);
  const [cmd, setCmd] = useState("");
  const termEnd = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = ARCHIVOS.length;

    // secuencia fijada: cada archivo ocupa un tramo de scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".k-pin", start: "top top", end: () => "+=" + window.innerHeight * n * 1.1, pin: true, scrub: still ? true : 0.5,
        onUpdate: (s) => {
          setCap(Math.min(n - 1, Math.floor(s.progress * (n + 0.3))));
          gsap.set(".k-mini-vista", { top: `${s.progress * 75}%` });
        },
      },
    });
    st.current = tl.scrollTrigger;
    for (let c = 0; c < n; c++) {
      const code = `.k-code-${c}`, prev = `.k-prev-${c}`;
      tl.set([code, prev], { autoAlpha: 1 }, c)
        .fromTo(`${code} .k-l`, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.1, stagger: 0.08, ease: "steps(12)" }, c + 0.02)
        .fromTo(`${prev} .k-pv`, { y: 24, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.15, stagger: 0.08, ease: "back.out(2)" }, c + 0.1);
      if (c < n - 1) tl.set([code, prev], { autoAlpha: 0 }, c + 1);
    }
    tl.to({}, { duration: 0.3 });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".k-h .ln > span", { yPercent: 110, duration: 1, stagger: 0.1 })
        .from(".k-in", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.4)
        .from(".k-ide", { y: 100, opacity: 0, duration: 1.1 }, 0.3);
      // el IDE llega inclinado y se endereza justo cuando se fija
      gsap.fromTo(".k-ide", { rotateX: 22, scale: 0.94 }, { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".k-pin", start: "top bottom", end: "top top", scrub: true } });
      // inclinación con el mouse
      const rx = gsap.quickTo(".k-ide", "rotationY", { duration: 0.8, ease: "power3" });
      const onMove = (e) => rx((e.clientX / window.innerWidth - 0.5) * 6);
      window.addEventListener("pointermove", onMove);
      gsap.from(".k-term", { y: 60, opacity: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".k-term", start: "top 85%" } });
      return () => window.removeEventListener("pointermove", onMove);
    });
  }, { scope: root });

  // resaltado cruzado: pasar por una línea o un elemento enciende su pareja
  useEffect(() => {
    const el = root.current;
    const on = (e) => {
      const k = e.target.closest("[data-k]")?.dataset.k;
      el.querySelectorAll(".k-hl").forEach((x) => x.classList.remove("k-hl"));
      if (k) el.querySelectorAll(`[data-k="${k}"]`).forEach((x) => x.classList.add("k-hl"));
    };
    el.addEventListener("pointerover", on);
    return () => el.removeEventListener("pointerover", on);
  }, []);

  // baja solo la caja de la terminal, no la página
  useEffect(() => {
    const box = termEnd.current?.parentElement;
    if (box) box.scrollTop = box.scrollHeight;
  }, [hist]);

  const irA = (c) => {
    const s = st.current;
    if (!s) return;
    window.scrollTo({ top: s.start + ((s.end - s.start) * (c + 0.55)) / (ARCHIVOS.length + 0.3), behavior: "smooth" });
  };

  const ejecutar = (e) => {
    e.preventDefault();
    const c = cmd.trim().toLowerCase();
    setCmd("");
    if (!c) return;
    if (c === "clear") return setHist([]);
    const fn = COMANDOS[c];
    setHist((h) => [...h, { c, o: fn ? fn() : [`comando no encontrado: ${c}. Probá con help.`] }]);
    if (c === "cv") window.open("/CV.pdf", "_blank");
    if (c === "sudo contratar") gsap.delayedCall(1.2, () => navigate("/contact"));
  };

  const rolTxt = AREAS[rol];

  return (
    <div ref={root} className="pp pp-cielo">
      <style>{`.k-hl{outline:1px solid #ffb454;outline-offset:2px;background:rgba(255,180,84,.08)!important}`}</style>
      <PNav />

      {/* Presentación */}
      <section className="relative pt-32 pb-10 px-6 text-center">
        <p className="k-in font-mono text-xs tracking-[.3em] text-[#7cc4ff] mb-4">SOBRE MÍ · EN CÓDIGO</p>
        <h1 className="k-h font-display font-black text-4xl md:text-6xl leading-[1.04] text-white">
          <span className="ln"><span>Abrí el código.</span></span>
          <span className="ln"><span className="text-[#7cc4ff] glow">Conoceme.</span></span>
        </h1>
        <p className="k-in mt-5 text-lg text-[#c9d6e6] max-w-2xl mx-auto">Bajá y mirá cómo se compila mi perfil en vivo. Tocá los valores resaltados del código y pasá el mouse por las líneas.</p>
      </section>

      {/* IDE fijado */}
      <section className="k-pin relative h-screen flex items-center px-3 md:px-6 [perspective:1600px]">
        <div className="k-ide w-full max-w-7xl mx-auto h-[86vh] grid grid-rows-[auto_1fr] border border-[#7cc4ff]/40 bg-[#060d1a] shadow-[0_40px_120px_rgba(90,160,230,.22)]">
          {/* pestañas */}
          <div className="flex items-stretch border-b border-[#7cc4ff]/20 font-mono text-xs overflow-x-auto">
            <span className="px-4 py-3 text-[#7cc4ff]/60 shrink-0">● ● ●</span>
            {ARCHIVOS.map((a, i) => (
              <button key={a.nombre} type="button" onClick={() => irA(i)}
                className={`px-4 py-3 shrink-0 border-r border-[#7cc4ff]/10 transition-colors ${cap === i ? "bg-[#0a1a33] text-white shadow-[inset_0_2px_0_#7cc4ff]" : "text-[#9fb0c8] hover:text-white"}`}>
                {a.nombre}
              </button>
            ))}
            <span className="ml-auto px-4 py-3 text-[#7cff9b] shrink-0 hidden sm:block">● compilando en vivo</span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_1fr] min-h-0">
            {/* editor */}
            <div className="relative border-b lg:border-b-0 lg:border-r border-[#7cc4ff]/15 min-h-0 overflow-hidden">
              {ARCHIVOS.map((a, c) => (
                <pre key={a.nombre} className={`k-code-${c} invisible absolute inset-0 p-4 md:p-6 pr-10 font-mono text-[11px] sm:text-[13px] md:text-[14px] leading-7 overflow-x-auto`}>
                  {a.lineas.map((l, i) => (
                    <div key={i} data-k={l.k} className="k-l flex gap-4 rounded-sm cursor-default">
                      <span className="w-6 text-right text-[#3d5170] select-none shrink-0">{i + 1}</span>
                      <code className="whitespace-pre">
                        {l.rol ? (
                          <>
                            <span className="text-[#7cc4ff]">  rol</span><span className="text-[#d7e2ee]">: </span>
                            <button type="button" onClick={() => setRol((r) => (r + 1) % AREAS.length)} className="text-[#7cff9b] underline decoration-dotted underline-offset-4 hover:bg-[#7cff9b]/10" title="Tocá para cambiar">
                              &quot;Desarrollador {rolTxt}&quot;
                            </button><span className="text-[#d7e2ee]">,</span>
                          </>
                        ) : l.disp ? (
                          <>
                            <span className="text-[#7cc4ff]">  disponible</span><span className="text-[#d7e2ee]">: </span>
                            <button type="button" onClick={() => setDisp((d) => !d)} className="text-[#c792ea] underline decoration-dotted underline-offset-4 hover:bg-[#c792ea]/10" title="Tocá para cambiar">
                              {String(disp)}
                            </button><span className="text-[#d7e2ee]">,</span>
                          </>
                        ) : pintar(l.t)}
                      </code>
                    </div>
                  ))}
                </pre>
              ))}
              {/* minimapa */}
              <div className="absolute right-2 top-4 bottom-4 w-5 hidden md:block" aria-hidden="true">
                {ARCHIVOS.map((a, i) => (
                  <div key={a.nombre} className="h-1/4 py-1 space-y-[3px] opacity-60">
                    {a.lineas.map((_, j) => <i key={j} className={`block h-[2px] ${i === cap ? "bg-[#7cc4ff]" : "bg-[#3d5170]"}`} style={{ width: `${40 + ((j * 37) % 60)}%` }} />)}
                  </div>
                ))}
                <div className="k-mini-vista absolute left-[-3px] right-[-3px] h-1/4 border border-[#7cc4ff]/60 bg-[#7cc4ff]/10" />
              </div>
            </div>

            {/* vista previa */}
            <div className="relative min-h-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#0d2246_0%,#060d1a_70%)]">
              <span className="absolute inset-x-0 top-0 h-9 flex items-center px-4 border-b border-[#7cc4ff]/10 font-mono text-[10px] tracking-[.25em] text-[#7cc4ff]/70">VISTA PREVIA</span>

              {/* 0 · perfil */}
              <div className="k-prev-0 invisible absolute inset-x-0 bottom-0 top-9 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 p-6">
                <div className="k-pv w-28 md:w-44 aspect-square p-[3px] bg-[#7cc4ff] shadow-[0_0_50px_rgba(124,196,255,.35)] shrink-0" style={{ clipPath: HEX }}>
                  <img src={perfil} alt="Ricardo A. Mena" className="w-full h-full object-cover scale-[1.12] object-[50%_28%]" style={{ clipPath: HEX }} />
                </div>
                <div className="text-center md:text-left">
                  <p className="k-pv font-display font-black text-2xl md:text-3xl text-white" data-k="nombre">Ricardo A. Mena</p>
                  <p className="k-pv mt-1 font-display text-[#7cc4ff] text-lg" data-k="rol">Desarrollador {rolTxt}</p>
                  <p className="k-pv mt-3 text-sm text-[#c9d6e6]" data-k="desde">Programando profesionalmente desde 2022</p>
                  <p className="k-pv text-sm text-[#c9d6e6]" data-k="base">Corrientes, Argentina</p>
                  <p className="k-pv mt-4 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs border" data-k="disponible"
                    style={{ color: disp ? "#7cff9b" : "#ffb454", borderColor: disp ? "#7cff9b" : "#ffb454" }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: disp ? "#7cff9b" : "#ffb454" }} />
                    {disp ? "Disponible para proyectos" : "Agenda completa · escribime igual"}
                  </p>
                </div>
              </div>

              {/* 1 · principios */}
              <div className="k-prev-1 invisible absolute inset-x-0 bottom-0 top-9 grid grid-cols-2 content-center gap-3 md:gap-4 p-5 md:p-8">
                {[["Código real", "Nada de ejemplos de juguete."], ["En producción", "Sistemas que se usan todos los días."], ["Para empresas", "Problemas de negocio de verdad."], ["Claro y sencillo", "Te explico cada decisión."]].map(([t, d], i) => (
                  <div key={t} data-k={`p${i}`} className="k-pv p-4 md:p-5 bg-[#0a1a33] border-2 border-[#7cc4ff]/50 [clip-path:polygon(0_0,90%_0,100%_16%,100%_100%,10%_100%,0_84%)]">
                    <Check className="w-5 h-5 text-[#7cff9b] mb-2" />
                    <p className="font-display font-black text-sm md:text-lg text-white">{t}</p>
                    <p className="text-xs md:text-sm text-[#c9d6e6] mt-1">{d}</p>
                  </div>
                ))}
              </div>

              {/* 2 · stack */}
              <div className="k-prev-2 invisible absolute inset-x-0 bottom-0 top-9 flex flex-col justify-center gap-3 md:gap-4 p-5 md:p-8">
                {Object.entries(STACK).map(([k, v]) => (
                  <div key={k} data-k={k} className="k-pv flex flex-wrap items-center gap-2 p-2 rounded-sm">
                    <span className="w-24 font-display font-bold text-xs tracking-[.15em] text-[#7cc4ff] uppercase">{k}</span>
                    {v.map((x) => <span key={x} className="font-mono text-[11px] md:text-xs px-2 py-1 bg-[#0a1a33] border border-[#7cc4ff]/40 text-white">{x}</span>)}
                  </div>
                ))}
              </div>

              {/* 3 · trayectoria */}
              <div className="k-prev-3 invisible absolute inset-x-0 bottom-0 top-9 flex flex-col justify-[safe_center] overflow-y-auto [scrollbar-width:none] p-5 md:px-10 md:py-6">
                <div className="relative pl-8">
                  <span className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#7cc4ff]/60 shadow-[0_0_10px_#7cc4ff]" />
                  {HITOS.map(([a, t, d], i) => (
                    <div key={t} data-k={`h${i}`} className="k-pv relative mb-3 p-2 rounded-sm">
                      <GitCommit className="absolute -left-8 top-2 w-6 h-6 text-[#7cc4ff] bg-[#060d1a]" />
                      <p className="font-mono text-xs text-[#ffb454]">{a}</p>
                      <p className="font-display font-black text-base md:text-xl text-white">{t}</p>
                      <p className="text-xs md:text-sm text-[#c9d6e6]">{d}</p>
                    </div>
                  ))}
                  <div data-k="h3" className="k-pv relative p-2 rounded-sm">
                    <span className="absolute -left-[26px] top-3 w-4 h-4 border-2 border-dashed border-[#7cff9b] rounded-full" />
                    <p className="font-display font-black text-base md:text-xl text-[#7cff9b]">Tu proyecto</p>
                    <Link to="/contact" className="pp-btn pp-btn-sm mt-2">Hacer el próximo commit →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal interactiva */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white text-center">Preguntame <span className="text-[#7cc4ff]">lo que quieras</span></h2>
          <p className="text-center text-[#c9d6e6] mt-3 mb-10">Una terminal de verdad: escribí <b className="font-mono text-[#7cc4ff]">help</b> y probá los comandos.</p>
          <div className="k-term border border-[#7cc4ff]/50 bg-[#040912] shadow-[0_0_60px_rgba(124,196,255,.15)]" onClick={() => root.current.querySelector("#k-cmd")?.focus()}>
            <div className="flex justify-between px-4 py-2 border-b border-[#7cc4ff]/25 font-mono text-[11px] text-[#7cc4ff]/70"><span>● ● ●</span><span>ricardo@dev: ~</span></div>
            <div className="p-5 h-80 overflow-y-auto font-mono text-[13px] leading-6" aria-live="polite">
              {hist.map((h, i) => (
                <div key={i} className="mb-2">
                  {h.c && <p className="text-[#bfe3ff]"><span className="text-[#7cff9b]">ricardo@dev:~$</span> {h.c}</p>}
                  {h.o.map((o, j) => <p key={j} className="text-[#c9d6e6] whitespace-pre-wrap">{o}</p>)}
                </div>
              ))}
              <form onSubmit={ejecutar} className="flex gap-2 items-center">
                <label htmlFor="k-cmd" className="text-[#7cff9b] shrink-0">ricardo@dev:~$</label>
                <input id="k-cmd" value={cmd} onChange={(e) => setCmd(e.target.value)} autoComplete="off" spellCheck="false"
                  className="flex-1 min-w-0 bg-transparent outline-none text-white caret-[#7cc4ff]" placeholder="help" />
              </form>
              <div ref={termEnd} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["sobre", "stack", "trayectoria", "contacto", "sudo contratar"].map((c) => (
              <button key={c} type="button" onClick={() => { setCmd(c); root.current.querySelector("#k-cmd")?.focus(); }} className="pp-chip hover:bg-[#7cc4ff] hover:text-[#040912] transition-colors">{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="relative py-24 px-6 text-center pp-celeste">
        <h2 className="font-display font-black text-3xl md:text-6xl text-[#040912]">¿Hacemos el próximo commit?</h2>
        <p className="mt-4 text-lg text-[#0a1a33] max-w-xl mx-auto">Contame tu idea y la convertimos en algo que se use de verdad.</p>
        <div className="mt-8 flex justify-center flex-wrap gap-3">
          <Link to="/contact" className="pp-btn !bg-[#040912] !text-white">Contactar</Link>
          <a href="/CV.pdf" download className="pp-btn pp-btn-line !text-[#040912] ![box-shadow:inset_0_0_0_2px_#040912]">Descargar CV</a>
        </div>
      </section>
    </div>
  );
};

export default SobreMiCodigo;
