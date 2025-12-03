import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'; // Importando o Header component
import './InterviewGuideResultPage.css';

const InterviewGuideResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle = 'Desenvolvedor Frontend', company = 'TechCorp Solutions', suggestions = [] } = location.state || {};
  
  // Recuperar usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Mario Silva"}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleNewGuide = () => {
    navigate('/interview-guide');
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="interview-result-container">
      {/* Header component */}
      <Header user={user} onLogout={handleLogout} />

      <main className="interview-result-main">
        <div className="interview-result-card">
          <div className="interview-result-header">
            <h1 className="interview-result-title">Guia de Entrevista para {jobTitle}</h1>
            <p className="interview-result-subtitle">{company}</p>
          </div>

          <div className="interview-result-content">
            <h2 className="suggestions-title">Sugestões para sua preparação:</h2>
            
            <div className="suggestions-list">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    <div className="bullet-point">•</div>
                    <div className="suggestion-text">{suggestion}</div>
                  </div>
                ))
              ) : (
                <div className="suggestion-item">
                  <div className="bullet-point">•</div>
                  <div className="suggestion-text">Revise suas habilidades técnicas em React</div>
                </div>
              )}
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