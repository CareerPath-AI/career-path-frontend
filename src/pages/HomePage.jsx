import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/div.svg';
import './HomePage.css';
import conversasLogo from '../assets/conversas.svg';
import pdfLogo from '../assets/pdf.svg';
import trilhaLogo from '../assets/trilha.svg';
import balaoLogo from '../assets/balaoDeConversa.svg';
import UserProfile from "../components/UserProfile";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const goToUpload = () => {
    navigate("/upload");
  };

  const goToConfig = () => {
    navigate("/config");
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header className="upload-header">
        <div className="header-left">
          <div className="logo-box-header">
            <img src={logo} alt="Logo" />
          </div>
          <span className="app-name">CareerPathAI</span>
        </div>

        {/* NAVBAR com DROPDOWN */}
        <nav className="header-nav">
          <button className="nav-link">Histórico</button>
          <button className="nav-link" onClick={goToConfig}>Configurações</button>

          {/* <-- AQUI Entrou o componente UserProfile --> */}
          <UserProfile user={user} onLogout={handleLogout} />
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        <div className="welcome-container">
          <div className="welcome-texts">
            <h2>Bem-vinda de volta, {user?.name.split(" ")[0]}</h2>
            <p>Continue sua jornada de desenvolvimento profissional com análises inteligentes.</p>
          </div>

          <button className="welcome-btn" onClick={goToUpload}>
            + Nova Análise de Currículo
          </button>
        </div>

        {/* Top Cards */}
        <section className="top-cards">
          <div className="top-card">
            <img src={conversasLogo} alt="ícone" className="card-icon blue" />
            <p className="card-title">Conversas com IA</p>
            <p className="card-number">12</p>
            <span className="card-subtext">+3 esta semana</span>
          </div>

          <div className="top-card">
            <img src={pdfLogo} alt="ícone" className="card-icon" />
            <p className="card-title">Currículos Analisados</p>
            <p className="card-number">8</p>
            <span className="card-subtext">+2 este mês</span>
          </div>

          <div className="top-card">
            <img src={trilhaLogo} alt="ícone" className="card-icon" />
            <p className="card-title">Trilhas Criadas</p>
            <p className="card-number">5</p>
            <span className="card-subtext">Em andamento</span>
          </div>
        </section>

        {/* Conversas Recentes */}
        <div className="dashboard-grid">

          <section className="box">
            <div className="box-header">
              <div className="box-header-left">
                <img src={balaoLogo} alt="ícone" />
                <h2>Minhas Conversas Recentes</h2>
              </div>

              <button className="see-more">Ver todas</button>
            </div>

            <div className="conversation-item">
              <h3>Desenvolvedor Full Stack</h3>
              <p>Análise completa com trilha focada em React e Node.js</p>
              <span className="time-info">2 semanas atrás</span>
            </div>

            <div className="conversation-item">
              <h3>Analista de Dados</h3>
              <p>Recomendações para certificações em Python e SQL</p>
              <span className="time-info">3 semanas atrás</span>
            </div>

            <div className="conversation-item">
              <h3>UX/UI Designer</h3>
              <p>Sugestões de portfólio e cursos de design thinking</p>
              <span className="time-info">2 meses atrás</span>
            </div>

          </section>

        </div>

      </main>
    </div>
  );
};

export default HomePage;
