
import api from './api/api'

const contactService = {
    // Envía los datos del formulario de contacto al backend
    sendContact: async (contactData) => {
      try {
        const response = await api.post('/contact', contactData);
        return response.data;
      } catch (error) {
        console.error('Error en envío de contacto:', error);
        throw error;
      }
    }
  };

export default contactService;