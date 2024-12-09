import React, { useState } from 'react';
import { User, FolderKanban, Upload, Camera, Menu, X } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";

export default function DocenteDashboard() {
  const [view, setView] = useState('proyectos'); // Controla la vista actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado para revisión
  const [comentarios, setComentarios] = useState(""); // Comentarios del docente
  const [calificacion, setCalificacion] = useState(""); // Calificación del proyecto

  const projectStages = [
    { name: 'Propuesta', completed: true },
    { name: 'Revisión', completed: true },
    { name: 'Desarrollo', completed: true },
    { name: 'Pruebas', completed: true },
    { name: 'Entrega', completed: false },
  ];

  // Lista de proyectos asignados
  const projects = [
    { 
      name: 'Sistema de Gestión', 
      student: 'Juan Pérez',
      description: 'Optimiza el control de stock y mejora la eficiencia operativa.', 
      image: '/placeholder.svg?height=200&width=300',
      status: 'En revisión',
      feedback: '',
      grade: '',
    },
    { 
      name: 'Aplicación Móvil', 
      student: 'María González',
      description: 'Desarrollo de una app para mejorar la productividad.', 
      image: '/placeholder.svg?height=200&width=300',
      status: 'Aprobado',
      feedback: 'Buen trabajo, pero falta documentación en la etapa de pruebas.',
      grade: '85',
    },
  ];

  const projectDetails = {
    name: 'Sistema de Gestión',
    student: 'Juan Pérez',
    description: 'Optimiza el control de stock y mejora la eficiencia operativa.',
    image: '/placeholder.svg?height=200&width=300'
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

          {/* Menú móvil */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`md:w-64 bg-[rgb(31,65,155)] text-white p-5 border-r-2 border-white/20 fixed top-16 left-0 bottom-0 md:block ${isMenuOpen ? 'block' : 'hidden'} shadow-md`}>
        <nav className="space-y-4">
          {/* Menú Perfil */}
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10" onClick={() => setView('perfil')}>
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </a>

          {/* Menú Proyectos */}
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10" onClick={() => setView('proyectos')}>
            <FolderKanban className="w-5 h-5" />
            <span>Proyectos asignados</span>
          </a>

          {/* Menú Cerrar sesión */}
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-white/10">
            <Upload className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:ml-64 mt-16 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[rgb(31,65,155)]">
              {view === 'perfil' ? 'Perfil' : view === 'proyectos' ? 'Proyectos Asignados' : 'Detalles del Proyecto'}
            </h2>
          </div>

          {/* Vista de Proyectos */}
          {view === 'proyectos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
                  {/* Imagen de vista previa */}
                  <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={`Vista previa de ${project.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Información del proyecto */}
                  <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.student}</p>
                  <p className="text-gray-700 text-xs mt-2">{project.description}</p>
                  <p className="text-gray-500 text-xs mt-2">Estado: {project.status}</p>
                  <p className="text-gray-500 text-xs mt-2">Calificación: {project.grade || 'Sin calificar'}</p>

                  {/* Botones de gestión de comentarios y calificaciones */}
                  <div className="mt-4 space-y-3">
                    <Button 
                      className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition-colors duration-300" 
                      onClick={() => setSelectedProject(index)} 
                    >
                      Revisar Comentarios y Retroalimentación
                    </Button>
                    <Button 
                      className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition-colors duration-300" 
                      onClick={() => alert("Gestionar Revisiones")} 
                    >
                      Gestionar Revisiones
                    </Button>
                    <Button 
                      className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300" 
                      onClick={() => alert("Gestionar Calificaciones")} 
                    >
                      Gestionar Calificaciones
                    </Button>
                    <Button 
                      className="bg-gray-500 text-white w-full py-2 rounded-md hover:bg-gray-600 transition-colors duration-300" 
                      onClick={() => alert("Ver archivos del proyecto")} 
                    >
                      Ver Archivos
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vista de Perfil */}
          {view === 'perfil' && (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img 
                  src="/image/perfil.png" 
                  alt="Imagen de perfil"
                  className="w-32 h-32 rounded-full object-cover" 
                />
                <Button className="absolute bottom-0 right-0 bg-[rgb(31,65,155)] text-white p-2 rounded-full">
                  <Camera className="w-5 h-5" />
                </Button>
              </div>

              {/* Información de perfil */}
              <p className="text-lg text-gray-800 font-semibold mb-2">Ingeniería en Sistemas</p>

              {/* Formulario de perfil */}
              <div className="w-full max-w-sm">
                <div className="mb-4">
                  <p className="text-sm text-gray-400 uppercase">Teléfono</p>
                  <input
                    type="text"
                    className="w-full border-b-2 border-gray-300 focus:border-[rgb(31,65,155)] outline-none text-gray-800"
                    placeholder="123-456-7890"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 uppercase">Email</p>
                  <input
                    type="email"
                    className="w-full border-b-2 border-gray-300 focus:border-[rgb(31,65,155)] outline-none text-gray-800"
                    value="L20660042@matehuala.tecnm.mx"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 uppercase">Cambiar contraseña</p>
                  <input
                    type="password"
                    className="w-full border-b-2 border-gray-300 focus:border-[rgb(31,65,155)] outline-none text-gray-800"
                    placeholder="Nueva contraseña"
                  />
                </div>

                {/* Botón Guardar */}
                <div className="flex justify-center mt-6">
                  <button className="bg-[rgb(31,65,155)] text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                    GUARDAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

