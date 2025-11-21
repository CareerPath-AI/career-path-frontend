import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/div.svg';
import './HomePage.css';
import conversasLogo from '../assets/conversas.svg';
import pdfLogo from '../assets/pdf.svg';
import trilhaLogo from '../assets/trilha.svg';
import balaoLogo from '../assets/balaoDeConversa.svg';

const HomePage = () => {
  const navigate = useNavigate();

  const goToUpload = () => {
    navigate("/upload");  // leva para a rota /upload
  };

  return (
    <div className="dashboard-container">
      
      {/* <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-box">
            <img src={logo} alt="Logo" />
          </div>
          <span className="app-name">CareerPathAI</span>
        </div>

        <nav className="header-nav">
          <button className="nav-link">Histórico</button>
          <button className="nav-link">Configurações</button>

          <div className="user-profile">
            <span className="user-name">Maria Silva</span>
            <div className="user-avatar">MS</div>
            <span className="dropdown-arrow">▼</span>
          </div>
        </nav>
      </header> */}

      {/* Header/Navigation */}
      <header className="upload-header">
        <div className="header-left">
          <div className="logo-box-header">
            <img src={logo} alt="Logo" />
          </div>
          <span className="app-name">CareerPathAI</span>
        </div>
        <nav className="header-nav">
          <button className="nav-link">Histórico</button>
          <button className="nav-link">Configurações</button>
          <div className="user-profile">
            <span className="user-name">Mario Silva</span>
            <div className="user-avatar">MS</div>
            <span className="dropdown-arrow">▼</span>
          </div>
        </nav>
      </header>

      <main className="dashboard-main">

        <div className="welcome-container">
          <div className="welcome-texts">
            <h2>Bem-vinda de volta, Maria</h2>
            <p>Continue sua jornada de desenvolvimento profissional com análises inteligentes.</p>
          </div>

          <button className="welcome-btn" onClick={goToUpload} >+ Nova Análise de Currículo</button>
        </div>


        <section className="top-cards">
          
          <div className="top-card">
            <img src={conversasLogo} alt="ícone de senha" className="card-icon blue" />
            <p className="card-title">Conversas com IA</p>
            <p className="card-number">12</p>
            <span className="card-subtext">+3 esta semana</span>
          </div>

          <div className="top-card">
            <img src={pdfLogo} alt="ícone de senha" className="card-icon" />
            <p className="card-title">Currículos Analisados</p>
            <p className="card-number">8</p>
            <span className="card-subtext">+2 este mês</span>
          </div>

          <div className="top-card">
            <img src={trilhaLogo} alt="ícone de senha" className="card-icon" />
            <p className="card-title">Trilhas Criadas</p>
            <p className="card-number">5</p>
            <span className="card-subtext">Em andamento</span>
          </div>

        </section>

        <div className="dashboard-grid">

          <section className="box">
          <div className="box-header">
            <div className="box-header-left">
              <img src={balaoLogo} alt="ícone de senha" />
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

          {/* <section className="box actions-box">
            <h2>Ações Rápidas</h2>

            <button className="action-button blue-btn">Enviar Currículo</button>
            <button className="action-button gray-btn">Explorar Carreiras</button>
            <button className="action-button purple-btn">Avaliar Perfil</button>
          </section> */}

        </div>

        {/* <section className="box full-width">
          <h2>Minhas Trilhas de Estudo</h2>

          <div className="track">
            <div className="track-header">
              <h3>Desenvolvedor Full Stack</h3>
              <span className="track-status">Em andamento</span>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{ width: '65%' }}></div>
            </div>

            <p className="track-info">18 módulos • 40 horas</p>
          </div>

          <div className="track">
            <div className="track-header">
              <h3>Analista de Dados</h3>
              <span className="track-status green">Concluída</span>
            </div>

            <div className="progress-bar">
              <div className="progress green" style={{ width: '100%' }}></div>
            </div>

            <p className="track-info">20 módulos • 42 horas</p>
          </div>

        </section> */}

        {/* <section className="box full-width">
          <div className="box-header">
            <h2>Currículos Recentes</h2>
            <button className="see-more">Ver todos</button>
          </div>

          <p className="resume-item">currículo_v3.pdf — Enviado há 2 dias</p>
          <p className="resume-item">cv_maria_2024.pdf — Enviado há 1 semana</p>
          <p className="resume-item">resume_updated.pdf — Enviado há 3 semanas</p>
        </section> */}

      </main>
    </div>
  );
};

export default HomePage;
