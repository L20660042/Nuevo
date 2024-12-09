import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Home, HelpCircle, Fingerprint } from "lucide-react";
import { Button } from "./ui/Button";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-800 text-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y texto alineados a la izquierda */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
              <img
                src="/image/img.jpg"
                alt="Logo IT Matehuala"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-white ml-2">
              INSTITUTO TECNOLÓGICO DE MATEHUALA
            </h1>
          </div>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="#"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Globe className="h-5 w-5" />
              INTRANET
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Home className="h-5 w-5" />
              INICIO
            </Link>
            <Link
              to="/ayuda"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <HelpCircle className="h-5 w-5" />
              AYUDA
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="text-sm bg-blue-600 hover:bg-blue-700"
              >
                <Fingerprint className="h-5 w-5 mr-1" />
                INICIA SESIÓN
              </Button>
            </Link>
          </div>

          {/* Botón hamburguesa para pantallas pequeñas */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {/* Icono de hamburguesa */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 text-white">
          <div className="px-4 py-2 space-y-2">
            <Link
              to="#"
              className="block py-2 text-white/80 hover:text-white"
            >
              <Globe className="h-5 w-5 inline-block mr-2" />
              INTRANET
            </Link>
            <Link
              to="/"
              className="block py-2 text-white/80 hover:text-white"
            >
              <Home className="h-5 w-5 inline-block mr-2" />
              INICIO
            </Link>
            <Link
              to="/ayuda"
              className="block py-2 text-white/80 hover:text-white"
            >
              <HelpCircle className="h-5 w-5 inline-block mr-2" />
              AYUDA
            </Link>
            <Link
              to="/login"
              className="block py-2 text-white/80 hover:text-white"
            >
              <Fingerprint className="h-5 w-5 inline-block mr-2" />
              INICIA SESIÓN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
