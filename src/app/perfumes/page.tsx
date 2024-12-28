"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSort } from "react-icons/fa";
import fragancias from "@/data/fragancias.json";

export default function PerfumeListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("mejorValorados");
  const [genero] = useState("todos");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const perfumesPerPage = 10;

  // Determinar título basado en género
  const titulo =
    genero === "masculino"
      ? "para Hombres"
      : genero === "femenino"
      ? "para Mujeres"
      : genero === "unisex"
      ? "para Hombres y Mujeres"
      : "";

  // Filtrar fragancias
  const filteredFragancias = fragancias.filter((fragancia) => {
    const matchesGenero = genero === "todos" || fragancia.genero.toLowerCase() === genero;
    const matchesSearchTerm =
      fragancia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragancia.disenador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragancia.precio.toString().includes(searchTerm);

    return matchesGenero && matchesSearchTerm;
  });

  // Ordenar fragancias según la opción seleccionada
  if (sortOption === "mejorValorados") {
    filteredFragancias.sort((a, b) => b.calificacion - a.calificacion);
  } else if (sortOption === "alfabeticamenteAZ") {
    filteredFragancias.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (sortOption === "alfabeticamenteZA") {
    filteredFragancias.sort((a, b) => b.nombre.localeCompare(a.nombre));
  } else if (sortOption === "precioMenorMayor") {
    filteredFragancias.sort((a, b) => a.precio - b.precio);
  } else if (sortOption === "precioMayorMenor") {
    filteredFragancias.sort((a, b) => b.precio - a.precio);
  } else if (sortOption === "fechaAntiguoReciente") {
    filteredFragancias.sort((a, b) => a.anoDeLanzamiento - b.anoDeLanzamiento);
  } else if (sortOption === "fechaRecienteAntiguo") {
    filteredFragancias.sort((a, b) => b.anoDeLanzamiento - a.anoDeLanzamiento);
  }

  // Paginación
  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = filteredFragancias.slice(indexOfFirstPerfume, indexOfLastPerfume);
  const totalPages = Math.ceil(filteredFragancias.length / perfumesPerPage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleSortButtonClick = () => {
    const options = [
      "mejorValorados",
      "alfabeticamenteAZ",
      "alfabeticamenteZA",
      "precioMenorMayor",
      "precioMayorMenor",
      "fechaAntiguoReciente",
      "fechaRecienteAntiguo",
    ];

    const nextSortOptionIndex = (options.indexOf(sortOption) + 1) % options.length;
    const nextSortOption = options[nextSortOptionIndex];

    setSortOption(nextSortOption);

    const messageMap: { [key: string]: string } = {
      mejorValorados: "Ordenando por Mejor valorados",
      alfabeticamenteAZ: "Ordenando Alfabéticamente (A-Z)",
      alfabeticamenteZA: "Ordenando Alfabéticamente (Z-A)",
      precioMenorMayor: "Ordenando por Precio (menor a mayor)",
      precioMayorMenor: "Ordenando por Precio (mayor a menor)",
      fechaAntiguoReciente: "Ordenando por Fecha (antiguo a reciente)",
      fechaRecienteAntiguo: "Ordenando por Fecha (reciente a antiguo)",
    };

    setPopupMessage(messageMap[nextSortOption]);
    setPopupVisible(true);
    setFadeOut(false);

    setTimeout(() => setFadeOut(true), 3000);
    setTimeout(() => setPopupVisible(false), 3500);
  };

  return (
    <main className="min-h-screen mt-16 p-6 bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-400">
        Catálogo de Perfumes {titulo}
      </h1>

      {/* Barra de búsqueda y botón de ordenar */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar perfume, diseñador o precio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block border border-orange-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        <div className="ml-4 sm:hidden">
          <button
            className="p-4 bg-orange-400 text-white rounded-md"
            aria-label="Ordenar"
            onClick={handleSortButtonClick}
          >
            <FaSort />
          </button>
        </div>

        <div className="hidden sm:block">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-orange-300 rounded-md px-4 py-2"
          >
            <option value="mejorValorados">Mejor valorados</option>
            <option value="alfabeticamenteAZ">Alfabéticamente (A-Z)</option>
            <option value="alfabeticamenteZA">Alfabéticamente (Z-A)</option>
            <option value="precioMenorMayor">Precio (menor a mayor)</option>
            <option value="precioMayorMenor">Precio (mayor a menor)</option>
            <option value="fechaAntiguoReciente">Fecha (antiguo a reciente)</option>
            <option value="fechaRecienteAntiguo">Fecha (reciente a antiguo)</option>
          </select>
        </div>
      </div>

      {popupVisible && (
        <div
          className={`fixed bottom-10 right-10 bg-orange-400 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-500 ease-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {popupMessage}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {currentPerfumes.map((fragancia) => (
          <Link key={fragancia.nombre} href={`/perfumes/${fragancia.nombre.toLowerCase().replace(/ /g, "-")}`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="relative overflow-hidden group">
                <Image
                  src={fragancia.fotoPrincipal}
                  alt={fragancia.nombre}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800">{fragancia.nombre}</h2>
                <p className="text-sm text-gray-600 mb-2">{fragancia.disenador}</p>
                <p className="text-orange-600 font-semibold">{fragancia.precio.toFixed(2)} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredFragancias.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No se encontraron fragancias.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}
