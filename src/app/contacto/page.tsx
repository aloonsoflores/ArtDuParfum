"use client"

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = { nombre: "", correo: "", mensaje: "" };
    let isValid = true;

    // Validación de nombre
    if (!formData.nombre) {
      formErrors.nombre = "Por favor, ingresa tu nombre.";
      isValid = false;
    }

    // Validación de correo
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.correo || !emailPattern.test(formData.correo)) {
      formErrors.correo = "Por favor, ingresa un correo electrónico válido.";
      isValid = false;
    }

    // Validación de mensaje
    if (!formData.mensaje) {
      formErrors.mensaje = "Por favor, ingresa tu mensaje.";
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      // Aquí puedes enviar el formulario
      console.log("Formulario enviado:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen mt-16 p-6 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 hover:text-yellow-600 transition-colors duration-300">
          Contáctanos
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Nombre */}
            <label className="block">
              <span className="text-gray-600">Nombre</span>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="block w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:scale-105 focus:shadow-lg focus:border-yellow-500 transition-all duration-300 ease-in-out"
                placeholder="Tu nombre"
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </label>

            {/* Correo */}
            <label className="block">
              <span className="text-gray-600">Correo</span>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="block w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:scale-105 focus:shadow-lg focus:border-yellow-500 transition-all duration-300 ease-in-out"
                placeholder="Tu correo"
              />
              {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
            </label>

            {/* Mensaje */}
            <label className="block">
              <span className="text-gray-600">Mensaje</span>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="block w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:scale-105 focus:shadow-lg focus:border-yellow-500 transition-all duration-300 ease-in-out"
                rows={4}
                placeholder="Escribe tu mensaje..."
              />
              {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
            </label>

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-all duration-300 ease-in-out"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
