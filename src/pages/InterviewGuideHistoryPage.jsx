import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InterviewGuideHistoryPage.css';
import logo from '../assets/div.svg';
import UserProfile from '../components/UserProfile';

const InterviewGuideHistoryPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Dados mockados para guias de entrevista
  const mockGuides = [
    {
      id: 1,
      title: "Desenvolvedor Front-End Júnior",
      date: "15/01/2025",
      description: "Guia completo para entrevista técnica e comportamental",
      status: "completo"
    },
    {
      id: 2,
      title: "Analista de Marketing Digital",
      date: "10/01/2025",
      description: "Perguntas estratégicas para avaliar expertise em marketing",
      status: "completo"
    },
    {
      id: 3,
      title: "Engenheiro de Dados Sênior",
      date: "05/01/2025",
      description: "Avaliação técnica profunda em arquitetura de dados",
      status: "completo"
    },
    {
      id: 4,
      title: "Designer UX/UI Pleno",
      date: "28/12/2024",
      description: "Perguntas focadas em processo criativo e experiência do usuário",
      status: "completo"
    },
    {
      id: 5,
      title: "Gerente de Projetos",
      date: "20/12/2024",
      description: "Avaliação de liderança e gestão de equipes",
      status: "completo"
    },
    {
      id: 6,
      title: "Desenvolvedor Full Stack",
      date: "18/12/2024",
      description: "Entrevista técnica com foco em React e Node.js",
      status: "completo"
    }
  ];

  const handleBack = () => {
    navigate('/home');
  };

  const handleViewGuide = (guideId) => {
    navigate(`/interview-guide-result?id=${guideId}`);
  };

  const handleCreateNewGuide = () => {
    navigate('/interview-guide');
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* Header - MESMO DA HOME PAGE */}
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

        {/* NAVBAR - Mesmo da HomePage */}
        <nav className="header-nav">
          <UserProfile user={user} onLogout={handleLogout} />
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="welcome-container">
          <div className="welcome-texts">
            <h2>Histórico de Guias de Entrevista</h2>
            <p>Acesse todos os guias de entrevista criados anteriormente</p>
          </div>
          <button className="welcome-btn" onClick={handleCreateNewGuide}>
            Criar Novo Guia
          </button>
        </div>

        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
          <section className="box">
            <div className="box-header">
              <h2>Seus Guias de Entrevista ({mockGuides.length})</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Ordenar por:</span>
                <select 
                  style={{ 
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                >
                  <option>Mais recente</option>
                  <option>Mais antigo</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            {mockGuides.map((guide) => (
              <div 
                key={guide.id} 
                className="guide-item" 
                style={{ 
                  cursor: 'pointer',
                  padding: '20px',
                  margin: '0 -24px',
                  transition: 'background-color 0.2s ease'
                }} 
                onClick={() => handleViewGuide(guide.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>{guide.title}</h3>
                    <p style={{ color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                      {guide.description}
                    </p>
                    <span className="time-info">Criado em: {guide.date}</span>
                  </div>
                  <button 
                    className="see-more"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewGuide(guide.id);
                    }}
                    style={{ 
                      background: '#f0f7ff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }}
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '30px',
          gap: '20px'
        }}>
          <button 
            onClick={handleBack}
            style={{
              padding: '12px 24px',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              color: '#374151',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Voltar para Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default InterviewGuideHistoryPage;