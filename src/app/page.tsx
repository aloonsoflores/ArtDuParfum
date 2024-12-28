import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-800 px-6">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-t from-gray-orange via-transparent to-transparent h-[200%] w-[200%] rounded-full opacity-10 animate-spin-slow"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Title */}
        <h1 className="text-5xl font-extrabold mb-6 animate-fadeIn">
          Bienvenido a <span className="text-orange-400 hover:text-orange-600 transition-colors duration-300">Art Du&apos; Parfum</span>
        </h1>

        {/* Subtitle with animation */}
        <p className="text-lg mb-8 opacity-0 animate-fadeIn-delay">
          Tenemos una amplia colección de fragancias árabes exclusivas. Si buscas algo especial, ¡pregúntanos!
        </p>
      </div>

      {/* Buttons Section */}
      <div className="relative z-10 w-full max-w-4xl grid gap-6">
        {/* Large button */}
        <Link
          href="/perfumes?genero=todos"
          className="relative block bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-white text-2xl font-semibold text-center py-10 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeIn"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
            style={{ backgroundImage: "url('/images/banners/todos-perfumes.jpg')" }}
          ></div>
          {/* Text container */}
          <span className="relative z-20 drop-shadow-md">Todos los Perfumes</span>
        </Link>

        {/* Smaller buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/perfumes?genero=femenino"
            className="relative block bg-gradient-to-r from-violet-400 via-violet-300 to-violet-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeIn-delay"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-mujer.jpg')" }}
            ></div>
            {/* Text container */}
            <span className="relative z-20 drop-shadow-md">Perfumes Mujer</span>
          </Link>
          <Link
            href="/perfumes?genero=unisex"
            className="relative block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeIn-delay"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-unisex.jpg')" }}
            ></div>
            {/* Text container */}
            <span className="relative z-20 drop-shadow-md">Perfumes Unisex</span>
          </Link>
          <Link
            href="/perfumes?genero=masculino"
            className="relative block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeIn-delay"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-hombre.jpg')" }}
            ></div>
            {/* Text container */}
            <span className="relative z-20 drop-shadow-md">Perfumes Hombre</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
