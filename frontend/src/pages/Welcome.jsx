// pages/Welcome.jsx - Bienvenida "Lluvia de código": al mantener apretado Ingresar
// corre la presentación a pantalla completa y después entra al inicio.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import B2Codigo from "./propuestas/bienvenida/B2Codigo";
import IntroSequence from "../components/intro/IntroSequence";

const Welcome = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState(false);
  const [lista, setLista] = useState(false);

  // el nombre se desencripta en Orbitron: esperar la fuente para que no salte
  useEffect(() => {
    Promise.all(['900 100px "Orbitron"', '18px "JetBrains Mono"'].map((f) => document.fonts.load(f).catch(() => {}))).then(() => setLista(true));
  }, []);

  return (
    <div className="min-h-screen bg-[#040912]">
      {lista && !intro && <B2Codigo onIngresar={() => setIntro(true)} />}
      {intro && <IntroSequence onDone={() => navigate("/home")} />}
    </div>
  );
};

export default Welcome;
