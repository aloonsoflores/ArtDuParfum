import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white px-6">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-t from-yellow-500 via-transparent to-transparent h-[200%] w-[200%] rounded-full opacity-10 animate-spin-slow"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Title */}
        <h1 className="text-5xl font-extrabold mb-6 animate-fadeIn">
          Bienvenido a <span className="text-yellow-400">Art Du' Parfum</span>
        </h1>

        {/* Subtitle with animation */}
        <p className="text-lg mb-8 opacity-0 animate-fadeIn-delay">
          Descubre la magia y elegancia de nuestras fragancias árabes exclusivas.
        </p>

        {/* Button with animation */}
        <Link
          href="/perfumes"
          className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 shadow-lg animate-bounce"
        >
          Explorar Perfumes
        </Link>
      </div>
    </main>
  );
}
