import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../config/mailer.js";
import { clientConfirmationTemplate } from "../utils/emailTemplates.js";

const prisma = new PrismaClient();

export const createContact = async (req, res) => {
  try {
    // Extraemos los datos de la solicitud
    const { name, email, countryCode, phone, message } = req.body;

    // Validación básica de los campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Nombre, email y mensaje son campos requeridos",
      });
    }

    // Validación del formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Formato de email inválido",
      });
    }

    // Creamos un log para debugging
    console.log("Iniciando proceso de contacto:", {
      timestamp: new Date().toISOString(),
      name,
      email,
    });

    // Creamos el contacto en la base de datos
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        countryCode: countryCode || "", // Valor por defecto si no se proporciona
        phone: phone || "", // Valor por defecto si no se proporciona
        message,
        status: "pending", // Estado inicial del contacto
      },
    });

    // Enviamos la respuesta al cliente inmediatamente
    res.status(201).json({
      success: true,
      message: "Contacto recibido correctamente",
      contactId: contact.id, // Útil para seguimiento
    });

    // Procesamos los emails de forma asíncrona con mejor manejo de errores
    try {
      await Promise.all([
        // Email de confirmación al cliente
        sendEmail({
          to: email,
          subject: "Gracias por contactarme",
          html: clientConfirmationTemplate(name),
        }),
        // Email de notificación al admin con más detalles
        sendEmail({
          to: process.env.EMAIL_USER,
          subject: `Nuevo contacto de ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Un cliente dando vuelta - Nuevo mensaje de contacto</h2>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${
                  phone
                    ? `<p><strong>Teléfono:</strong> ${countryCode} ${phone}</p>`
                    : ""
                }
                <p><strong>Mensaje:</strong></p>
                <div style="background-color: white; padding: 10px; border-radius: 3px;">
                  ${message}
                </div>
                <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
                  ID de Contacto: ${contact.id}<br>
                  Fecha: ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          `,
        }),
      ]);

      // Actualizamos el estado del contacto si los emails se enviaron correctamente
      await prisma.contact.update({
        where: { id: contact.id },
        data: { status: "notified" },
      });
    } catch (emailError) {
      console.error("Error enviando emails:", {
        error: emailError.message,
        contactId: contact.id,
        timestamp: new Date().toISOString(),
      });

      // Actualizamos el estado del contacto para indicar el error en notificación
      await prisma.contact.update({
        where: { id: contact.id },
        data: { status: "notification_failed" },
      });
    }
  } catch (error) {
    console.error("Error en createContact:", {
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    res.status(500).json({
      success: false,
      error:
        "Error al procesar el contacto. Por favor, intenta nuevamente más tarde.",
    });
  }
};
