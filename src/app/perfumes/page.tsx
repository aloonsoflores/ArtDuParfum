"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import fragancias from '@/data/fragancias.json';

export default function PerfumeListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 6; // Número de perfumes por página

  // Filtrar perfumes según la búsqueda
  const filteredFragancias = fragancias.filter((fragancia) => {
    return fragancia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragancia.disenador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragancia.precio.toString().includes(searchTerm);
  });

  // Paginación
  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = filteredFragancias.slice(indexOfFirstPerfume, indexOfLastPerfume);

  const totalPages = Math.ceil(filteredFragancias.length / perfumesPerPage);

  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="min-h-screen mt-16 p-6 bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-center">Catálogo de Perfumes</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar perfume, diseñador o precio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      {/* Lista de perfumes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPerfumes.map((fragancia) => (
          <Link key={fragancia.nombre} href={`/perfumes/${fragancia.nombre.toLowerCase().replace(/ /g, '-')}`}>
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
                <h2 className="text-lg font-bold">{fragancia.nombre}</h2>
                <p className="text-sm text-gray-600 mb-2">{fragancia.disenador}</p>
                <p className="text-yellow-600 font-semibold">Precio: ${fragancia.precio.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredFragancias.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No se encontraron perfumes con ese criterio.</p>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 disabled:bg-gray-300"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-lg">{currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg ml-2 disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
