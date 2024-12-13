import React, { useState } from "react";
import { User, FolderKanban, Upload, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

export default function Dashboard() {
  const [view, setView] = useState("myProject"); // Estado para controlar la vista actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const navigate = useNavigate(); // Hook de navegación

  // Lista de proyectos para "Proyectos alumnos"
  const projectsAlumnos = [
    {
      name: "Sistema de Gestión",
      company: "TechSolutions",
      description: "Optimiza el control de stock y mejora la eficiencia operativa.",
      image: "/placeholder.svg?height=200&width=300",
      student: "Juan Pérez",
      career: "Ingeniería en Sistemas",
    },
    // Más proyectos...
  ];

  // Lista de proyectos para "Banco de proyectos"
  const projectsBank = [
    {
      name: "Proyecto de Energía Solar",
      company: "SolarTech",
      description: "Desarrollo de una planta de energía solar.",
      image: "/placeholder.svg?height=200&width=300",
      career: "Ingeniería en Energías Renovables",
    },
    // Más proyectos...
  ];

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token
    navigate("/login"); // Redirige al inicio de sesión
    setIsMenuOpen(false); // Cierra el menú móvil
  };

  // Función para manejar la selección de una vista
  const handleViewChange = (selectedView) => {
    setView(selectedView);
    setIsMenuOpen(false); // Cierra el menú móvil
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-[rgb(31,65,155)] text-white p-4 shadow-xl border-b-2 border-[rgb(31,65,155)] fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full mr-4 overflow-hidden">
              <img src="/image/img.jpg" alt="Logo IT Matehuala" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold">INSTITUTO TECNOLÓGICO DE MATEHUALA</h1>
          </div>
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
            className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10 w-full"
            onClick={() => handleViewChange("profile")}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10 w-full"
            onClick={() => handleViewChange("myProject")}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Proyectos alumnos</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10 w-full"
            onClick={() => handleViewChange("projectsBank")}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Banco de proyectos</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10 w-full"
            onClick={handleLogout}
          >
            <Upload className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-0 md:pl-64 pt-20">
        <div className="overflow-y-auto flex-1 p-6">
          <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
            <h2 className="text-2xl font-semibold text-[rgb(31,65,155)] mb-6">
              {view === "profile" ? "Perfil" : view === "myProject" ? "Proyectos alumnos" : "Banco de Proyectos"}
            </h2>

            {view === "profile" ? (
              <Profile />
            ) : view === "myProject" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projectsAlumnos.map((project, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <img
                      src={project.image}
                      alt="Imagen de proyecto"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)] mt-4">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.company}</p>
                    <p className="text-xs text-gray-500 mt-2">{project.description}</p>
                    <p className="text-sm text-gray-700 mt-2">
                      {project.student} - {project.career}
                    </p>
                  </div>
                ))}
              </div>
            ) : view === "projectsBank" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projectsBank.map((project, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <img
                      src={project.image}
                      alt="Imagen de proyecto"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)] mt-4">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.company}</p>
                    <p className="text-xs text-gray-500 mt-2">{project.description}</p>
                    <p className="text-sm text-gray-700 mt-2">{project.career}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
