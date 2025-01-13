import './globals.css';
import { Suspense } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Art Du Parfum',
  description: 'Elegancia y exclusividad en fragancias árabes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
