import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";
import UploadResumePage from "./pages/UploadResumePage";
import HomePage from "./pages/HomePage";
import DevelopmentTrailPage from "./pages/DevelopmentTrailPage";
import ConfigPage from "./pages/ConfigPage";
import ExcludePage from "./pages/ExcludePage";
import StudyTrailHistoryPage from "./pages/StudyTrailHistoryPage";
import ResumeAnalysisHistoryPage from './pages/ResumeAnalysisHistoryPage';
import InterviewGuidePage from './pages/InterviewGuidePage';
import InterviewGuideResultPage from './pages/InterviewGuideResultPage';
import VocationalFormPage from './pages/VocationalFormPage';
import VocationalTrailResultPage from './pages/VocationalTrailResultPage';
import InterviewGuideHistoryPage from './pages/InterviewGuideHistoryPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';

function App() {
  return (
    <div>
      {/* Rotas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassPage />} />
        <Route path="/upload" element={<UploadResumePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/trail/:id" element={<DevelopmentTrailPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/exclude" element={<ExcludePage />} />
        <Route path="/historico-trilhas" element={<StudyTrailHistoryPage />} />
        <Route path="/historico-curriculos" element={<ResumeAnalysisHistoryPage />} />
        <Route path="/historico-guias" element={<InterviewGuideHistoryPage />} />
        <Route path="/analise-curriculo" element={<ResumeAnalysisPage />} />
        <Route path="/analise-curriculo/:id" element={<ResumeAnalysisPage />} />
        <Route path="/interview-guide" element={<InterviewGuidePage />} />
        <Route path="/interview-guide-result/:id" element={<InterviewGuideResultPage />} />
        <Route path="/vocational-form" element={<VocationalFormPage />} />
        <Route path="/vocational-form-response" element={<VocationalTrailResultPage />} />
      </Routes>
    </div>
  );
}

export default App;