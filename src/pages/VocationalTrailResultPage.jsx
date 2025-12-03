// VocationalTrailResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Importando o Header component
import './VocationalTrailResultPage.css';

const VocationalTrailResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trailData, setTrailData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Recuperar usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "Usuário"}');

  // Dados do formulário (vindo da página anterior) - MOCKADO
  const formData = location.state?.formData || {
    name: 'Maria Silva',
    professional_goal: 'Desenvolvedor Full Stack',
    interested_technologies: 'React, Node.js, TypeScript',
    skills: 'JavaScript, HTML, CSS',
    available_time_week: '10-20 horas',
    current_level: 'Intermediário',
    goal_timeframe: '6 meses'
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Mock de dados da trilha gerada
  const mockTrailData = {
    id: `trail_${Date.now()}`,
    title: `Trilha de ${formData.professional_goal || 'Desenvolvimento Full Stack'}`,
    created_at: new Date().toISOString(),
    weeks: [
      {
        weekNumber: 1,
        title: "Fundamentos do Desenvolvimento Web",
        focus: "Conceitos básicos e ambientação",
        topics: [
          "HTML5 e Semântica",
          "CSS3 e Flexbox",
          "JavaScript Básico",
          "Git e Controle de Versão"
        ],
        activities: [
          "Criar uma página HTML semântica",
          "Estilizar com CSS Flexbox",
          "Implementar funcionalidades básicas em JavaScript",
          "Criar conta no GitHub e primeiro repositório"
        ],
        resources: ["MDN Web Docs", "FreeCodeCamp", "GitHub Learning Lab"],
        estimatedHours: 20
      },
      {
        weekNumber: 2,
        title: "JavaScript Moderno e React Básico",
        focus: "ES6+ e introdução ao React",
        topics: [
          "ES6+ Features (Arrow functions, Destructuring)",
          "Async/Await e Promises",
          "Componentes React",
          "Props e State"
        ],
        activities: [
          "Converter código para ES6+",
          "Consumir API com async/await",
          "Criar componentes React básicos",
          "Gerenciar estado local"
        ],
        resources: ["React Docs", "JavaScript.info", "Codecademy"],
        estimatedHours: 25
      },
      {
        weekNumber: 3,
        title: "React Avançado e Hooks",
        focus: "Estado global e ciclo de vida",
        topics: [
          "React Hooks (useState, useEffect, useContext)",
          "React Router",
          "Context API",
          "Custom Hooks"
        ],
        activities: [
          "Criar aplicação com múltiplas rotas",
          "Implementar Context API para estado global",
          "Desenvolver custom hooks",
          "Projeto: To-Do List com persistência"
        ],
        resources: ["React Beta Docs", "Epic React", "Frontend Masters"],
        estimatedHours: 30
      },
      {
        weekNumber: 4,
        title: "Backend com Node.js e Express",
        focus: "Fundamentos do servidor e API",
        topics: [
          "Node.js Básico",
          "Express.js",
          "REST API Design",
          "Middlewares"
        ],
        activities: [
          "Configurar servidor Express",
          "Criar endpoints REST",
          "Implementar middlewares",
          "Conectar com banco de dados"
        ],
        resources: ["Node.js Docs", "Express Guide", "REST API Tutorial"],
        estimatedHours: 25
      },
      {
        weekNumber: 5,
        title: "Banco de Dados e Autenticação",
        focus: "Persistência e segurança",
        topics: [
          "MongoDB ou PostgreSQL",
          "ORM/ODM (Mongoose ou Sequelize)",
          "JWT Authentication",
          "Password Hashing"
        ],
        activities: [
          "Modelar banco de dados",
          "Implementar CRUD completo",
          "Sistema de autenticação JWT",
          "Projeto: API com autenticação"
        ],
        resources: ["MongoDB University", "JWT.io", "OWASP Guidelines"],
        estimatedHours: 28
      },
      {
        weekNumber: 6,
        title: "Projeto Final e Deploy",
        focus: "Aplicação completa e deploy",
        topics: [
          "Full Stack Application",
          "Testing (Jest, React Testing Library)",
          "Deploy no Vercel/Railway",
          "CI/CD Básico"
        ],
        activities: [
          "Desenvolver aplicação completa",
          "Escrever testes unitários",
          "Configurar ambiente de produção",
          "Deploy e monitoramento"
        ],
        resources: ["Vercel Docs", "Testing Library", "GitHub Actions"],
        estimatedHours: 35
      }
    ],
    summary: {
      totalHours: 163,
      difficulty: formData.current_level || 'Intermediário',
      timeframe: formData.goal_timeframe || '6 meses',
      estimatedCompletion: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      requiredTechnologies: ["React", "Node.js", "Express", "MongoDB", "Git", "Vercel"],
      certifications: ["React Developer", "Node.js Services Developer"]
    },
    recommendations: [
      "Revise os conceitos diariamente por 30 minutos",
      "Participe de comunidades como Discord de desenvolvedores",
      "Crie um portfólio no GitHub",
      "Faça networking no LinkedIn",
      "Considere freelances para ganhar experiência prática"
    ]
  };

  useEffect(() => {
    // Simular delay de carregamento da API
    const timer = setTimeout(() => {
      setTrailData(mockTrailData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleExportPDF = () => {
    alert('Funcionalidade de exportar PDF em desenvolvimento!');
  };

  const handleNewTrail = () => {
    navigate('/vocational-form');
  };

  const handleSaveTrail = () => {
    // Salvar no localStorage (simulação)
    const savedTrails = JSON.parse(localStorage.getItem('saved_trails') || '[]');
    savedTrails.push({
      ...trailData,
      saved_at: new Date().toISOString()
    });
    localStorage.setItem('saved_trails', JSON.stringify(savedTrails));
    alert('Trilha salva no seu histórico!');
    navigate('/historico-trilhas');
  };

  const handleShareTrail = () => {
    alert('Compartilhe esta trilha com seus amigos!');
    // Em produção, implementaria compartilhamento via link
  };

  if (loading) {
    return (
      <div className="trail-result-container">
        {/* Header component */}
        <Header user={user} onLogout={handleLogout} />
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Gerando sua trilha personalizada...</h2>
          <p>Analisando suas respostas para criar o melhor plano de estudos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trail-result-container">
      {/* Header component */}
      <Header user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="trail-result-main">
        <div className="trail-result-card">
          {/* Cabeçalho da trilha */}
          <div className="trail-result-header">
            <div className="header-content">
              <h1 className="trail-result-title">
                {trailData.title}
              </h1>
              <p className="trail-result-subtitle">
                Criada especialmente para <strong>{user?.name?.split(' ')[0] || 'você'}</strong> com base no seu perfil
              </p>
              
              <div className="trail-meta-info">
                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <div className="meta-content">
                      <span className="meta-label">Duração Total</span>
                      <span className="meta-value">{trailData.summary.totalHours} horas</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <div className="meta-content">
                      <span className="meta-label">Prazo Estimado</span>
                      <span className="meta-value">{trailData.summary.timeframe}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🎯</span>
                    <div className="meta-content">
                      <span className="meta-label">Nível</span>
                      <span className="meta-value">{trailData.summary.difficulty}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🏆</span>
                    <div className="meta-content">
                      <span className="meta-label">Conclusão</span>
                      <span className="meta-value">{trailData.summary.estimatedCompletion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do perfil */}
          <div className="profile-summary">
            <div className="summary-header">
              <h3>📋 Resumo do Seu Perfil</h3>
              <p>Baseado nas suas respostas ao formulário</p>
            </div>
            <div className="profile-grid">
              <div className="profile-item">
                <span className="profile-label">Objetivo Profissional:</span>
                <span className="profile-value highlight">{formData.professional_goal || 'Não informado'}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Tecnologias de Interesse:</span>
                <span className="profile-value">{formData.interested_technologies || 'Não informado'}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Habilidades Atuais:</span>
                <span className="profile-value">{formData.skills || 'Não informado'}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Tempo Disponível:</span>
                <span className="profile-value">{formData.available_time_week || 'Não informado'}</span>
              </div>
            </div>
          </div>

          {/* Tecnologias e certificações */}
          <div className="tech-cert-section">
            <div className="section-card">
              <h3>🛠️ Tecnologias Requeridas</h3>
              <div className="tech-tags">
                {trailData.summary.requiredTechnologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="section-card">
              <h3>📜 Certificações Sugeridas</h3>
              <div className="cert-list">
                {trailData.summary.certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="cert-icon">✓</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plano semanal detalhado */}
          <div className="weeks-container">
            <div className="section-header">
              <h2>📚 Plano de Estudos Semanal</h2>
              <p>Siga este cronograma passo a passo para alcançar seus objetivos</p>
            </div>
            
            {trailData.weeks.map((week, index) => (
              <div key={index} className="week-card">
                <div className="week-header">
                  <div className="week-number">SEMANA {week.weekNumber}</div>
                  <h3 className="week-title">{week.title}</h3>
                  <div className="week-hours">⏰ {week.estimatedHours} horas</div>
                </div>
                
                <div className="week-focus">
                  <strong>Foco Principal:</strong> {week.focus}
                </div>
                
                <div className="week-content">
                  <div className="content-section">
                    <h4>📖 Tópicos de Estudo</h4>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-section">
                    <h4>🎯 Atividades Práticas</h4>
                    <ul>
                      {week.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-section">
                    <h4>🔗 Recursos Recomendados</h4>
                    <ul>
                      {week.resources.map((resource, idx) => (
                        <li key={idx}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recomendações finais */}
          <div className="recommendations-section">
            <h3>💡 Recomendações Importantes</h3>
            <div className="recommendations-list">
              {trailData.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <span className="rec-number">{index + 1}</span>
                  <span className="rec-text">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="trail-actions">
            <button className="action-btn primary-btn" onClick={handleSaveTrail}>
              💾 Salvar esta Trilha
            </button>
            <button className="action-btn secondary-btn" onClick={handleExportPDF}>
              📄 Exportar como PDF
            </button>
            <button className="action-btn share-btn" onClick={handleShareTrail}>
              🔗 Compartilhar
            </button>
            <button className="action-btn outline-btn" onClick={handleNewTrail}>
              ✏️ Criar Nova Trilha
            </button>
          </div>

          <div className="trail-footer">
            <div className="footer-note">
              <p className="footer-text">
                <strong>✨ Dica Pro:</strong> Mantenha um diário de estudos para acompanhar seu progresso. 
                Revise este plano a cada 2 semanas e ajuste conforme sua evolução.
              </p>
              <p className="footer-subtext">
                Esta trilha é uma sugestão personalizada - adapte-a às suas necessidades e ritmo de aprendizado!
              </p>
            </div>
            <div className="footer-links">
              <button className="back-link" onClick={() => navigate('/home')}>
                ← Voltar para o Dashboard
              </button>
              <button className="history-link" onClick={() => navigate('/historico-trilhas')}>
                📚 Ver Todas as Trilhas
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VocationalTrailResultPage;