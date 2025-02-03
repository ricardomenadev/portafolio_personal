export const clientConfirmationTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(45deg, #2563eb, #7c3aed); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">¡Gracias por contactarme!</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
            <p style="margin-bottom: 15px;">Hola <strong>${name}</strong>,</p>
            <p style="margin-bottom: 15px;">He recibido tu mensaje y quiero agradecerte por ponerte en contacto conmigo. Me pondré en contacto contigo lo antes posible.</p>
            
            <p style="margin-bottom: 15px;">Te invito a seguirme en mis redes:</p>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257" target="_blank" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">LinkedIn</a>
                
                <a href="https://github.com/ricardoamena" target="_blank" style="display: inline-block; background-color: #000000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">GitHub</a>
            </div>
            
            <p style="margin-top: 25px;">Saludos cordiales,</p>
            <p>
                <strong>Ricardo A. Mena</strong><br>
                Desarrollador de Software<br>
                <a href="mailto:ricardoamena@gmail.com" style="color: #2563eb;">ricardoamena@gmail.com</a>
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        </div>
    </div>
</body>
</html>
`;

export const replyTemplate = (name, replyMessage) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .message {
            background: white;
            padding: 15px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 10px;
            text-decoration: none;
            color: white;
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Respuesta a tu consulta</h1>
        </div>
        <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            <div class="message">
                ${replyMessage}
            </div>
            <p>Si tienes alguna otra pregunta, no dudes en contactarme nuevamente.</p>
            
            <div class="social-links">
                <a href="https://www.linkedin.com/in/ricardo-alexandro-mena-956a92257" target="_blank">LinkedIn</a>
                <a href="https://github.com/rickprog2025" target="_blank">GitHub</a>
            </div>
            
            <p>Saludos cordiales,</p>
            <p><strong>Ricardo A. Mena</strong><br>
            Desarrollador Full Stack & Abogado<br>
            <a href="mailto:ricardoamena@gmail.com" style="color: #2563eb; text-decoration: none;">ricardoamena@gmail.com</a></p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Ricardo A. Mena. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
