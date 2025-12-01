// HistoricoCurriculosPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/div.svg";
import UserProfile from "../components/UserProfile";
import "./HistoricoCurriculosPage.css";

const HistoricoCurriculosPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Usuário" };

  const [ordenacao, setOrdenacao] = useState("mais-recente");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [curriculosFiltrados, setCurriculosFiltrados] = useState([]);
  const itensPorPagina = 4;

  // Mock data baseado na imagem
  const curriculos = [
    { 
      id: "CV-2024-001", 
      nome: "curriculo_final_2024.pdf", 
      dataEnvio: "15/11/2024",
      tamanho: "2.4 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-002", 
      nome: "cv_desenvolvedor_senior.pdf", 
      dataEnvio: "08/11/2024",
      tamanho: "1.8 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-003", 
      nome: "curriculo_atualizado_nov.pdf", 
      dataEnvio: "02/11/2024",
      tamanho: "3.1 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-004", 
      nome: "cv_empresa_tech.pdf", 
      dataEnvio: "28/10/2024",
      tamanho: "2.7 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-005", 
      nome: "cv_frontend_react.pdf", 
      dataEnvio: "25/10/2024",
      tamanho: "2.1 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-006", 
      nome: "curriculo_backend_node.pdf", 
      dataEnvio: "20/10/2024",
      tamanho: "1.9 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-007", 
      nome: "cv_fullstack_2024.pdf", 
      dataEnvio: "15/10/2024",
      tamanho: "2.5 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-008", 
      nome: "curriculo_data_science.pdf", 
      dataEnvio: "10/10/2024",
      tamanho: "3.2 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-009", 
      nome: "cv_ux_designer.pdf", 
      dataEnvio: "05/10/2024",
      tamanho: "2.8 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-010", 
      nome: "curriculo_devops.pdf", 
      dataEnvio: "01/10/2024",
      tamanho: "2.3 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-011", 
      nome: "cv_product_manager.pdf", 
      dataEnvio: "28/09/2024",
      tamanho: "2.6 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-012", 
      nome: "curriculo_qa_engineer.pdf", 
      dataEnvio: "25/09/2024",
      tamanho: "2.0 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-013", 
      nome: "cv_mobile_developer.pdf", 
      dataEnvio: "20/09/2024",
      tamanho: "2.9 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-014", 
      nome: "curriculo_cloud_architect.pdf", 
      dataEnvio: "15/09/2024",
      tamanho: "3.0 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-015", 
      nome: "cv_ai_engineer.pdf", 
      dataEnvio: "10/09/2024",
      tamanho: "2.7 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-016", 
      nome: "curriculo_scrum_master.pdf", 
      dataEnvio: "05/09/2024",
      tamanho: "2.2 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-017", 
      nome: "cv_cybersecurity.pdf", 
      dataEnvio: "01/09/2024",
      tamanho: "3.1 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-018", 
      nome: "curriculo_business_analyst.pdf", 
      dataEnvio: "28/08/2024",
      tamanho: "2.4 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-019", 
      nome: "cv_database_admin.pdf", 
      dataEnvio: "25/08/2024",
      tamanho: "2.8 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-020", 
      nome: "curriculo_network_engineer.pdf", 
      dataEnvio: "20/08/2024",
      tamanho: "2.5 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-021", 
      nome: "cv_systems_analyst.pdf", 
      dataEnvio: "15/08/2024",
      tamanho: "2.3 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-022", 
      nome: "curriculo_technical_lead.pdf", 
      dataEnvio: "10/08/2024",
      tamanho: "2.9 MB",
      status: "Analisado"
    },
    { 
      id: "CV-2024-023", 
      nome: "cv_software_architect.pdf", 
      dataEnvio: "05/08/2024",
      tamanho: "3.2 MB",
      status: "Analisado"
    }
  ];

  const ordenarCurriculos = (lista, criterio) => {
    let t = [...lista];
    const parseDate = d => new Date(d.split("/").reverse().join("-"));

    if (criterio === "mais-recente") return t.sort((a, b) => parseDate(b.dataEnvio) - parseDate(a.dataEnvio));
    if (criterio === "mais-antigo") return t.sort((a, b) => parseDate(a.dataEnvio) - parseDate(b.dataEnvio));
    return t;
  };

  useEffect(() => {
    setCurriculosFiltrados(ordenarCurriculos(curriculos, ordenacao));
    setPaginaAtual(1);
  }, [ordenacao]);

  const indexUltimo = paginaAtual * itensPorPagina;
  const curriculosPaginaAtual = curriculosFiltrados.slice(indexUltimo - itensPorPagina, indexUltimo);
  const totalPaginas = Math.ceil(curriculosFiltrados.length / itensPorPagina);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="historico-curriculos-container">
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
          <button 
            className="nav-link" 
            onClick={() => navigate("/historico-trilhas")}
          >
            Histórico
          </button>
          <button className="nav-link">Configurações</button>
          <UserProfile user={user} onLogout={handleLogout} />
        </nav>
      </header>

      <main className="historico-curriculos-main">
        <div className="header-section">
          <h1 className="title-page">Histórico de Currículos Enviados</h1>
          <p className="page-description">
            Visualize todos os currículos enviados e organize por data como preferir.
          </p>
        </div>

        <div className="content-container">
          <div className="filter-bar">
            <div className="contador">
              Exibindo {curriculosPaginaAtual.length} de {curriculosFiltrados.length} currículos
            </div>

            <div className="select-wrapper">
              <label>Ordenar por:</label>
              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="mais-recente">Mais recente</option>
                <option value="mais-antigo">Mais antigo</option>
              </select>
            </div>
          </div>

          <div className="lista-curriculos">
            {curriculosPaginaAtual.map((curriculo, index) => (
              <div className="curriculo-card" key={curriculo.id}>
                <div className="curriculo-info">
                  <div className="file-icon">📄</div>
                  <div className="file-details">
                    <h3 className="file-name">{curriculo.nome}</h3>
                    <div className="file-meta">
                      <span className="file-date">{curriculo.dataEnvio}</span>
                      <span className="file-size">• {curriculo.tamanho}</span>
                      <span className="file-status">• {curriculo.status}</span>
                    </div>
                  </div>
                </div>
                <div className="curriculo-actions">
                  <button className="action-btn view-btn">Visualizar</button>
                  <button className="action-btn download-btn">Download</button>
                </div>
                {index < curriculosPaginaAtual.length - 1 && <div className="divider" />}
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

export default HistoricoCurriculosPage;