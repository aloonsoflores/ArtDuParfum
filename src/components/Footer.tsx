import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'; // Importar el icono de TikTok

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-orange-500 py-6 text-center">
      <div className="mb-6">
        <p className="mb-2 text-orange-500">Síguenos en nuestras redes sociales:</p>
        <div className="flex justify-center gap-6 mt-2">
          {/* Enlace de TikTok */}
          <a
            href="#"
            aria-label="TikTok"
            className="text-orange-400 hover:text-orange-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaTiktok size={24} />
          </a>
          {/* Enlace de Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="text-orange-400 hover:text-orange-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaInstagram size={24} />
          </a>
          {/* Enlace de Twitter */}
          <a
            href="#"
            aria-label="Twitter"
            className="text-orange-400 hover:text-orange-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-orange-300 my-4"></div>

      {/* Derechos de autor */}
      <p className="text-sm text-orange-500">
        &copy; {new Date().getFullYear()} Art Du&apos; Parfum. Todos los derechos reservados.
      </p>
    </footer>
  );
}
