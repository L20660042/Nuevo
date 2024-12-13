import React, { useState, useEffect } from "react";
import { Mail, Key, User, Lock, UserPlus } from "lucide-react";
import axios from "axios"; // Si usas axios


export default function RegisterUser({ onBack }) {
  const [numeroControl, setNumeroControl] = useState(""); // Número de control
  const [password, setPassword] = useState(""); // Contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmar contraseña
  const [fullName, setFullName] = useState(""); // Nombre completo
  const [email, setEmail] = useState(""); // Correo electrónico
  const [role, setRole] = useState(""); // Rol del usuario
  const [error, setError] = useState(""); // Mensajes de error
  const [loading, setLoading] = useState(false); // Estado de carga

  // Actualizar correo electrónico dinámicamente cuando cambia el número de control
  useEffect(() => {
    if (numeroControl.length > 0) {
      setEmail(`L${numeroControl}@matehuala.tecnm.mx`);
    } else {
      setEmail(""); // Limpiar el correo si el número de control está vacío
    }
  }, [numeroControl]);

  const handleNumeroControlChange = (e) => {
    const numControl = e.target.value;
    if (/^\d*$/.test(numControl)) {
      setNumeroControl(numControl);
    }
  };

  // Validar si las contraseñas coinciden
  const validatePasswords = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError(""); // Limpiar errores previos

    try {
      // Realizar la llamada al backend para registrar el usuario
      const response = await axios.post("http://localhost:3000/users/register", {
        email,
        password,
        fullName,
        role, // El rol seleccionado por el usuario
      });

      if (response.status === 201) {
        alert("Usuario registrado exitosamente");
        onBack(); // Regresar a la vista anterior
      }
    } catch (err) {
      setError("Error al registrar el usuario: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crear Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Número de control"
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={numeroControl}
              onChange={handleNumeroControlChange}
              required
              maxLength={8} // Limitar a 8 caracteres
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              disabled
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ALUMNO">Alumno</option>
              <option value="DIVISION">División</option>
              <option value="ASESOR">Asesor</option>
              <option value="JEFECARRERA">Jefe de Carrera</option>
              <option value="DOCENTE">Docente</option>
              <option value="GTIV">GTIV</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div className="text-red-500 text-center">{error && <p>{error}</p>}</div>

          <div className="space-y-2">
            <button
              type="submit"
              className={`w-full py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
            <button
              type="button"
              className="w-full py-2 rounded-full bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 focus:outline-none"
              onClick={onBack}
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
