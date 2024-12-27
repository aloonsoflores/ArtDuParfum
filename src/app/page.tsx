import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-100 text-gray-800 px-6">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-t from-pink-200 via-transparent to-transparent h-[200%] w-[200%] rounded-full opacity-10 animate-spin-slow"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Title */}
        <h1 className="text-5xl font-extrabold mb-6 animate-fadeIn">
          Bienvenido a <span className="text-yellow-400">Art Du&apos; Parfum</span>
        </h1>

        {/* Subtitle with animation */}
        <p className="text-lg mb-8 opacity-0 animate-fadeIn-delay">
          Descubre la magia y elegancia de nuestras fragancias árabes exclusivas.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="relative z-10 w-full max-w-4xl grid gap-6">
        {/* Large button */}
        <Link
          href="/perfumes"
          className="relative block bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-white text-2xl font-semibold text-center py-10 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
            style={{ backgroundImage: "url('/images/banners/todos-perfumes.jpg')" }}
          ></div>
          Todos los Perfumes
        </Link>

        {/* Smaller buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/perfumes/mujer"
            className="relative block bg-gradient-to-r from-rose-400 via-rose-300 to-rose-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-mujer.jpg')" }}
            ></div>
            Perfumes Mujer
          </Link>
          <Link
            href="/perfumes/unisex"
            className="relative block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-unisex.jpg')" }}
            ></div>
            Perfumes Unisex
          </Link>
          <Link
            href="/perfumes/hombre"
            className="relative block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 text-white text-lg font-semibold text-center py-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/images/banners/perfumes-hombre.jpg')" }}
            ></div>
            Perfumes Hombre
          </Link>
        </div>
      </div>
    </main>
  );
}
