// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Ayuda from "./pages/Ayuda";
import Register from "./pages/Registro";
import Alumno from "./pages/Alumno";
import DivisionEstudios from "./pages/Divicion";
import Asesor from "./pages/Asesor";
import JefeCarreraDashboard from "./pages/JefeCarrera";
import DocenteDashboard from "./pages/Docente";
import GTIVDashboard from "./pages/GTIV";
import PrivateRoute from "./components/PrivateRoute";
import Register1 from "./pages/Registro1";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/registro1" element={<Register1 />} />

        {/* Rutas protegidas */}
        <Route
          path="/alumno"
          element={
            <PrivateRoute role="ALUMNO">
              <Alumno />
            </PrivateRoute>
          }
        />
        <Route
          path="/division"
          element={
            <PrivateRoute role="DIVICION">
              <DivisionEstudios />
            </PrivateRoute>
          }
        />
        <Route
          path="/asesor"
          element={
            <PrivateRoute role="ASESOR">
              <Asesor />
            </PrivateRoute>
          }
        />
        <Route
          path="/jefecarrera"
          element={
            <PrivateRoute role="JEFECARRERA">
              <JefeCarreraDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/docente"
          element={
            <PrivateRoute role="DOCENTE">
              <DocenteDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gtiv"
          element={
            <PrivateRoute role="GTIV">
              <GTIVDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
