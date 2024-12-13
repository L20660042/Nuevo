import React, { useState } from "react";
import { User, FolderCheck, ChevronDown, Upload, Menu, X, Camera } from "lucide-react"; // Importar los íconos necesarios
import { Button } from "../components/ui/Button"; // Importa el botón de UI
import Profile from "../components/Profile"; // Importar el componente de perfil
import { useNavigate } from "react-router-dom"; // Navegación

export default function JefeCarreraDashboard() {
  const [view, setView] = useState("protocolos"); // Estado para controlar la vista actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const navigate = useNavigate(); // Hook para navegación

  // Datos del perfil (Ejemplo)
  const perfil = {
    name: "Carlos Hernández",
    email: "carlos.hernandez@matehuala.tecnm.mx",
    phone: "123-456-7890",
    career: "Ingeniería en Sistemas",
    image: "/image/perfil.png", // Imagen de perfil por defecto
  };

  // Lista de protocolos de los proyectos
  const protocolos = [
    { name: "Protocolos de Sistema de Gestión", student: "Juan Pérez", career: "Ingeniería en Sistemas", status: "Pendiente" },
    { name: "Protocolos de Aplicación Móvil", student: "María González", career: "Ingeniería en Sistemas", status: "Aprobado" },
  ];

  // Lista de estudiantes para asignar asesores
  const estudiantes = [
    { name: "Juan Pérez", career: "Ingeniería en Sistemas", assignedAdvisor: "No asignado" },
    { name: "María González", career: "Ingeniería en Sistemas", assignedAdvisor: "No asignado" },
  ];

  // Función para manejar el cambio de vista y cerrar el menú móvil
  const handleViewChange = (selectedView) => {
    setView(selectedView);
    setIsMenuOpen(false); // Cierra el menú móvil
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token de autenticación
    navigate("/login"); // Redirige al inicio de sesión
    setIsMenuOpen(false); // Cierra el menú móvil
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header fijo */}
      <header className="bg-[rgb(31,65,155)] text-white p-4 shadow-xl border-b-2 border-[rgb(31,65,155)] fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full mr-4 overflow-hidden">
              <img src="/image/img.jpg" alt="Logo IT Matehuala" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold">INSTITUTO TECNOLÓGICO DE MATEHUALA</h1>
          </div>

          {/* Menú de hamburguesa para dispositivos móviles */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`md:w-64 bg-[rgb(31,65,155)] text-white p-5 border-r-2 border-white/20 fixed top-16 left-0 bottom-0 ${
          isMenuOpen ? "block" : "hidden"
        } md:block shadow-md`}
      >
        <nav className="space-y-4">
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("profile")}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("protocolos")}
          >
            <FolderCheck className="w-5 h-5" />
            <span>Protocolos</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("asesores")}
          >
            <User className="w-5 h-5" />
            <span>Asignar Asesores</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={handleLogout}
          >
            <Upload className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-0 md:pl-64 pt-20">
        <div className="overflow-y-auto flex-1">
          <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[rgb(31,65,155)]">
                {view === "profile"
                  ? "Perfil"
                  : view === "protocolos"
                  ? "Aprobar Protocolos"
                  : "Asignar Asesores"}
              </h2>
            </div>

            {/* Vista de Perfil */}
            {view === "profile" && <Profile />}

            {/* Vista de Protocolos */}
            {view === "protocolos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {protocolos.map((protocolo, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{protocolo.name}</h3>
                    <p className="text-sm text-gray-600">{protocolo.student} - {protocolo.career}</p>
                    <p className="text-xs text-gray-500">{protocolo.status}</p>
                    <div className="flex space-x-4 mt-4">
                      <Button variant="outline" className="rounded-md">Aprobar</Button>
                      <Button variant="outline" className="rounded-md">Rechazar</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vista de Asignar Asesores */}
            {view === "asesores" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {estudiantes.map((estudiante, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{estudiante.name}</h3>
                    <p className="text-sm text-gray-600">{estudiante.career}</p>
                    <p className="text-xs text-gray-500">{estudiante.assignedAdvisor}</p>
                    <div className="flex space-x-4 mt-4">
                      <Button variant="outline" className="rounded-md">Asignar Asesor</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
