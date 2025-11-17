import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";

function App() {
  return (
    <div>
      {/* DESCOMENTE PARA TESTAR PAGINAS KK */}
      <nav>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/recovery">Recuperar Senha</Link></li>
          <li><Link to="/register">Registrar</Link></li>
          <li><Link to="/reset">Reset</Link></li>

        </ul>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassPage />} />
      </Routes>
    </div>
  );
}

export default App;
