import React, { useState } from "react";
import { User, Briefcase, Folder, Upload, Camera, Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import Profile from "../components/Profile"; // Vista de perfil reutilizable
import { useNavigate } from "react-router-dom"; // Hook para navegación

export default function GTIVDashboard() {
  const [view, setView] = useState("empresas"); // Estado para controlar la vista actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const navigate = useNavigate(); // Hook para navegación

  // Lista de empresas asociadas
  const empresas = [
    {
      name: "TechSolutions",
      contact: "Carlos López",
      description: "Empresa dedicada al desarrollo de software y soluciones tecnológicas.",
      status: "Activo",
      proyectos: [
        {
          name: "Sistema de Gestión",
          description: "Optimiza el control de stock y mejora la eficiencia operativa.",
          student: "Juan Pérez",
          career: "Ingeniería en Sistemas",
          status: "En desarrollo",
          image: "/images/proyecto1.jpg", // Imagen de vista previa
        },
        {
          name: "Aplicación Móvil",
          description: "Desarrollo de una app para mejorar la productividad.",
          student: "María González",
          career: "Ingeniería en Sistemas",
          status: "En pruebas",
          image: "/images/proyecto2.jpg", // Imagen de vista previa
        },
      ],
    },
    {
      name: "AppDev",
      contact: "Ana Martínez",
      description: "Desarrollo de aplicaciones móviles para mejorar la productividad.",
      status: "Inactivo",
      proyectos: [],
    },
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
      {/* Header */}
      <header className="bg-[rgb(31,65,155)] text-white p-4 shadow-xl border-b-2 border-[rgb(31,65,155)] fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full mr-4 overflow-hidden">
              <img src="/image/img.jpg" alt="Logo IT Matehuala" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold">INSTITUTO TECNOLÓGICO DE MATEHUALA</h1>
          </div>

          {/* Menú móvil */}
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
            onClick={() => handleViewChange("perfil")}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("empresas")}
          >
            <Briefcase className="w-5 h-5" />
            <span>Empresas Asociadas</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("proyectos")}
          >
            <Folder className="w-5 h-5" />
            <span>Proyectos Asociados</span>
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
      <div className="flex-1 p-8 md:ml-64 mt-16 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[rgb(31,65,155)]">
              {view === "perfil"
                ? "Perfil del Coordinador"
                : view === "empresas"
                ? "Empresas Asociadas"
                : "Proyectos Asociados"}
            </h2>
          </div>

          {/* Vista de Perfil */}
          {view === "perfil" && <Profile />}

          {/* Vista de Empresas */}
          {view === "empresas" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {empresas.map((empresa, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-[rgb(31,65,155)] mt-4">{empresa.name}</h3>
                  <p className="text-sm text-gray-600">{empresa.contact}</p>
                  <p className="text-xs text-gray-500 mt-2">{empresa.description}</p>
                  <p className="text-sm text-gray-700 mt-2">Estado: {empresa.status}</p>
                </div>
              ))}
            </div>
          )}

          {/* Vista de Proyectos */}
          {view === "proyectos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {empresas.flatMap((empresa) =>
                empresa.proyectos.map((proyecto, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                      <img
                        src={proyecto.image}
                        alt={`Vista previa de ${proyecto.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{proyecto.name}</h3>
                    <p className="text-sm text-gray-600">
                      {proyecto.student} - {proyecto.career}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{proyecto.description}</p>
                    <p className="text-sm text-gray-700 mt-2">Estado: {proyecto.status}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
