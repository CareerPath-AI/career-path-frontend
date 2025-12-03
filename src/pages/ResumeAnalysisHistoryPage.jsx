import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/div.svg";
import UserProfile from "../components/UserProfile";
import "./ResumeAnalysisHistoryPage.css";

const ResumeAnalysisHistoryPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Usuário" };

  const [ordenacao, setOrdenacao] = useState("mais-recente");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [analisesFiltradas, setAnalisesFiltradas] = useState([]);
  const itensPorPagina = 4;

  // Mock data de análises de currículo (conversas)
  const analises = [
    { 
      id: "ANL-2024-001", 
      titulo: "Análise: Desenvolvedor Full Stack", 
      cargoAnalisado: "Desenvolvedor Full Stack Senior",
      dataAnalise: "15/11/2024",
      duracaoConversa: "45 min",
      status: "Concluída",
      pontosFortes: ["React", "Node.js", "AWS"],
      recomendacoes: ["Aprofundar em Docker", "Estudar GraphQL"]
    },
    { 
      id: "ANL-2024-002", 
      titulo: "Análise: Analista de Dados", 
      cargoAnalisado: "Analista de Dados Pleno",
      dataAnalise: "08/11/2024",
      duracaoConversa: "32 min",
      status: "Concluída",
      pontosFortes: ["Python", "SQL", "Tableau"],
      recomendacoes: ["Aprender Spark", "Certificação em Power BI"]
    },
    { 
      id: "ANL-2024-003", 
      titulo: "Análise: UX/UI Designer", 
      cargoAnalisado: "UX/UI Designer Senior",
      dataAnalise: "02/11/2024",
      duracaoConversa: "28 min",
      status: "Concluída",
      pontosFortes: ["Figma", "Design Thinking", "Prototipação"],
      recomendacoes: ["Estudar UI Animation", "Aprender React Basics"]
    },
    { 
      id: "ANL-2024-004", 
      titulo: "Análise: DevOps Engineer", 
      cargoAnalisado: "DevOps Engineer Pleno",
      dataAnalise: "28/10/2024",
      duracaoConversa: "50 min",
      status: "Concluída",
      pontosFortes: ["Kubernetes", "Terraform", "CI/CD"],
      recomendacoes: ["Aprender Service Mesh", "Estudar Observabilidade"]
    },
    { 
      id: "ANL-2024-005", 
      titulo: "Análise: Product Manager", 
      cargoAnalisado: "Product Manager",
      dataAnalise: "25/10/2024",
      duracaoConversa: "40 min",
      status: "Concluída",
      pontosFortes: ["Roadmapping", "Stakeholder Management", "Agile"],
      recomendacoes: ["Estudar Métricas de Produto", "Aprender SQL Básico"]
    },
    { 
      id: "ANL-2024-006", 
      titulo: "Análise: Mobile Developer", 
      cargoAnalisado: "Mobile Developer React Native",
      dataAnalise: "20/10/2024",
      duracaoConversa: "35 min",
      status: "Concluída",
      pontosFortes: ["React Native", "TypeScript", "Redux"],
      recomendacoes: ["Aprender Flutter", "Estudar Performance Mobile"]
    },
    { 
      id: "ANL-2024-007", 
      titulo: "Análise: Backend Developer", 
      cargoAnalisado: "Backend Developer Node.js",
      dataAnalise: "15/10/2024",
      duracaoConversa: "38 min",
      status: "Concluída",
      pontosFortes: ["Node.js", "MongoDB", "API Design"],
      recomendacoes: ["Aprender Go", "Estudar Arquitetura Microservices"]
    },
    { 
      id: "ANL-2024-008", 
      titulo: "Análise: Data Scientist", 
      cargoAnalisado: "Data Scientist",
      dataAnalise: "10/10/2024",
      duracaoConversa: "55 min",
      status: "Concluída",
      pontosFortes: ["Machine Learning", "Pandas", "Scikit-learn"],
      recomendacoes: ["Aprofundar em Deep Learning", "Estudar MLOps"]
    },
    { 
      id: "ANL-2024-009", 
      titulo: "Análise: Frontend Developer", 
      cargoAnalisado: "Frontend Developer React",
      dataAnalise: "05/10/2024",
      duracaoConversa: "30 min",
      status: "Concluída",
      pontosFortes: ["React", "TypeScript", "CSS-in-JS"],
      recomendacoes: ["Aprender Next.js", "Estudar Web Performance"]
    },
    { 
      id: "ANL-2024-010", 
      titulo: "Análise: QA Engineer", 
      cargoAnalisado: "QA Engineer Automation",
      dataAnalise: "01/10/2024",
      duracaoConversa: "42 min",
      status: "Concluída",
      pontosFortes: ["Selenium", "Cypress", "Test Strategy"],
      recomendacoes: ["Aprender Performance Testing", "Estudar CI/CD para QA"]
    },
    { 
      id: "ANL-2024-011", 
      titulo: "Análise: Cloud Architect", 
      cargoAnalisado: "Cloud Architect AWS",
      dataAnalise: "28/09/2024",
      duracaoConversa: "60 min",
      status: "Concluída",
      pontosFortes: ["AWS", "Terraform", "Cloud Security"],
      recomendacoes: ["Certificação AWS Solutions Architect", "Aprender GCP"]
    },
    { 
      id: "ANL-2024-012", 
      titulo: "Análise: Cybersecurity Analyst", 
      cargoAnalisado: "Cybersecurity Analyst",
      dataAnalise: "25/09/2024",
      duracaoConversa: "48 min",
      status: "Concluída",
      pontosFortes: ["Network Security", "SIEM", "Incident Response"],
      recomendacoes: ["Estudar Ethical Hacking", "Aprender Cloud Security"]
    },
    { 
      id: "ANL-2024-013", 
      titulo: "Análise: Scrum Master", 
      cargoAnalisado: "Scrum Master",
      dataAnalise: "20/09/2024",
      duracaoConversa: "33 min",
      status: "Concluída",
      pontosFortes: ["Agile Coaching", "Retrospectives", "Team Facilitation"],
      recomendacoes: ["Estudar Kanban", "Aprender Product Discovery"]
    },
    { 
      id: "ANL-2024-014", 
      titulo: "Análise: Business Analyst", 
      cargoAnalisado: "Business Analyst",
      dataAnalise: "15/09/2024",
      duracaoConversa: "37 min",
      status: "Concluída",
      pontosFortes: ["Requirements Gathering", "Process Mapping", "Stakeholder Analysis"],
      recomendacoes: ["Aprender SQL", "Estudar Data Visualization"]
    },
    { 
      id: "ANL-2024-015", 
      titulo: "Análise: Software Architect", 
      cargoAnalisado: "Software Architect",
      dataAnalise: "10/09/2024",
      duracaoConversa: "52 min",
      status: "Concluída",
      pontosFortes: ["System Design", "Design Patterns", "Scalability"],
      recomendacoes: ["Estudar Domain-Driven Design", "Aprender Event-Driven Architecture"]
    },
    { 
      id: "ANL-2024-016", 
      titulo: "Análise: AI Engineer", 
      cargoAnalisado: "AI Engineer",
      dataAnalise: "05/09/2024",
      duracaoConversa: "47 min",
      status: "Concluída",
      pontosFortes: ["TensorFlow", "PyTorch", "NLP"],
      recomendacoes: ["Aprender MLOps", "Estudar Reinforcement Learning"]
    }
  ];

  const ordenarAnalises = (lista, criterio) => {
    let t = [...lista];
    const parseDate = d => new Date(d.split("/").reverse().join("-"));

    if (criterio === "mais-recente") return t.sort((a, b) => parseDate(b.dataAnalise) - parseDate(a.dataAnalise));
    if (criterio === "mais-antigo") return t.sort((a, b) => parseDate(a.dataAnalise) - parseDate(b.dataAnalise));
    return t;
  };

  useEffect(() => {
    setAnalisesFiltradas(ordenarAnalises(analises, ordenacao));
    setPaginaAtual(1);
  }, [ordenacao]);

  const indexUltimo = paginaAtual * itensPorPagina;
  const analisesPaginaAtual = analisesFiltradas.slice(indexUltimo - itensPorPagina, indexUltimo);
  const totalPaginas = Math.ceil(analisesFiltradas.length / itensPorPagina);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleVerAnalise = (analise) => {
    // Navegar para a tela de resposta da análise
    navigate("/resume-analysis-result", { 
      state: { 
        analiseData: analise
      } 
    });
  };

  return (
    <div className="resume-analysis-container">
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
          <UserProfile user={user} onLogout={handleLogout} />
        </nav>
      </header>

      <main className="resume-analysis-main">
        <div className="header-section">
          <h1 className="title-page">Histórico de Análises de Currículo</h1>
          <p className="page-description">
            Revise suas conversas anteriores com nossa IA sobre análises de currículo e feedback recebido.
          </p>
        </div>

        <div className="content-container">
          <div className="filter-bar">
            <div className="contador">
              Exibindo {analisesPaginaAtual.length} de {analisesFiltradas.length} análises
            </div>

            <div className="select-wrapper">
              <label>Ordenar por:</label>
              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="mais-recente">Mais recente</option>
                <option value="mais-antigo">Mais antigo</option>
              </select>
            </div>
          </div>

          <div className="analises-list">
            {analisesPaginaAtual.map((analise, index) => (
              <div className="analise-card" key={analise.id}>
                <div className="analise-info">
                  <div className="analise-icon">💬</div>
                  <div className="analise-details">
                    <h3 className="analise-title">{analise.titulo}</h3>
                    <div className="analise-meta">
                      <span className="analise-cargo"><strong>Cargo:</strong> {analise.cargoAnalisado}</span>
                      <span className="analise-date">• {analise.dataAnalise}</span>
                      <span className="analise-duration">• {analise.duracaoConversa}</span>
                      <span className="analise-status">• {analise.status}</span>
                    </div>
                    <div className="analise-tags">
                      <div className="tags-section">
                        <span className="tags-label">Pontos Fortes:</span>
                        <div className="tags-container">
                          {analise.pontosFortes.slice(0, 3).map((ponto, idx) => (
                            <span key={idx} className="tag tag-green">{ponto}</span>
                          ))}
                        </div>
                      </div>
                      <div className="tags-section">
                        <span className="tags-label">Recomendações:</span>
                        <div className="tags-container">
                          {analise.recomendacoes.slice(0, 2).map((recomendacao, idx) => (
                            <span key={idx} className="tag tag-blue">{recomendacao}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="analise-actions">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => handleVerAnalise(analise)}
                  >
                    Ver Análise Completa
                  </button>
                </div>
                {index < analisesPaginaAtual.length - 1 && <div className="divider" />}
              </div>
            ))}
          </div>

          <div className="pagination-section">
            <div className="pagination-info">
              Página {paginaAtual} de {totalPaginas}
            </div>
            <div className="pagination">
              <button 
                className="pagination-btn" 
                disabled={paginaAtual === 1} 
                onClick={() => setPaginaAtual(paginaAtual - 1)}
              >
                Anterior
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPaginas)].map((_, i) => (
                  <button
                    key={i}
                    className={`pagination-btn ${paginaAtual === i + 1 ? "active" : ""}`}
                    onClick={() => setPaginaAtual(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                className="pagination-btn" 
                disabled={paginaAtual === totalPaginas} 
                onClick={() => setPaginaAtual(paginaAtual + 1)}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysisHistoryPage;