import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Importando o Header component
import { getDevelopmentTrailById } from '../services/authService';
import './DevelopmentTrailPage.css';

const DevelopmentTrailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Usuário"}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchTrail = async () => {
      try {
        setLoading(true);
        setError('');

        // Verifica se há token de autenticação
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Você precisa estar autenticado para ver esta trilha. Faça login primeiro.');
          setLoading(false);
          return;
        }

        const data = await getDevelopmentTrailById(id);
        setTrail(data);
      } catch (err) {
        console.error('Erro ao buscar trilha:', err);
        console.error('Detalhes do erro:', {
          message: err.message,
          status: err.status,
          id: id
        });

        // Mensagens de erro mais específicas
        if (err.status === 404 || err.message.includes('404') || err.message.includes('não encontrada')) {
          setError(`Trilha com ID ${id} não encontrada. Verifique se o ID está correto ou se você tem acesso a esta trilha.`);
        } else if (err.status === 401 || err.message.includes('401') || err.message.includes('não autorizado') || err.message.includes('Token')) {
          setError('Você não tem permissão para acessar esta trilha. Faça login novamente.');
        } else if (err.status === 403 || err.message.includes('403')) {
          setError('Acesso negado. Esta trilha pertence a outro usuário.');
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('Erro de conexão com o servidor. Verifique se o backend está rodando em http://localhost:8000');
        } else {
          setError(`Erro ao carregar trilha: ${err.message || 'Erro desconhecido'}. Verifique o console para mais detalhes.`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrail();
    } else {
      setError('ID da trilha não fornecido');
      setLoading(false);
    }
  }, [id]);

  const handleNewForm = () => {
    navigate('/upload');
  };

  const handleExportPDF = () => {
    // TODO: Implementar exportação para PDF
    alert('Funcionalidade de exportar PDF em desenvolvimento');
  };

  const developmentData = trail?.development_trail || {};
  const sprints = developmentData.sprints || [];
  const metadata = developmentData.trail_metadata || {};
  const profileSummary = developmentData.user_profile_summary || {};
  const resources = developmentData.recommended_resources || {};
  const careerTips = developmentData.career_tips || [];

  if (loading) {
    return (
      <div className="trail-container">
        <Header user={user} onLogout={handleLogout} />
        <div className="loading-message">Carregando trilha de desenvolvimento...</div>
      </div>
    );
  }

  if (error || !trail) {
    return (
      <div className="trail-container">
        <Header user={user} onLogout={handleLogout} />
        <div className="trail-content-wrapper">
          <main className="trail-main">
            <div className="trail-card">
              <div className="error-message-container">
                <h2 className="error-title">Erro ao carregar trilha</h2>
                <p className="error-text">{error || 'Trilha não encontrada'}</p>
                <div className="error-actions">
                  <button className="error-btn" onClick={() => navigate('/home')}>
                    Voltar para Home
                  </button>
                  <button className="error-btn secondary" onClick={() => window.location.reload()}>
                    Tentar Novamente
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="trail-container">
      {/* Header component */}
      <Header user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="trail-main">
        <div className="trail-card">
          <div className="trail-card-header">
            <h1 className="trail-title">Plano de Desenvolvimento Personalizado</h1>
            {profileSummary.current_profile && (
              <p className="trail-subtitle">
                {profileSummary.current_profile}
              </p>
            )}
            <div className="trail-meta">
              <div className="meta-badge">
                <span className="meta-icon">🏃</span>
                <span>{metadata.total_sprints || 0} Sprints</span>
              </div>
              <div className="meta-badge">
                <span className="meta-icon">⏱️</span>
                <span>{metadata.total_duration_days || 0} dias totais</span>
              </div>
              {metadata.difficulty_progression && (
                <div className="meta-badge">
                  <span className="meta-icon">📈</span>
                  <span>{metadata.difficulty_progression}</span>
                </div>
              )}
            </div>
          </div>

          <div className="sprints-container">
            {sprints.map((sprint, index) => (
              <div key={index} className="sprint-card">
                <div className="sprint-header">
                  <div className="sprint-icon">🚀</div>
                  <h2 className="sprint-title">Sprint {sprint.sprint_number}: {sprint.title}</h2>
                </div>

                {sprint.sprint_goal && (
                  <p className="sprint-goal"><strong>Objetivo:</strong> {sprint.sprint_goal}</p>
                )}

                {sprint.days && sprint.days.length > 0 && (
                  <div className="sprint-section">
                    <h3 className="content-title">Cronograma (15 Dias):</h3>
                    <div className="days-timeline">
                      {sprint.days.map((dayObj, dayIndex) => (
                        <div key={dayIndex} className={`day-item type-${dayObj.study_type}`}>
                          <div className="day-number">Dia {dayObj.day}</div>
                          <div className="day-content">
                            <strong>{dayObj.topic}</strong>
                            <p>{dayObj.description}</p>
                          </div>
                          <div className="day-badge">
                            {dayObj.study_type === 'theory' ? 'Teoria' :
                              dayObj.study_type === 'practice' ? 'Prática' : 'Revisão'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sprint.practical_exercises && sprint.practical_exercises.length > 0 && (
                  <div className="sprint-section">
                    <h3 className="content-title">Exercícios Práticos:</h3>
                    <div className="exercises-grid">
                      {sprint.practical_exercises.map((ex, exIndex) => (
                        <div key={exIndex} className={`exercise-card diff-${ex.difficulty}`}>
                          <div className="exercise-header">
                            <h4>{ex.title}</h4>
                            <span className="difficulty-badge">{ex.difficulty}</span>
                          </div>
                          <p>{ex.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sprint.revision_project && (
                  <div className="sprint-section">
                    <h3 className="content-title">Projeto de Revisão:</h3>
                    <div className="project-card">
                      <h4>{sprint.revision_project.title}</h4>
                      <p>{sprint.revision_project.description}</p>
                      <div className="project-meta">
                        <span>⏳ {sprint.revision_project.estimated_hours}h estimadas</span>
                        <span>📚 Sprints cobertos: {sprint.revision_project.covers_sprints?.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="trail-actions">
            <button className="export-btn" onClick={handleExportPDF}>
              📄 Exportar Plano em PDF
            </button>
            <button className="new-form-btn" onClick={handleNewForm}>
              + Novo Formulário
            </button>
          </div>

          <p className="trail-footer-text">
            Baixe seu plano personalizado para acompanhar offline
          </p>
        </div>
      </main>
    </div>
  );
};

export default DevelopmentTrailPage;