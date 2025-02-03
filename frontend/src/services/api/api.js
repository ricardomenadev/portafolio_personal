
import axios from 'axios';

// Creación de la instancia base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores de manera uniforme
api.interceptors.response.use(
  response => response,
  error => {
    const customError = {
      message: error.response?.data?.error || 'Ocurrió un error inesperado',
      status: error.response?.status || 500
    };
    return Promise.reject(customError);
  }
);

export default api;