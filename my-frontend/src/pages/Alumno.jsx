import React, { useState } from "react";
import { User, FolderKanban, Upload, ChevronDown, CheckCircle, Circle, Download, Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import UploadProject from "../components/UploadProject";

export default function Dashboard() {
  const [view, setView] = useState("myProject");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate(); // Hook para redirección

  const projectStages = [
    { name: "Propuesta", completed: true },
    { name: "Revisión", completed: true },
    { name: "Desarrollo", completed: true },
    { name: "Pruebas", completed: true },
    { name: "Entrega", completed: false },
  ];

  const projects = [
    {
      name: "Sistema de Gestión",
      company: "TechSolutions",
      description: "Optimiza el control de stock y mejora la eficiencia operativa.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Aplicación Móvil",
      company: "AppDev",
      description: "Desarrollo de una app para mejorar la productividad.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "E-commerce",
      company: "ShopMasters",
      description: "Plataforma de compras online para pequeñas empresas.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const projectDetails = {
    name: "Sistema de Gestión",
    company: "TechSolutions",
    description: "Optimiza el control de stock y mejora la eficiencia operativa.",
    image: "/placeholder.svg?height=200&width=300",
  };

  // Función para manejar el cambio de vista y cerrar el menú en móvil
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

          {/* Menú de hamburguesa */}
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
            onClick={() => handleViewChange("myProject")}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Proyectos alumno</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-2 rounded hover:bg-white/10" onClick={() => handleViewChange("uploadProject")}>
            <Upload className="w-5 h-5" />
            <span className="ml-2">Subir Proyecto</span>
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
              {view === "profile"
                ? "Perfil"
                : view === "myProject"
                ? "Mi Proyecto"
                : "Banco de Proyectos"}
            </h2>
            <div className="flex space-x-4">
              {view !== "profile" && (
                <>
                  <Button variant="outline" className="rounded-md text-[rgb(31,65,155)] border-gray-300 hover:border-[rgb(31,65,155)]">
                    <Download className="mr-2 h-4 w-4" /> Descargar formatos
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
                      <DropdownMenuItem>Ver mi propuesta</DropdownMenuItem>
                      <DropdownMenuItem>Subir archivos</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {view === "profile" ? (
            <Profile />
          ) : view === "myProject" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <img
                    src={project.image}
                    alt="Imagen de proyecto"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <h3 className="text-lg font-semibold text-[rgb(31,65,155)] mt-4">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.company}</p>
                  <p className="text-xs text-gray-500 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          ) : view === "uploadProject" ? (
            <UploadProject />
            ) :
           null}
        </div>
      </div>
    </div>
  );
}
