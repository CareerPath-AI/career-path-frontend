import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";
import UploadResumePage from "./pages/UploadResumePage";
import HomePage from "./pages/HomePage";
import DevelopmentTrailPage from "./pages/DevelopmentTrailPage";

function App() {
  return (
    <div>
      {/* DESCOMENTE PARA TESTAR PAGINAS KK */}
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/recovery">Recuperar Senha</Link></li>
          <li><Link to="/register">Registrar</Link></li>
          <li><Link to="/reset">Reset</Link></li>
          <li><Link to="/upload">upload</Link></li>
          <li><Link to="/home">home</Link></li>
          <li><Link to="/trail/1">Trilha</Link></li>
        </ul>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassPage />} />
        <Route path="/upload" element={<UploadResumePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/trail/:id" element={<DevelopmentTrailPage />} />
      </Routes>
    </div>
  );
}

export default App;
