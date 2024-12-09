import React, { useEffect, useState } from 'react';
import { Button } from "../components/ui/Button";
import { Camera } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    career: '',
    password: ''
  });

  // Simulamos la carga de los datos desde localStorage
  useEffect(() => {
    // Intentamos obtener el usuario de localStorage
    const storedUser = localStorage.getItem('user'); 

    if (storedUser) {
      // Si existen, parseamos el JSON y actualizamos el estado
      const parsedUser = JSON.parse(storedUser); 
      setUser(parsedUser); // Actualizamos el estado con los datos del usuario
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <img src="/image/perfil.png" alt="Imagen de perfil" className="w-32 h-32 rounded-full object-cover" />
        <Button className="absolute bottom-0 right-0 bg-[rgb(31,65,155)] text-white p-2 rounded-full">
          <Camera className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-lg text-gray-800 font-semibold mb-2">{user.name || 'Nombre del estudiante'}</p>
      <p className="text-sm text-gray-600 mb-6">{user.career || 'Carrera del estudiante'}</p>
      <div className="w-full max-w-sm">
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase">Correo</p>
          <input
            type="email"
            className="w-full border-b-2 border-gray-300 focus:border-[rgb(31,65,155)] outline-none text-gray-800"
            value={user.email || 'correo@ejemplo.com'}
            readOnly
          />
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase">Cambiar contraseña</p>
          <input
            type="password"
            className="w-full border-b-2 border-gray-300 focus:border-[rgb(31,65,155)] outline-none text-gray-800"
            value={user.password || '********'}
            readOnly
          />
        </div>
        <Button className="w-full bg-[rgb(31,65,155)] text-white py-3 rounded-md mt-4">Actualizar perfil</Button>
      </div>
    </div>
  );
};

export default Profile;
