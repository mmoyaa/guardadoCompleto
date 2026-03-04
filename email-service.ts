import nodemailer from 'nodemailer';

// Configurar el transporte de email
// Usando Gmail - necesitas habilitar "contraseñas de aplicación" en tu cuenta de Google
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'paralatele648@gmail.com', // Tu email
    pass: 'Miclave.2025' // Contraseña de aplicación
  }
});

export async function sendAccessRequestEmail(rut: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: 'paralatele648@gmail.com',
      to: 'paralatele648@gmail.com',
      subject: 'Nueva Solicitud de Acceso - RUT Registrado',
      html: `
        <h2>Nueva Solicitud de Acceso</h2>
        <p>Se ha generado una nueva solicitud de acceso.</p>
        <p><strong>RUT ingresado:</strong> ${rut}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CL')}</p>
        <p>La solicitud ha sido guardada en la base de datos y está pendiente de revisión.</p>
        <hr>
        <p><em>Este es un mensaje automático del sistema</em></p>
      `,
      text: `New access request for RUT: ${rut}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
}

