import React, { useState } from "react";
import { User, FolderKanban, Upload, ChevronDown, CheckCircle, Circle, Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

export default function AsesorDashboard() {
  const [view, setView] = useState("proyectos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const proyectosResidencias = [
    {
      name: "Sistema de Gestión",
      student: "Juan Pérez",
      career: "Ingeniería en Sistemas",
      stages: [
        { name: "Propuesta", completed: true },
        { name: "Revisión", completed: true },
        { name: "Entrega", completed: false },
      ],
    },
    {
      name: "Aplicación Móvil",
      student: "María González",
      career: "Ingeniería en Sistemas",
      stages: [
        { name: "Propuesta", completed: true },
        { name: "Revisión", completed: false },
        { name: "Entrega", completed: false },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setIsMenuOpen(false); // Cierra el menú móvil al cerrar sesión
  };

  const handleViewChange = (selectedView) => {
    setView(selectedView);
    setIsMenuOpen(false); // Cierra el menú móvil al seleccionar una opción
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
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("perfil")}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={() => handleViewChange("proyectos")}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Proyectos de estudiantes</span>
          </button>
          <button
            className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10 w-full"
            onClick={handleLogout}
          >
            <Upload className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:ml-64 mt-16 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[rgb(31,65,155)]">
              {view === "perfil"
                ? "Perfil del Asesor"
                : view === "proyectos"
                ? "Proyectos de Estudiantes"
                : "Vista no encontrada"}
            </h2>
            <div className="flex space-x-4">
              {view === "proyectos" && (
                <>
                  <Button variant="outline" className="rounded-md text-[rgb(31,65,155)] border-gray-300 hover:border-[rgb(31,65,155)]">
                    Descargar formatos
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="outline"
                        className="rounded-md text-[rgb(31,65,155)] border-gray-300 hover:border-[rgb(31,65,155)]"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem>Ver propuesta</DropdownMenuItem>
                      <DropdownMenuItem>Subir archivos</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {view === "perfil" ? (
            <Profile />
          ) : view === "proyectos" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {proyectosResidencias.map((project, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.student}</p>
                  <p className="text-xs text-gray-500">{project.career}</p>
                  <div className="space-y-2 mt-4">
                    {project.stages.map((stage, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">{stage.name}</span>
                        {stage.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No hay contenido disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
