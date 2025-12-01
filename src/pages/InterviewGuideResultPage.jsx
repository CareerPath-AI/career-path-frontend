import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/div.svg';
import './InterviewGuideResultPage.css';

const InterviewGuideResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle = 'Desenvolvedor Frontend', company = 'TechCorp Solutions', suggestions = [] } = location.state || {};

  const handleNewGuide = () => {
    navigate('/interview-guide');
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="interview-result-container">
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

      <main className="interview-result-main">
        <div className="interview-result-card">
          <div className="interview-result-header">
            <h1 className="interview-result-title">Guia de Entrevista para {jobTitle}</h1>
            <p className="interview-result-subtitle">{company}</p>
          </div>

          <div className="interview-result-content">
            <h2 className="suggestions-title">Sugestões para sua preparação:</h2>
            
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <div className="bullet-point">•</div>
                  <div className="suggestion-text">{suggestion}</div>
                </div>
              ))}
            </div>

            <div className="button-group">
              <button
                type="button"
                className="new-guide-button"
                onClick={handleNewGuide}
              >
                + Iniciar Novo Guia
              </button>
              <button
                type="button"
                className="back-home-button"
                onClick={handleBackToHome}
              >
                Voltar à Tela Inicial
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewGuideResultPage;