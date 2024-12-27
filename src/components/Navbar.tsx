'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Detectar clics fuera del menú para cerrar el menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element; // Aseguramos que event.target es un Element
      if (target && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Función para cerrar el menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Art Du' Parfum</Link>
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-yellow-400 focus:outline-none"
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Menú lateral para pantallas pequeñas */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-xl transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}
        >
          <ul className="flex flex-col space-y-6 p-6">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/perfumes" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={handleLinkClick}>
                Perfumes
              </Link>
            </li>
            {/* <li>
              <Link href="/contacto" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={handleLinkClick}>
                Contacto
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Menú horizontal para pantallas grandes */}
        <ul className={`hidden sm:flex-row sm:space-x-6 sm:block transition-all duration-300 ease-in-out sm:flex sm:opacity-100 sm:space-x-6`}>
          <li>
            <Link href="/" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/perfumes" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
              Perfumes
            </Link>
          </li>
          {/* <li>
            <Link href="/contacto" className="hover:text-yellow-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
              Contacto
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}