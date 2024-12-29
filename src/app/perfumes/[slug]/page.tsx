"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from 'next/navigation'; // Importamos useParams
import Image from 'next/image'; // Asegurándonos de que la imagen se maneje correctamente
import fragancias from '@/data/fragancias.json';
import {
  FaSun,
  FaMoon,
  FaSnowflake,
  FaLeaf,
  FaUmbrella,
  FaCanadianMapleLeaf,
} from "react-icons/fa";

export default function PerfumeDetailPage() {
  // Usamos useParams() para obtener el slug de la URL
  const params = useParams();
  const slug = params?.slug;

  // Validamos si el slug existe y buscamos el perfume
  const perfume = fragancias.find(
    (f) => f.nombre.toLowerCase().replace(/ /g, '-') === slug
  );

  // Manejo del caso en el que no se encuentre el perfume
  if (!perfume) {
    notFound();
    return null; // Para evitar cualquier otro renderizado
  }

  const images = [perfume.fotoPrincipal, ...(perfume.fotosAdicionales || [])];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Cambia a la siguiente foto automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [images.length]);

  // Función para cambiar a la foto anterior
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para cambiar a la siguiente foto
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Calificación dinámica
  const getCalificacionColor = (calificacion: number) => {
    if (calificacion >= 4) return 'text-green-500'; // Alta calificación
    if (calificacion >= 3) return 'text-yellow-500'; // Media calificación
    return 'text-red-500'; // Baja calificación
  };

  // Función para obtener los iconos según la ocasión
  const getOcasionesIcon = (ocasion: string) => {
    switch (ocasion) {
      case "Invierno":
        return <FaSnowflake className="text-[#78D6F0] text-4xl" />;
      case "Primavera":
        return <FaLeaf className="text-[#9FE584] text-4xl" />;
      case "Verano":
        return <FaUmbrella className="text-[#FC958A] text-4xl" />;
      case "Otoño":
        return <FaCanadianMapleLeaf className="text-[#F9BE6E] text-4xl" />;
      case "Día":
        return <FaSun className="text-[#FCF487] text-4xl" />;
      case "Noche":
        return <FaMoon className="text-[#447BA3] text-4xl" />;
      default:
        return null;
    }
  };

  // Construimos el título
  const genero = perfume.genero === 'Masculino' ? 'para Hombres' : (perfume.genero === 'Femenino' ? 'para Mujeres' : 'para Hombres y Mujeres');
  const titulo = `${perfume.nombre} - ${perfume.disenador} ${genero}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 mt-16 p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

        {/* Carrusel de fotos */}
        <div className="relative w-full h-80 overflow-hidden group mt-6">
          {/* Contenedor de las imágenes con transición suave */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentPhotoIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-80"
              >
                <Image
                  src={image}
                  alt={`Foto ${index + 1} de ${perfume.nombre}`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain object-center rounded-t-lg"
                />
              </div>
            ))}
          </div>

          {/* Botón anterior */}
          <button
            onClick={handlePrevPhoto}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 hover:scale-110 transition-transform duration-300 hidden group-hover:block"
            aria-label="Foto anterior"
          >
            &#8249;
          </button>

          {/* Botón siguiente */}
          <button
            onClick={handleNextPhoto}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 hover:scale-110 transition-transform duration-300 hidden group-hover:block"
            aria-label="Foto siguiente"
          >
            &#8250;
          </button>

          {/* Indicadores de navegación */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-6 h-2 rounded-full ${
                  index === currentPhotoIndex ? "bg-orange-500" : "bg-gray-300"
                } hover:bg-orange-400 transition-colors duration-300`}
                aria-label={`Ver foto ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Titulo con diseñador y género */}
          <h1 className="text-4xl font-bold text-center text-orange-400 mb-4 hover:text-orange-600 transition-colors duration-300">{titulo}</h1>

          {/* Calificación dinámica y Ocasiones de uso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
            {/* Calificación dinámica */}
            <div className="flex items-center space-x-2 justify-start">
              <p className="text-gray-600">Calificación <span className={`${getCalificacionColor(perfume.calificacion)}`}>{perfume.calificacion}</span> de 5</p>
            </div>

            {/* Ocasiones de uso con iconos */}
            <div className="flex items-center space-x-4 justify-center sm:justify-end">
              {perfume.ocasiones.map((ocasion) => (
                <div
                  key={ocasion}
                  className="relative flex flex-col items-center space-y-2 group"
                >
                  {/* Icono de la ocasión */}
                  {getOcasionesIcon(ocasion)}

                  {/* Label que aparece sobre el icono en pantallas pequeñas */}
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-white bg-gray-900 py-1 px-3 rounded-lg shadow-lg whitespace-nowrap sm:hidden z-50">
                    {ocasion}
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-gray-900 border-l-transparent border-r-transparent"></span>
                  </span>

                  {/* Label debajo del icono en pantallas grandes */}
                  <span className="text-sm text-gray-600 sm:mt-2 sm:block hidden">
                    {ocasion}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-4">{perfume.descripcion}</p>

          {/* Precio */}
          <div className="mb-6 text-center">
            <p className="text-2xl font-semibold text-orange-600">{perfume.precio.toFixed(2)} €</p>
          </div>

          {/* Acordes principales con imagen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-orange-400 mb-6">Acordes principales</h2>
              <Image
                src={perfume.acordesPrincipales}
                alt="Acordes principales de la fragancia"
                width={500}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Pirámide olfativa con imagen */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-orange-400 mb-6">Pirámide Olfativa de la Fragancia</h2>
              <Image
                src={perfume.piramideOlfativa}
                alt="Pirámide olfativa de la fragancia"
                width={500}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
