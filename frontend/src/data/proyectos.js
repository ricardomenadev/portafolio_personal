// Proyectos que se muestran en /projects. Es una selección: hay más (ver MAS_PROYECTOS).
// Los de clientes son sistemas privados: se cuenta qué hacen, sin links ni código.
// Campos: id, nombre, tipo (para filtrar), año, resumen, detalle, puntos (qué incluye), stack,
// color (acento de la portada), demo (link en vivo), repo (código público), privado (sistema de cliente), propio (proyecto personal),
// imagen (captura opcional en /public/proyectos/...).
export const PROYECTOS = [
  {
    id: "agronea", nombre: "Agronea", tipo: "Web + Móvil", año: 2026,
    resumen: "Plataforma de eventos del agro: venta de entradas online, app para el público y control de acceso con QR.",
    detalle: "Tienda de entradas con checkout, mis entradas con código QR, acreditación de prensa y expositores. Se completa con una app pública en App Store y Google Play y una app de control que escanea los QR en la puerta, incluso sin conexión.",
    puntos: ["Venta de entradas y checkout", "App pública en App Store y Google Play", "Control de acceso con QR offline", "Acreditación de prensa y expositores"],
    stack: ["Next.js", "React Native", "Express", "Prisma", "MySQL"], color: "#7cff9b",
    demo: "", repo: "", privado: true,
  },
  {
    id: "ruteo", nombre: "Ruteo", tipo: "Sistema", año: 2026,
    resumen: "Sistema de distribución y reparto: panel de gestión, app para repartidores con GPS y panel multiempresa.",
    detalle: "El panel administra clientes, listas de precio, compras, caja, pagos, mora y ganancias. Los repartidores usan una app móvil con seguimiento GPS y comprobantes con foto; un panel superior gestiona varias empresas.",
    puntos: ["Panel de gestión comercial completo", "App de reparto con tracking GPS", "Comprobantes con imagen", "Mapas y zonas de cobertura"],
    stack: ["React", "Vite", "Google Maps", "React Native", "Express"], color: "#ffb454",
    demo: "", repo: "", privado: true,
  },
  {
    id: "carro", nombre: "Carro · POS", tipo: "Sistema", año: 2026,
    resumen: "Sistema de ventas, stock y caja (POS/ERP) para comercios minoristas.",
    detalle: "Punto de venta con control de stock, caja diaria y reportes, pensado para usarse todo el día en el mostrador.",
    puntos: ["Punto de venta rápido", "Control de stock", "Caja y cierres diarios", "Reportes de ventas"],
    stack: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL"], color: "#7cc4ff",
    demo: "", repo: "", privado: true,
  },
  {
    id: "recetas", nombre: "Recetas Médicas", tipo: "Web", año: 2026,
    resumen: "Solicitud de recetas médicas en forma digital: sin filas ni complicaciones.",
    detalle: "El paciente completa un formulario guiado y el equipo médico gestiona cada pedido desde un panel de administración con acceso protegido.",
    puntos: ["Formulario guiado para pacientes", "Panel de administración", "Acceso con login", "Carga de archivos"],
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL"], color: "#8fc4f5",
    demo: "", repo: "", privado: true,
  },
  {
    id: "ingles", nombre: "English for devs", tipo: "Web", año: 2026,
    resumen: "Plan de estudio de inglés para desarrolladores, con práctica guiada y repaso de errores.",
    detalle: "Mapa de niveles, categorías y temas; sesiones de práctica con una interfaz 3D, repaso espaciado y registro de errores y vocabulario para estudiar lo que más cuesta.",
    puntos: ["Mapa de niveles y temas", "Sesiones de práctica con HUD 3D", "Repaso de errores", "Vocabulario propio"],
    stack: ["Next.js", "Three.js", "Express", "Prisma", "PostgreSQL"], color: "#c792ea",
    demo: "", repo: "", privado: false, propio: true,
  },
];

export const TIPOS = ["Todos", ...new Set(PROYECTOS.map((p) => p.tipo))];
export const MAS_PROYECTOS = "https://github.com/ricardomenadev";
