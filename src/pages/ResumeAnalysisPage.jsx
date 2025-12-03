import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'; // Importando o Header component
import './ResumeAnalysisPage.css';

const ResumeAnalysisPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Recuperar usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Usuário"}');

  // Dados mockados para análise de currículo
  const mockAnalysis = {
    id: id || '1',
    fileName: 'Currículo_Maria_Silva_2024.pdf',
    analysisDate: '21 de Nov. 2025',
    suggestions: [
      {
        title: 'Adicione um resumo profissional impactante',
        description: 'Inclua um breve parágrafo no início do currículo destacando suas principais competências, experiências e objetivos de carreira. Isso ajuda recrutadores a entenderem rapidamente seu perfil.'
      },
      {
        title: 'Quantifique suas conquistas',
        description: 'Substitua descrições genéricas por resultados mensuráveis. Exemplo: "Aumentei as vendas em 35% em 6 meses" é mais impactante que "Responsável por vendas".'
      },
      {
        title: 'Otimize para sistemas ATS',
        description: 'Use palavras-chave relevantes da descrição da vaga. Evite formatações complexas, tabelas ou imagens que possam dificultar a leitura por sistemas automatizados.'
      },
      {
        title: 'Revise a seção de habilidades',
        description: 'Organize suas habilidades em categorias (técnicas, comportamentais, idiomas). Destaque as mais relevantes para a posição desejada e remova competências obsoletas.'
      },
      {
        title: 'Atualize as informações de contato',
        description: 'Verifique se e-mail, telefone e LinkedIn estão atualizados e profissionais. Considere adicionar um portfólio online ou GitHub se relevante para sua área.'
      },
      {
        title: 'Destaque certificações e cursos recentes',
        description: 'Adicione uma seção específica para certificações, cursos e treinamentos relevantes. Inclua datas e instituições para demonstrar comprometimento com desenvolvimento profissional.'
      },
      {
        title: 'Simplifique o design visual',
        description: 'Mantenha um layout limpo e profissional. Use fonte legível (tamanho 10-12pt), margens adequadas e espaçamento consistente. Evite cores chamativas ou fontes decorativas.'
      },
      {
        title: 'Revise a ordem cronológica',
        description: 'Liste experiências profissionais da mais recente para a mais antiga. Mantenha consistência nas datas e formate-as de maneira uniforme (ex: Jan 2020 - Dez 2022).'
      },
      {
        title: 'Elimine erros gramaticais e ortográficos',
        description: 'Revise cuidadosamente todo o conteúdo. Peça para alguém revisar ou use ferramentas de correção. Erros podem prejudicar sua credibilidade profissional.'
      },
      {
        title: 'Adapte o currículo para cada vaga',
        description: 'Personalize seu currículo para cada oportunidade, destacando experiências e habilidades mais relevantes para a posição. Um currículo genérico tem menos chances de sucesso.'
      },
      {
        title: 'Reduza o tamanho do currículo',
        description: 'Mantenha o currículo entre 1-2 páginas. Remova experiências muito antigas ou irrelevantes. Seja conciso e objetivo, focando no que realmente importa para o recrutador.'
      },
      {
        title: 'Adicione projetos relevantes',
        description: 'Se aplicável, inclua uma seção de projetos destacando trabalhos significativos, voluntariado ou iniciativas pessoais que demonstrem suas competências e proatividade.'
      }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleBack = () => {
    navigate('/historico-curriculos');
  };

  const handleNewGuide = () => {
    navigate('/interview-guide');
  };

  return (
    <div className="analysis-container">
      {/* Header component */}
      <Header user={user} onLogout={handleLogout} />

      <main className="analysis-main">
        <div className="analysis-title-container">
          <h1 className="analysis-title">Análise de Currículo</h1>
          <div className="analysis-subtitle">
            <h2 className="analysis-file-name">
              {mockAnalysis.fileName}
            </h2>
            <span className="analysis-date">
              Analisado em {mockAnalysis.analysisDate}
            </span>
          </div>
        </div>

        <div className="analysis-grid">
          <section className="analysis-box">
            <div className="analysis-box-header">
              <h2>Sugestões de Melhoria</h2>
              <span className="analysis-count">
                {mockAnalysis.suggestions.length} recomendações
              </span>
            </div>

            <div className="suggestions-list">
              {mockAnalysis.suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                >
                  <h3 className="suggestion-title">
                    {index + 1}. {suggestion.title}
                  </h3>
                  <p className="suggestion-description">
                    {suggestion.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="analysis-action-buttons">
          <button 
            onClick={handleBack}
            className="analysis-back-btn"
          >
            Retornar
          </button>
          <button 
            onClick={handleNewGuide}
            className="analysis-new-guide-btn"
          >
            Iniciar Novo Guia
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysisPage;