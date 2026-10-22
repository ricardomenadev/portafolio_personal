// Escapa lo que escribe la persona antes de meterlo en el HTML de un mail
export const escapar = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Estilo de la página de contacto: azul marino, azul acero, Orbitron, terminal y bloque JSON.
// Todo en tablas y estilos en línea, que es lo que respetan Gmail y Outlook.
const C = { bg: "#040912", fondo: "#060d1a", panel: "#0a1a33", borde: "#2b4a74", acero: "#7cc4ff", plata: "#d7e2ee", texto: "#c9d6e6", verde: "#7cff9b", gris: "#6b7f99" };
const ORB = "'Orbitron', 'Arial Black', Arial, sans-serif";
const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "'Segoe UI', Arial, sans-serif";

const boton = (href, texto, lleno) =>
  `<a href="${href}" target="_blank" style="display:inline-block;margin:6px;padding:14px 22px;font-family:${ORB};font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;${
    lleno ? `background:${C.bg};color:#ffffff;` : `border:2px solid ${C.bg};color:${C.bg};`
  }">${texto}</a>`;

/**
 * Mail para quien completó el formulario.
 * message puede empezar con "[Interés: IA, WEB]" (lo agrega el formulario nuevo).
 */
export const clientConfirmationTemplate = ({ name, message = "" }) => {
  const nombre = escapar(name);
  const m = String(message).match(/^\[Interés: ([^\]]+)\]\n?/);
  const interes = m ? escapar(m[1]) : "";
  const cuerpo = m ? String(message).slice(m[0].length) : String(message);
  const resumen = escapar(cuerpo.length > 400 ? cuerpo.slice(0, 400) + "…" : cuerpo).replace(/\n/g, "<br>");
  const fila = (k, v) =>
    `<tr><td style="padding:2px 0;font-family:${MONO};font-size:13px;line-height:22px;color:${C.acero};vertical-align:top;white-space:nowrap;">&nbsp;&nbsp;"${k}":&nbsp;</td><td style="padding:2px 0;font-family:${MONO};font-size:13px;line-height:22px;color:${C.verde};">"${v}"</td></tr>`;
  const paso = (n, t, d) =>
    `<td class="col" width="33%" valign="top" style="padding:6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.panel};border:2px solid ${C.borde};"><tr><td style="padding:18px 16px;">
      <div style="font-family:${ORB};font-weight:900;font-size:26px;color:${C.borde};">0${n}</div>
      <div style="font-family:${ORB};font-weight:900;font-size:14px;color:#ffffff;margin-top:6px;">${t}</div>
      <div style="font-family:${SANS};font-size:13px;line-height:19px;color:${C.texto};margin-top:6px;">${d}</div>
    </td></tr></table></td>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>Mensaje recibido · Ricardo Mena</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){ .col{display:block!important;width:100%!important;} .pad{padding-left:20px!important;padding-right:20px!important;} .h1{font-size:28px!important;line-height:34px!important;} }
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;">Recibí tu mensaje, ${nombre}. Te respondo en menos de 24 horas.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${C.fondo};border:1px solid #1f3a5f;">

  <!-- HUD superior -->
  <tr><td class="pad" style="padding:18px 32px;border-bottom:1px solid #16284a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-family:${MONO};font-size:11px;letter-spacing:2px;color:${C.acero};">RICARDO//DEV</td>
      <td align="right" style="font-family:${MONO};font-size:11px;letter-spacing:2px;color:${C.gris};">DESARROLLO · IA</td>
    </tr></table>
  </td></tr>

  <!-- Título -->
  <tr><td class="pad" style="padding:44px 32px 8px;border-left:3px solid ${C.acero};">
    <div style="font-family:${MONO};font-size:12px;letter-spacing:4px;color:${C.acero};">CONTACTO · MENSAJE RECIBIDO</div>
    <h1 class="h1" style="margin:14px 0 0;font-family:${ORB};font-weight:900;font-size:36px;line-height:42px;color:#ffffff;text-transform:uppercase;">Gracias, <span style="color:${C.acero};text-shadow:0 0 18px rgba(124,196,255,.7);">${nombre}</span></h1>
    <p style="margin:18px 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.texto};">Recibí tu mensaje y ya está en mi bandeja. Lo leo con atención y <b style="color:#ffffff;">te contacto en menos de 24 horas</b> por el medio que dejaste.</p>
  </td></tr>

  <!-- Terminal -->
  <tr><td class="pad" style="padding:28px 32px 8px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};border:1px solid ${C.borde};">
      <tr><td style="padding:8px 16px;border-bottom:1px solid #16284a;font-family:${MONO};font-size:11px;color:${C.gris};">● ● ●&nbsp;&nbsp;&nbsp;ricardo@dev: ~</td></tr>
      <tr><td style="padding:16px;font-family:${MONO};font-size:13px;line-height:24px;">
        <div style="color:#bfe3ff;">&gt; POST /api/contact</div>
        <div style="color:${C.verde};">&gt; validando campos ........ OK</div>
        <div style="color:${C.verde};">&lt; 201 Created · mensaje recibido ✓</div>
        <div style="color:${C.texto};">&gt; tiempo de respuesta: menos de 24 h</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Lo que envió -->
  <tr><td class="pad" style="padding:20px 32px 8px;">
    <div style="font-family:${ORB};font-weight:700;font-size:13px;letter-spacing:2px;color:#ffffff;margin-bottom:10px;">LO QUE ME ENVIASTE</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.panel};border:1px solid ${C.borde};">
      <tr><td style="padding:16px;">
        <div style="font-family:${MONO};font-size:13px;line-height:22px;color:${C.plata};">{</div>
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${fila("nombre", nombre)}
          ${interes ? fila("interes", interes) : ""}
        </table>
        <div style="font-family:${MONO};font-size:13px;line-height:22px;color:${C.acero};">&nbsp;&nbsp;"mensaje":</div>
        <div style="margin:4px 0 4px 16px;padding:10px 14px;border-left:3px solid ${C.acero};font-family:${SANS};font-size:14px;line-height:22px;color:${C.texto};">${resumen}</div>
        <div style="font-family:${MONO};font-size:13px;line-height:22px;color:${C.plata};">}</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Qué pasa después -->
  <tr><td class="pad" style="padding:28px 26px 30px;">
    <div style="font-family:${ORB};font-weight:700;font-size:13px;letter-spacing:2px;color:#ffffff;margin:0 6px 8px;">¿QUÉ PASA DESPUÉS?</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      ${paso(1, "Te respondo", "En menos de 24 horas.")}
      ${paso(2, "Charlamos tu idea", "Entiendo qué necesitás resolver.")}
      ${paso(3, "Te paso una propuesta", "Alcance, tiempos y costo claros.")}
    </tr></table>
  </td></tr>

  <!-- Cierre celeste, como el de la página -->
  <tr><td class="pad" align="center" style="padding:36px 32px;background:#7cb8ef;background-image:linear-gradient(135deg,#5aa0e6,#8fc4f5 55%,#4a86c5);">
    <div style="font-family:${ORB};font-weight:900;font-size:22px;line-height:28px;color:${C.bg};text-transform:uppercase;">¿Es urgente?</div>
    <p style="margin:8px 0 14px;font-family:${SANS};font-size:15px;color:${C.panel};">Escribime directo por donde te quede más cómodo.</p>
    ${boton("https://wa.me/5493794739888", "WhatsApp", true)}${boton("https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257/", "LinkedIn")}${boton("https://www.instagram.com/ricardoa_mena/", "Instagram")}${boton("https://github.com/ricardomenadev", "GitHub")}
  </td></tr>

  <!-- Firma -->
  <tr><td align="center" style="padding:30px 32px 28px;">
    <div style="font-family:${ORB};font-weight:900;font-size:24px;letter-spacing:3px;color:#ffffff;text-shadow:0 0 18px rgba(124,196,255,.6);">RICARDO MENA</div>
    <div style="margin-top:8px;font-family:${MONO};font-size:11px;letter-spacing:5px;color:${C.acero};">DESARROLLADOR FULL STACK</div>
    <div style="margin-top:12px;font-family:${SANS};font-size:13px;"><a href="mailto:ricardoamena@gmail.com" style="color:${C.plata};text-decoration:none;">ricardoamena@gmail.com</a></div>
  </td></tr>
</table>
<p style="margin:16px 0 0;font-family:${SANS};font-size:12px;color:${C.gris};">Mensaje automático: no hace falta que respondas este correo.</p>
</td></tr>
</table>
</body>
</html>`;
};

export const replyTemplate = (name, replyMessage) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .message {
            background: white;
            padding: 15px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 10px;
            text-decoration: none;
            color: white;
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Respuesta a tu consulta</h1>
        </div>
        <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            <div class="message">
                ${replyMessage}
            </div>
            <p>Si tienes alguna otra pregunta, no dudes en contactarme nuevamente.</p>
            
            <div class="social-links">
                <a href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257" target="_blank">LinkedIn</a>
                <a href="https://github.com/ricardomenadev" target="_blank">GitHub</a>
            </div>
            
            <p>Saludos cordiales,</p>
            <p><strong>Ricardo A. Mena</strong><br>
            Desarrollador Full Stack & Abogado<br>
            <a href="mailto:ricardoamena@gmail.com" style="color: #2563eb; text-decoration: none;">ricardoamena@gmail.com</a></p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Ricardo A. Mena. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
