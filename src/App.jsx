import { Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";
import UploadResumePage from "./pages/UploadResumePage";

function App() {
  return (
    <div>
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassPage />} />
        <Route path="/upload" element={<UploadResumePage />} />
      </Routes>
    </div>
  );
}

export default App;
