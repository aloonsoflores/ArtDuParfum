import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });    

    // Configurar el correo
    const mailOptions = {
      from: 'artduparfum.help@gmail.com', // Correo remitente
      to: 'artduparfum.help@gmail.com', // Correo destinatario
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
