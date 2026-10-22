// Contacto · el formulario arma en vivo la solicitud que se envía (JSON) y una terminal muestra el envío.
// Usa el servicio real (contactService → POST /api/contact) con los mismos campos que espera el backend.
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, MessageCircle, Linkedin, Github, Instagram, Copy, Check, Send, Loader2 } from "lucide-react";
import contactService from "../../services/contactService";
import { PNav, GridFloor, HudCorners, SERVICIOS } from "./comun";
import { PisoCircuito } from "./Pisos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PAISES = [["+54", "Argentina"], ["+55", "Brasil"], ["+56", "Chile"], ["+57", "Colombia"], ["+58", "Venezuela"], ["+51", "Perú"], ["+52", "México"], ["+598", "Uruguay"], ["+595", "Paraguay"]];
const EMAIL = "ricardoamena@gmail.com";
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VACIO = { name: "", email: "", countryCode: "+54", phone: "", message: "" };

// Línea del JSON: clave, valor y si falta un dato requerido
const Linea = ({ k, v, req, ultima }) => {
  const falta = req && !v;
  return (
    <div data-campo={k} className="c-json-l px-1 -mx-1 rounded-sm">
      <span className="text-[#7cc4ff]">{`  "${k}"`}</span><span className="text-[#d7e2ee]">: </span>
      {falta ? <span className="text-[#ffb454]">null</span> : Array.isArray(v)
        ? <span className="text-[#7cff9b]">[{v.map((x) => `"${x}"`).join(", ")}]</span>
        : <span className="text-[#7cff9b] break-all">{`"${v}"`}</span>}
      {!ultima && <span className="text-[#d7e2ee]">,</span>}
      {falta && <span className="text-[#6b7f99] italic">{"  // requerido"}</span>}
    </div>
  );
};

// Piso del encabezado: el circuito por defecto; con Piso={null} vuelve la grilla
const Contacto = ({ Piso = PisoCircuito }) => {
  const root = useRef();
  const [f, setF] = useState(VACIO);
  const [temas, setTemas] = useState([]);
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState("listo"); // listo | enviando | ok | error
  const [log, setLog] = useState([]);
  const [copiado, setCopiado] = useState(false);

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".pp-hudc", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: "back.out(2)" })
        .from(".c-h .ln > span", { yPercent: 110, duration: 1, stagger: 0.1 }, 0.1)
        .from(".c-in", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.5)
        .from(".c-canales", { y: 30, opacity: 0, duration: 0.7 }, 0.7);
      gsap.from(".c-panel", { y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: ".c-form-sec", start: "top 80%" } });
      gsap.from(".c-paso", { scale: 1.3, opacity: 0, rotate: 3, duration: 0.45, stagger: 0.1, ease: "back.out(2)", scrollTrigger: { trigger: ".c-pasos", start: "top 85%" } });
      gsap.to(".c-floor", { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".c-hero", start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: root });

  // destello en la línea del JSON que cambió
  const destello = contextSafe((k) => {
    const el = root.current.querySelector(`[data-campo="${k}"]`);
    if (el) gsap.fromTo(el, { backgroundColor: "rgba(124,196,255,.25)" }, { backgroundColor: "rgba(124,196,255,0)", duration: 0.8 });
  });

  const cambiar = (e) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: value }));
    if (errores[name]) setErrores((p) => ({ ...p, [name]: undefined }));
    destello(name);
  };
  const tocarTema = (t) => {
    setTemas((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
    destello("interes");
  };

  const copiar = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* sin permiso de portapapeles: el email igual queda visible */ }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  const validar = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Decime tu nombre.";
    if (!EMAIL_OK.test(f.email)) e.email = "Revisá el email: tiene que ser como nombre@dominio.com.";
    if (f.message.trim().length < 10) e.message = "Contame un poco más (al menos 10 caracteres).";
    return e;
  };

  const sumar = (linea, tipo = "") => setLog((l) => [...l, [linea, tipo]]);
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));

  const enviar = async (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    setLog([]);
    if (Object.keys(e).length) {
      sumar("> validando campos ...", "");
      Object.values(e).forEach((m) => sumar(`  ✗ ${m}`, "err"));
      root.current.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setEstado("enviando");
    sumar("> POST /api/contact");
    await espera(350); sumar("> validando campos ........ OK", "ok");
    await espera(350); sumar("> enviando mensaje ...");
    try {
      // el backend no tiene campo "interés": lo sumo al principio del mensaje
      const message = temas.length ? `[Interés: ${temas.join(", ")}]\n${f.message}` : f.message;
      await contactService.sendContact({ ...f, message });
      sumar("< 201 Created · mensaje recibido ✓", "ok");
      sumar("> te llega una confirmación a tu email.", "");
      setEstado("ok");
      setF(VACIO);
      setTemas([]);
    } catch (err) {
      sumar(`< ${err.status || 500} · ${err.message || "no se pudo enviar"}`, "err");
      sumar(`> probá de nuevo o escribime a ${EMAIL}`, "");
      setEstado("error");
    }
  };

  const campo = "w-full bg-[#040912] border border-[#7cc4ff]/30 px-4 py-3 text-white placeholder:text-[#6b7f99] focus:border-[#7cc4ff] focus:outline-none focus:shadow-[0_0_0_3px_rgba(124,196,255,.15)] transition";
  const etiqueta = "block font-mono text-xs tracking-[.15em] text-[#7cc4ff] mb-2";
  const telefono = f.phone ? `${f.countryCode} ${f.phone}` : "";

  return (
    <div ref={root} className="pp pp-cielo">
      {/* Encabezado + canales directos */}
      <section className="c-hero relative min-h-[88vh] flex items-center overflow-hidden">
        <PNav />
        <HudCorners />
        {Piso ? (
          <div className="absolute inset-x-0 bottom-0 h-[46%]"><Piso /></div>
        ) : (
          <>
            <div className="absolute left-0 right-0 top-[74%] h-[2px] bg-[#7cc4ff] opacity-50 shadow-[0_0_40px_8px_rgba(124,196,255,.35)]" />
            <div className="c-floor absolute left-0 right-0 top-[74%] h-[26%]"><GridFloor className="h-full top-0" /></div>
          </>
        )}
        <div className="pp-scan" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16 text-center">
          <p className="c-in font-mono text-xs tracking-[.3em] text-[#7cc4ff] mb-5">CONTACTO · RESPUESTA EN MENOS DE 24 H</p>
          <h1 className="c-h font-display font-black text-4xl md:text-6xl leading-[1.05] text-white">
            <span className="ln"><span>Hablemos de</span></span>
            <span className="ln"><span className="text-[#7cc4ff] glow">tu proyecto</span></span>
          </h1>
          <p className="c-in mt-5 text-lg text-[#c9d6e6] max-w-2xl mx-auto">Contame qué necesitás: una web, una app, un sistema o automatizar tu negocio con IA. Elegí cómo preferís escribirme.</p>

          <div className="c-canales mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            <a href="https://wa.me/5493794739888" target="_blank" rel="noopener noreferrer" className="c-canal group p-5 bg-[#0a1a33]/85 border-2 border-[#7cc4ff]/50 hover:border-[#7cff9b] hover:-translate-y-1 transition [clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_82%)]">
              <MessageCircle className="w-6 h-6 text-[#7cff9b] mb-3" />
              <p className="font-display font-black text-white">WhatsApp</p>
              <p className="text-sm text-[#c9d6e6] mt-1">+54 9 379 473-9888</p>
              <p className="font-mono text-[11px] text-[#7cff9b] mt-3">● lo más rápido</p>
            </a>
            <div className="c-canal p-5 bg-[#0a1a33]/85 border-2 border-[#7cc4ff]/50 hover:border-[#7cc4ff] hover:-translate-y-1 transition [clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_82%)]">
              <Mail className="w-6 h-6 text-[#7cc4ff] mb-3" />
              <p className="font-display font-black text-white">Email</p>
              <p className="text-[13px] text-[#c9d6e6] mt-1 break-all select-all">{EMAIL}</p>
              <button type="button" onClick={copiar} className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#7cc4ff] hover:text-white" aria-live="polite">
                {copiado ? <><Check className="w-3.5 h-3.5" /> copiado</> : <><Copy className="w-3.5 h-3.5" /> copiar email</>}
              </button>
            </div>
            <a href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257/" target="_blank" rel="noopener noreferrer" className="c-canal p-5 bg-[#0a1a33]/85 border-2 border-[#7cc4ff]/50 hover:border-[#7cc4ff] hover:-translate-y-1 transition [clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_82%)]">
              <Linkedin className="w-6 h-6 text-[#7cc4ff] mb-3" />
              <p className="font-display font-black text-white">LinkedIn</p>
              <p className="text-sm text-[#c9d6e6] mt-1">Ricardo Alexandro Mena</p>
              <p className="font-mono text-[11px] text-[#7cc4ff] mt-3">→ conectemos</p>
            </a>
            <a href="https://www.instagram.com/ricardoa_mena/" target="_blank" rel="noopener noreferrer" className="c-canal p-5 bg-[#0a1a33]/85 border-2 border-[#7cc4ff]/50 hover:border-[#7cc4ff] hover:-translate-y-1 transition [clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_82%)]">
              <Instagram className="w-6 h-6 text-[#7cc4ff] mb-3" />
              <p className="font-display font-black text-white">Instagram</p>
              <p className="text-sm text-[#c9d6e6] mt-1">@ricardoa_mena</p>
              <p className="font-mono text-[11px] text-[#7cc4ff] mt-3">→ contenido diario</p>
            </a>
            <a href="https://github.com/ricardomenadev" target="_blank" rel="noopener noreferrer" className="c-canal p-5 bg-[#0a1a33]/85 border-2 border-[#7cc4ff]/50 hover:border-[#7cc4ff] hover:-translate-y-1 transition [clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_82%)]">
              <Github className="w-6 h-6 text-[#7cc4ff] mb-3" />
              <p className="font-display font-black text-white">GitHub</p>
              <p className="text-sm text-[#c9d6e6] mt-1">@ricardomenadev</p>
              <p className="font-mono text-[11px] text-[#7cc4ff] mt-3">→ mirá el código</p>
            </a>
          </div>
        </div>
      </section>

      {/* Formulario + solicitud en vivo */}
      <section className="c-form-sec relative py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <form onSubmit={enviar} noValidate className="c-panel p-6 md:p-8 bg-[#0a1a33]/70 border border-[#7cc4ff]/40">
            <h2 className="font-display font-black text-2xl md:text-3xl text-white">O escribime acá</h2>
            <p className="text-[#c9d6e6] mt-2 mb-7">Completá y mirá a la derecha cómo se arma tu mensaje.</p>

            <fieldset className="mb-6">
              <legend className={etiqueta}>¿EN QUÉ TE AYUDO? (OPCIONAL)</legend>
              <div className="flex flex-wrap gap-2">
                {[...SERVICIOS.map((s) => s.corto), "OTRO"].map((t) => {
                  const on = temas.includes(t);
                  return (
                    <button key={t} type="button" aria-pressed={on} onClick={() => tocarTema(t)}
                      className={`px-3 py-2 font-display font-bold text-xs tracking-[.12em] border transition active:scale-95 ${on ? "bg-[#7cc4ff] text-[#040912] border-[#7cc4ff]" : "border-[#7cc4ff]/40 text-[#7cc4ff] hover:border-[#7cc4ff]"}`}>
                      {on && "✓ "}{t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-name" className={etiqueta}>NOMBRE *</label>
                <input id="c-name" name="name" value={f.name} onChange={cambiar} autoComplete="name" placeholder="Tu nombre" aria-invalid={!!errores.name} aria-describedby="c-name-e" className={`${campo} ${errores.name ? "!border-[#ffb454]" : ""}`} />
                {errores.name && <p id="c-name-e" className="mt-1.5 text-sm text-[#ffb454]">{errores.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className={etiqueta}>EMAIL *</label>
                <input id="c-email" name="email" type="email" value={f.email} onChange={cambiar} autoComplete="email" placeholder="tu@email.com" aria-invalid={!!errores.email} aria-describedby="c-email-e" className={`${campo} ${errores.email ? "!border-[#ffb454]" : ""}`} />
                {errores.email && <p id="c-email-e" className="mt-1.5 text-sm text-[#ffb454]">{errores.email}</p>}
              </div>
              <div>
                <label htmlFor="c-cc" className={etiqueta}>PAÍS</label>
                <select id="c-cc" name="countryCode" value={f.countryCode} onChange={cambiar} className={campo}>
                  {PAISES.map(([c, p]) => <option key={c} value={c}>{c} ({p})</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="c-phone" className={etiqueta}>TELÉFONO</label>
                <input id="c-phone" name="phone" type="tel" value={f.phone} onChange={cambiar} autoComplete="tel-national" placeholder="Ej: 3794123456" className={campo} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="c-msg" className={etiqueta}>MENSAJE *</label>
              <textarea id="c-msg" name="message" value={f.message} onChange={cambiar} rows={5} placeholder="Contame tu idea o el problema que querés resolver..." aria-invalid={!!errores.message} aria-describedby="c-msg-e" className={`${campo} resize-y ${errores.message ? "!border-[#ffb454]" : ""}`} />
              <div className="flex justify-between mt-1.5 text-sm">
                <span id="c-msg-e" className="text-[#ffb454]">{errores.message}</span>
                <span className="font-mono text-xs text-[#6b7f99]">{f.message.length} caracteres</span>
              </div>
            </div>

            <button type="submit" disabled={estado === "enviando"} className="pp-btn mt-7 w-full justify-center disabled:opacity-60">
              {estado === "enviando" ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Enviar mensaje</>}
            </button>
          </form>

          <div className="c-panel lg:sticky lg:top-6 space-y-5">
            <div className="border border-[#7cc4ff]/40 bg-[#060d1a]">
              <div className="flex justify-between px-4 py-2 border-b border-[#7cc4ff]/20 font-mono text-[11px] text-[#7cc4ff]/70"><span>● ● ●</span><span>solicitud.json</span></div>
              <div className="p-5 font-mono text-[12px] md:text-[13px] leading-7 whitespace-pre-wrap">
                <div><span className="text-[#c792ea]">POST</span> <span className="text-[#d7e2ee]">/api/contact</span></div>
                <div className="text-[#d7e2ee]">{"{"}</div>
                <Linea k="interes" v={temas} />
                <Linea k="name" v={f.name} req />
                <Linea k="email" v={f.email} req />
                <Linea k="phone" v={telefono} />
                <Linea k="message" v={f.message.length > 80 ? f.message.slice(0, 80) + "…" : f.message} req ultima />
                <div className="text-[#d7e2ee]">{"}"}</div>
              </div>
            </div>
            <div className="border border-[#7cc4ff]/40 bg-[#040912]">
              <div className="flex justify-between px-4 py-2 border-b border-[#7cc4ff]/20 font-mono text-[11px] text-[#7cc4ff]/70"><span>terminal</span>
                <span className={estado === "ok" ? "text-[#7cff9b]" : estado === "error" ? "text-[#ffb454]" : ""}>{estado === "ok" ? "● enviado" : estado === "error" ? "● error" : estado === "enviando" ? "● enviando" : "● esperando"}</span>
              </div>
              <div className="p-5 min-h-[140px] font-mono text-[12px] md:text-[13px] leading-6" aria-live="polite">
                {log.length === 0 && <p className="text-[#6b7f99]">{"> cuando envíes, vas a ver acá el resultado."}</p>}
                {log.map(([l, t], i) => <p key={i} className={t === "ok" ? "text-[#7cff9b]" : t === "err" ? "text-[#ffb454]" : "text-[#c9d6e6]"}>{l}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué pasa después */}
      <section className="c-pasos relative pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-10">¿Qué pasa después?</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {[["Te respondo", "En menos de 24 horas, por el canal que elegiste."], ["Charlamos tu idea", "Entiendo qué necesitás y qué problema querés resolver."], ["Te paso una propuesta", "Con alcance, tiempos y costo claros, sin letra chica."]].map(([t, d], i) => (
              <li key={t} className="c-paso p-7 bg-[#0a1a33]/80 border-2 border-[#7cc4ff]/50 [clip-path:polygon(0_0,90%_0,100%_14%,100%_100%,10%_100%,0_86%)]">
                <p className="font-display font-black text-4xl text-[#7cc4ff]/30">0{i + 1}</p>
                <h3 className="font-display font-black text-xl text-white mt-2">{t}</h3>
                <p className="text-[#c9d6e6] mt-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
