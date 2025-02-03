// App.js
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
// import { AppProvider } from './context/AppContext';

function App() {
  return (
    <BrowserRouter>
      {/* <AppProvider> */}
      {/* Sistema de notificaciones */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      {/* Rutas de la aplicación */}
      <AppRoutes />
      {/* </AppProvider> */}
    </BrowserRouter>
  );
}

export default App;
