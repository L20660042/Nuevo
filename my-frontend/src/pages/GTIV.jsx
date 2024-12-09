import React, { useState } from 'react';
import { User, Briefcase, Folder, Upload, Camera, Menu, X } from 'lucide-react';
import { Button } from "../components/ui/Button";

export default function GTIVDashboard() {
  const [view, setView] = useState('empresas'); // Estado para controlar la vista actual (Empresas, Proyectos, Perfil)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  // Lista de empresas asociadas
  const empresas = [
    {
      name: 'TechSolutions',
      contact: 'Carlos López',
      description: 'Empresa dedicada al desarrollo de software y soluciones tecnológicas.',
      status: 'Activo',
      proyectos: [
        {
          name: 'Sistema de Gestión',
          description: 'Optimiza el control de stock y mejora la eficiencia operativa.',
          student: 'Juan Pérez',
          career: 'Ingeniería en Sistemas',
          status: 'En desarrollo',
          image: '/images/proyecto1.jpg', // Imagen de vista previa
        },
        {
          name: 'Aplicación Móvil',
          description: 'Desarrollo de una app para mejorar la productividad.',
          student: 'María González',
          career: 'Ingeniería en Sistemas',
          status: 'En pruebas',
          image: '/images/proyecto2.jpg', // Imagen de vista previa
        },
      ],
    },
    {
      name: 'AppDev',
      contact: 'Ana Martínez',
      description: 'Desarrollo de aplicaciones móviles para mejorar la productividad.',
      status: 'Inactivo',
      proyectos: [],
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
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('empresas')}>
            <Briefcase className="w-5 h-5" />
            <span>Empresas Asociadas</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-white/10" onClick={() => setView('proyectos')}>
            <Folder className="w-5 h-5" />
            <span>Proyectos Asociados</span>
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
                {view === 'perfil' ? 'Perfil del Coordinador' : view === 'empresas' ? 'Empresas Asociadas' : 'Proyectos Asociados'}
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
                <p className="text-lg text-gray-800 font-semibold mb-2">Coordinador GTIV</p>

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
            ) : view === 'empresas' ? (
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
            ) : (
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
                      <p className="text-sm text-gray-600">{proyecto.student} - {proyecto.career}</p>
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
    </div>
  );
}
