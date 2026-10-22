// Piso de circuito: pistas de una placa en perspectiva con pulsos de luz que las recorren.
// Llena su contenedor; con "reducir movimiento" los pulsos quedan quietos.
import { useMemo } from "react";

const fundido = { maskImage: "linear-gradient(to bottom, transparent, black 30%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%)" };

/* Circuito: pistas de una placa en perspectiva con pulsos de datos que las recorren */
export const PisoCircuito = () => {
  const pistas = useMemo(() => {
    // pistas ortogonales determinísticas (siempre el mismo dibujo)
    let s = 7;
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 34 }, (_, i) => {
      let x = 40 + i * 58 + r() * 20, y = 400;
      let d = `M${x} ${y}`;
      const nodos = [];
      for (let p = 0; p < 4; p++) {
        y -= 60 + r() * 80;
        d += ` L${x} ${y}`;
        if (r() > 0.45) { x += (r() > 0.5 ? 1 : -1) * (30 + r() * 60); d += ` L${x} ${y}`; }
        nodos.push([x, y]);
      }
      return { d, nodos, dur: 2.5 + r() * 3, delay: -r() * 5 };
    });
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden" style={fundido} aria-hidden="true">
      <style>{`@keyframes pp-pulso{from{stroke-dashoffset:0}to{stroke-dashoffset:-1}} .pp-pulso{animation:pp-pulso linear infinite} @media (prefers-reduced-motion:reduce){.pp-pulso{animation:none}}`}</style>
      <svg viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice" className="absolute left-1/2 bottom-0 w-[180%] h-[160%] origin-bottom [transform:translateX(-50%)_perspective(600px)_rotateX(58deg)]">
        {pistas.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke="#1f4b7a" strokeWidth="3" />
            {p.nodos.map(([x, y], j) => <circle key={j} cx={x} cy={y} r="5" fill="#040912" stroke="#3d7ab8" strokeWidth="2" />)}
            <path d={p.d} pathLength="1" fill="none" stroke="#7cc4ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.08 0.92"
              className="pp-pulso" style={{ animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, filter: "drop-shadow(0 0 6px #7cc4ff)" }} />
          </g>
        ))}
      </svg>
    </div>
  );
};
