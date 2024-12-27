import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';  // Importar el icono de TikTok

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center">
      <div className="mb-6">
        <p className="mb-2">Síguenos en nuestras redes sociales:</p>
        <div className="flex justify-center gap-6 mt-2">
          {/* Enlace de TikTok */}
          <a
            href="#"
            aria-label="TikTok"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaTiktok size={24} />
          </a>
          {/* Enlace de Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaInstagram size={24} />
          </a>
          {/* Enlace de Twitter */}
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Derechos de autor */}
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Art Du' Parfum. Todos los derechos reservados.
      </p>
    </footer>
  );
}
