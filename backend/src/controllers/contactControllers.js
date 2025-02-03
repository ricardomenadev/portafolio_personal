import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../config/mailer.js';
import { clientConfirmationTemplate } from '../utils/emailTemplates.js';

const prisma = new PrismaClient();

export const createContact = async (req, res) => {
  try {
    const { name, email, countryCode, phone, message } = req.body;

    // Primero creamos el contacto en la base de datos
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        countryCode,
        phone,
        message,
      },
    });

    // Enviamos la respuesta al cliente inmediatamente
    res.status(201).json({
      success: true,
      message: 'Contacto recibido correctamente'
    });

    // Procesamos los emails de forma asíncrona
    Promise.all([
      // Email de confirmación al cliente
      sendEmail({
        to: email,
        subject: "Gracias por contactarme",
        html: clientConfirmationTemplate(name),
      }),
      // Email de notificación al admin
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: "Nuevo mensaje de contacto",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${countryCode} ${phone}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          </div>
        `,
      }),
    ]).catch(error => {
      console.error('Error enviando emails:', error);
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Error al procesar el contacto",
    });
  }
};