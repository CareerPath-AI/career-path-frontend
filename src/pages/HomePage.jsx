// HomePage.jsx - CORRIGIDO
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

  const goToHistoricoCurriculos = () => {
    navigate("/historico-curriculos");
  };

  const goToHistoricoTrilhas = () => {
    navigate("/historico-trilhas");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="upload-header">
        <div 
          className="header-left" 
          onClick={() => navigate("/home")} 
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-box-header">
            <img src={logo} alt="Logo" />
          </div>
          <span className="app-name">CareerPathAI</span>
        </div>

        {/* NAVBAR com DROPDOWN - HISTÓRICO AGORA É DE TRILHAS */}
        <nav className="header-nav">
          <button className="nav-link" onClick={goToHistoricoTrilhas}>Histórico</button>
          <button className="nav-link">Configurações</button>
          <UserProfile user={user} onLogout={handleLogout} />
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="welcome-container">
          <div className="welcome-texts">
            <h2>Bem-vinda de volta, {user?.name.split(" ")[0]}!</h2>
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

        {/* Grid Principal */}
        <div className="dashboard-grid">
          {/* Coluna Esquerda */}
          <div className="left-column">
            {/* Meus guias de entrevistas */}
            <section className="box">
              <div className="box-header">
                <div className="box-header-left">
                  <img src={balaoLogo} alt="ícone" />
                  <h2>Minhas Conversas Recentes</h2>
                </div>
                <button className="see-more">Ver todas</button>
              </div>

              <div className="guide-item">
                <h3>Desenvolvedor Full Stack</h3>
                <p>Análise completa com trilha de estudos focada em React e Node.js</p>
                <span className="time-info">2 dias atrás</span>
              </div>

              <div className="guide-item">
                <h3>Analista de Dados</h3>
                <p>Recomendações para certificações em Python e SQL</p>
                <span className="time-info">1 semana atrás</span>
              </div>

              <div className="guide-item">
                <h3>UX/UI Designer</h3>
                <p>Sugestões de portfólio e cursos de design thinking</p>
                <span className="time-info">2 semanas atrás</span>
              </div>
            </section>

            {/* Minhas Trilhas de Estudo */}
            <section className="box full-width">
              <div className="box-header">
                <div className="box-header-left">
                  <h2>Minhas Trilhas de Estudo</h2>
                </div>
                <button className="see-more" onClick={goToHistoricoTrilhas}>Ver todas</button>
              </div>

              <div className="track">
                <div className="track-header">
                  <h3>Desenvolvedor Full Stack</h3>
                  <span className="track-status">Em andamento</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{width: '65%'}}></div>
                </div>
                <div className="track-info">
                  Progresso: 65% | 45 horas
                </div>
              </div>

              <div className="track">
                <div className="track-header">
                  <h3>Análise de Dados</h3>
                  <span className="track-status green">Concluída</span>
                </div>
                <div className="progress-bar">
                  <div className="progress green" style={{width: '100%'}}></div>
                </div>
                <div className="track-info">
                  Progresso: 100% | 60 horas
                </div>
              </div>
            </section>
          </div>

          {/* Coluna Direita */}
          <div className="right-column">
            {/* Ações Rápidas */}
            <section className="box">
              <div className="box-header">
                <h2>Ações Rápidas</h2>
              </div>
              <div className="actions-box">
                <button className="action-button blue-btn" onClick={goToUpload}>
                  Enviar Currículo
                </button>
                <button className="action-button gray-btn" onClick={() => navigate("/interview-guide")}>
                  Guia de entrevista
                </button>
                <button className="action-button purple-btn">
                  Criar trilha de estudo
                </button>
              </div>
            </section>

            {/* Currículos Recentes - ÚNICO ACESSO AO HISTÓRICO DE CURRÍCULOS */}
            <section className="box">
              <div className="box-header">
                <h2>Currículos Recentes</h2>
                <button className="see-more" onClick={goToHistoricoCurriculos}>
                  Ver todas
                </button>
              </div>
              
              {/* Currículos clicáveis */}
              <div className="resume-item clickable" onClick={goToHistoricoCurriculos}>
                <strong>Currículo_v3.pdf</strong>
                <div className="time-info">Enviado há 2 dias</div>
              </div>
              <div className="resume-item clickable" onClick={goToHistoricoCurriculos}>
                <strong>cv_maria_2024.pdf</strong>
                <div className="time-info">Enviado há 1 semana</div>
              </div>
              <div className="resume-item clickable" onClick={goToHistoricoCurriculos}>
                <strong>resume_updated.pdf</strong>
                <div className="time-info">Enviado há 2 semanas</div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;