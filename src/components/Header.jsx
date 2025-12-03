import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/div.svg';
import UserProfile from "../components/UserProfile";

const Header = ({ user, onLogout, onConfig }) => {
  const navigate = useNavigate();

  const goToConfig = () => {
    if (onConfig) {
      onConfig();
    } else {
      navigate("/config");
    }
  };

  const goToHistory = () => {
    navigate("/history");
  };

  return (
    <header className="upload-header">
      <div className="header-left">
        <div className="logo-box-header">
          <img src={logo} alt="Logo" />
        </div>
        <span className="app-name">CareerPathAI</span>
      </div>

      {/* NAVBAR com DROPDOWN */}
      <nav className="header-nav">
        <button className="nav-link" onClick={goToHistory}>Histórico</button>
        <button className="nav-link" onClick={goToConfig}>Configurações</button>

        {/* Componente UserProfile */}
        {user && <UserProfile user={user} onLogout={onLogout} />}
      </nav>
    </header>
  );
};

export default Header;