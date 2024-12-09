import React, { useState } from 'react';
import { User, FolderKanban, Upload, Camera, Menu, X, CheckCircle, Circle } from 'lucide-react';
import { Button } from "../components/ui/Button";

export default function AsesorDashboard() {
  const [view, setView] = useState('proyectos'); // Estado para controlar la vista actual (Proyectos, Estudiantes, Perfil)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  // Lista de proyectos con las etapas y su estado
  const proyectosResidencias = [
    {
      name: 'Sistema de Gestión',
      company: 'TechSolutions',
      description: 'Optimiza el control de stock y mejora la eficiencia operativa.',
      image: '/placeholder.svg?height=200&width=300',
      student: 'Juan Pérez',
      career: 'Ingeniería en Sistemas',
      stages: [
        { name: 'Propuesta', completed: true },
        { name: 'Revisión', completed: true },
        { name: 'Desarrollo', completed: true },
        { name: 'Pruebas', completed: false },
        { name: 'Entrega', completed: false },
      ],
    },
    {
      name: 'Aplicación Móvil',
      company: 'AppDev',
      description: 'Desarrollo de una app para mejorar la productividad.',
      image: '/placeholder.svg?height=200&width=300',
      student: 'María González',
      career: 'Ingeniería en Sistemas',
      stages: [
        { name: 'Propuesta', completed: true },
        { name: 'Revisión', completed: true },
        { name: 'Desarrollo', completed: true },
        { name: 'Pruebas', completed: true },
        { name: 'Entrega', completed: false },
      ],
    },
  ];

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

          {/* Menú de hamburguesa para dispositivos móviles */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`md:w-64 bg-[rgb(31,65,155)] text-white p-5 border-r-2 border-white/20 fixed top-16 left-0 bottom-0 ${isMenuOpen ? 'block' : 'hidden'} md:block shadow-md z-40`}>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('perfil')}>
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('proyectos')}>
            <FolderKanban className="w-5 h-5" />
            <span>Proyectos de estudiantes</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('estudiantes')}>
            <FolderKanban className="w-5 h-5" />
            <span>Estudiantes</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('perfil')}>
            <Upload className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-0 md:pl-64 pt-20">
        <div className="overflow-y-auto flex-1">
          <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[rgb(31,65,155)]">
                {view === 'perfil' ? 'Perfil del Asesor' : view === 'proyectos' ? 'Proyectos de Estudiantes' : 'Estudiantes'}
              </h2>
            </div>

            {view === 'perfil' ? (
              <div className="flex flex-col items-center text-center">
              {/* Imagen de perfil y botón para cambiar */}
              <div className="relative mb-4">
                <img 
                  src="/image/perfil.png"  // Imagen de perfil actualizada
                  alt="Imagen de perfil" 
                  className="w-32 h-32 rounded-full object-cover" 
                />
                <Button className="absolute bottom-0 right-0 bg-[rgb(31,65,155)] text-white p-2 rounded-full">
                  <Camera className="w-5 h-5" />
                </Button>
              </div>

              {/* Información de perfil */}
              <p className="text-lg text-gray-800 font-semibold mb-2">Asesor de Residencias</p>

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
                    readOnly
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
            ) : view === 'proyectos' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {proyectosResidencias.map((project, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <img 
                      src={project.image} 
                      alt="Imagen de proyecto" 
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)] mt-4">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.company}</p>
                    <p className="text-xs text-gray-500 mt-2">{project.description}</p>
                    <p className="text-sm text-gray-700 mt-2">{project.student} - {project.career}</p>

                    <div className="flex flex-row items-center space-x-6 mb-4">
                      {project.stages.map((stage, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-600">{`Etapa ${idx + 1}`}</span>
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full border mt-2 ${
                                stage.completed
                                  ? 'bg-[rgb(31,65,155)] border-[rgb(31,65,155)]'
                                  : 'bg-gray-200 border-gray-200'
                              }`}
                            >
                              {stage.completed ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex space-x-4 mt-4">
                      <Button variant="outline" className="rounded-md text-[rgb(31,65,155)] border-gray-300 hover:border-[rgb(31,65,155)]">
                        Ver detalles
                      </Button>
                      <Button variant="outline" className="rounded-md text-[rgb(31,65,155)] border-gray-300 hover:border-[rgb(31,65,155)]">
                        Contactar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {proyectosResidencias.map((project, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-[rgb(31,65,155)]">{project.student}</h3>
                    <p className="text-sm text-gray-600">{project.career}</p>
                    <p className="text-xs text-gray-500 mt-2">{project.name}</p>
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
