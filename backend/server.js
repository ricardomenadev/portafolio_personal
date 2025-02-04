import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express();

// Configuración básica de CORS
app.use(
  cors({
    origin: ["https://ricardoamena.com", "http://localhost:5173"], // Dominio frontend y desarrollo
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

app.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
  console.log(
    `CORS configurado para: ${
      process.env.FRONTEND_URL || "https://ricardoamena.com"
    }`
  );
});
