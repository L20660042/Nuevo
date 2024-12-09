// src/pages/Welcome.jsx
import { Link } from "react-router-dom"; // Importa Link para la navegación
import { Globe, Home, HelpCircle, Fingerprint } from "lucide-react"; // Importa los iconos
import NavBar from "../components/NavBar"; // Asegúrate de que NavBar está correctamente importado
import Button from "../components/ui/Button"; // Importa el componente Button

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex flex-col">
      <NavBar /> {/* Aquí estamos incluyendo el componente NavBar */}

      {/* Sección de bienvenida */}
      <div className="flex items-center justify-center min-h-[80vh] flex-col text-center text-white">
        <img
          src="/image/img.jpg" // Ruta de la imagen
          alt="Logo IT Matehuala"
          className="w-48 h-48 mb-6 rounded-full" // Redondea la imagen como un círculo
        />
        <h2 className="text-4xl font-bold mb-6">Bienvenido al Sistema de Residencias</h2>
        <p className="text-lg mb-6">
          Nos complace darte la bienvenida a nuestro sistema integral diseñado para gestionar
          y mejorar tu experiencia residencial.
        </p>
      </div>
    </div>
  );
}
