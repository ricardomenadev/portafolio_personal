import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express();

// Configuración básica de CORS
app.use(
  cors({
    origin: ["https://ricardoamena.com", "https://www.ricardoamena.com", "http://localhost:5173"], // Dominio frontend y desarrollo
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware adicional para debug en desarrollo
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3001;

// Solo escucha en local: en el servidor la única entrada pública es nginx
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en ${HOST}:${PORT}`);
  console.log(
    `CORS configurado para: ${
      process.env.FRONTEND_URL || "https://ricardoamena.com"
    }`
  );
});
