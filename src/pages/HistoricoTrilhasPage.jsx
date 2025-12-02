import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/div.svg";
import UserProfile from "../components/UserProfile";
import "./HistoricoTrilhasPage.css";

const HistoricoTrilhasPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Usuário" };

  const [ordenacao, setOrdenacao] = useState("mais-recente");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [trilhasFiltradas, setTrilhasFiltradas] = useState([]);
  const itensPorPagina = 4;

  const trilhas = [
    { id: "TRL-2025-001", titulo: "Desenvolvedor Front-End React", dataCriacao: "12/11/2025" },
    { id: "TRL-2025-002", titulo: "Especialista em Data Science e Machine Learning", dataCriacao: "08/11/2025" },
    { id: "TRL-2025-003", titulo: "Designer UX/UI Profissional", dataCriacao: "05/11/2025" },
    { id: "TRL-2025-004", titulo: "Engenheiro DevOps e Cloud Computing", dataCriacao: "01/11/2025" },
    { id: "TRL-2025-005", titulo: "Product Manager", dataCriacao: "28/10/2025" },
    { id: "TRL-2025-006", titulo: "Cybersecurity Specialist", dataCriacao: "25/10/2025" },
    { id: "TRL-2025-007", titulo: "Mobile Developer React Native", dataCriacao: "20/10/2025" },
    { id: "TRL-2025-008", titulo: "Backend Developer Node.js", dataCriacao: "15/10/2025" },
    { id: "TRL-2025-009", titulo: "Full Stack Developer", dataCriacao: "10/10/2025" },
    { id: "TRL-2025-010", titulo: "Data Analyst", dataCriacao: "05/10/2025" },
    { id: "TRL-2025-011", titulo: "Cloud Architect", dataCriacao: "01/10/2025" },
    { id: "TRL-2025-012", titulo: "AI Engineer", dataCriacao: "28/09/2025" },
    { id: "TRL-2025-013", titulo: "DevOps Engineer", dataCriacao: "25/09/2025" },
    { id: "TRL-2025-014", titulo: "Software Architect", dataCriacao: "20/09/2025" },
    { id: "TRL-2025-015", titulo: "QA Engineer", dataCriacao: "15/09/2025" },
    { id: "TRL-2025-016", titulo: "Scrum Master", dataCriacao: "10/09/2025" }
  ];

  const ordenarTrilhas = (lista, criterio) => {
    let t = [...lista];
    const parseDate = d => new Date(d.split("/").reverse().join("-"));

    if (criterio === "mais-recente") return t.sort((a, b) => parseDate(b.dataCriacao) - parseDate(a.dataCriacao));
    if (criterio === "mais-antigo") return t.sort((a, b) => parseDate(a.dataCriacao) - parseDate(b.dataCriacao));
    return t;
  };

  useEffect(() => {
    setTrilhasFiltradas(ordenarTrilhas(trilhas, ordenacao));
    setPaginaAtual(1);
  }, [ordenacao]);

  const indexUltimo = paginaAtual * itensPorPagina;
  const trilhasPaginaAtual = trilhasFiltradas.slice(indexUltimo - itensPorPagina, indexUltimo);
  const totalPaginas = Math.ceil(trilhasFiltradas.length / itensPorPagina);

  return (
    <div className="historico-container">
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
          <button className="nav-link active">Histórico</button>
          <button className="nav-link">Configurações</button>
          <UserProfile user={user} />
        </nav>
      </header>

      <main className="historico-main">
        <h1 className="title-page">Histórico de Trilhas Criadas</h1>

        <div className="filter-bar">
          <div className="contador">{trilhasFiltradas.length} trilhas encontradas</div>

          <div className="select-wrapper">
            <label>Ordenar por:</label>
            <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
              <option value="mais-recente">Mais recente</option>
              <option value="mais-antigo">Mais antigo</option>
            </select>
          </div>
        </div>

        <div className="lista-card">
          {trilhasPaginaAtual.map((t, i) => (
            <div className="card" key={t.id}>
              <div className="info">
                <h3>{t.titulo}</h3>
                <p>Criada em <strong>{t.dataCriacao}</strong></p>
                <p>ID: <span className="id">{t.id}</span></p>
              </div>
              <button className="arrow" onClick={() => navigate('/vocational-form-response', { 
                state: { 
                  formData: {
                    professional_goal: t.titulo.split(' ').slice(-2).join(' '),
                    // outros dados mockados conforme necessário
                  }
                } 
              })}>
                {">"}
              </button>
              {i < trilhasPaginaAtual.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)}>{"<"}</button>

          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={paginaAtual === i + 1 ? "active" : ""}
              onClick={() => setPaginaAtual(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)}>{">"}</button>
        </div>
      </main>
    </div>
  );
};

export default HistoricoTrilhasPage;
