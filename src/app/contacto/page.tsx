"use client";

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

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [fadeOut, setFadeOut] = useState(false);

  // Para mostrar un mensaje de éxito
  const showSuccessMessage = (message: string) => {
    setPopupType("success");
    setPopupMessage(message);
    setPopupVisible(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2000);
    setTimeout(() => setPopupVisible(false), 2500);
  };

  // Para mostrar un mensaje de error
  const showErrorMessage = (message: string) => {
    setPopupType("error");
    setPopupMessage(message);
    setPopupVisible(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2000);
    setTimeout(() => setPopupVisible(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          showSuccessMessage("Correo enviado exitosamente.");
          setFormData({ nombre: "", correo: "", mensaje: "" });
        } else {
          showErrorMessage("Error al enviar el correo.");
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        showErrorMessage("Error al enviar el formulario.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* const showPopup = (message: string) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setFadeOut(false);

    setTimeout(() => setFadeOut(true), 2000); // Inicia la animación de desvanecimiento
    setTimeout(() => setPopupVisible(false), 2500); // Oculta el popup
  }; */

  return (
    <main className="min-h-screen mt-16 p-6 bg-gradient-to-b from-orange-50 via-white to-orange-100">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-semibold mb-6 text-center text-orange-400 hover:text-orange-600 transition-colors duration-300">
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
              className="w-full px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all duration-300 ease-in-out"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Popup de mensaje */}
      {popupVisible && (
        <div
          className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-md shadow-lg z-50 transition-opacity duration-500 ease-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          } ${popupType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {popupMessage}
        </div>
      )}

    </main>
  );
}
