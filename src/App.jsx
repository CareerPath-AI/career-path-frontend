import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";
import UploadResumePage from "./pages/UploadResumePage";
import HomePage from "./pages/HomePage";
import HistoricoTrilhasPage from "./pages/HistoricoTrilhasPage";
import HistoricoCurriculosPage from './pages/HistoricoCurriculosPage';
import InterviewGuidePage from './pages/InterviewGuidePage';
import InterviewGuideResultPage from './pages/InterviewGuideResultPage';

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
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/historico-trilhas">Histórico Trilhas</Link></li>
          <li><Link to="/historico-curriculos">Histórico de Currículos</Link></li>
          <li><Link to="/interview-guide">Guia de Entrevista</Link></li>
          <li><Link to="/interview-guide-result">Resposta da Guia de Entrevista</Link></li>
          
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
        <Route path="/historico-trilhas" element={<HistoricoTrilhasPage />} />
        <Route path="/historico-curriculos" element={<HistoricoCurriculosPage />} />
        <Route path="/interview-guide" element={<InterviewGuidePage />} />
        <Route path="/interview-guide-result" element={<InterviewGuideResultPage />} />
      </Routes>
    </div>
  );
}

export default App;