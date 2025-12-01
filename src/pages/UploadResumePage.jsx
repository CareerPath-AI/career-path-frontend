import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/div.svg';
import { uploadResume } from '../services/authService';
import './UploadResumePage.css';

const UploadResumePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes

  const validateFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Por favor, envie apenas arquivos PDF.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('O arquivo excede o tamanho máximo de 10MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo PDF.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const data = await uploadResume(selectedFile);
      alert('Currículo enviado com sucesso!');
      // Redirecionar para página de análise ou dashboard
      // navigate('/dashboard');
      
    } catch (err) {
      console.error(err);
      setError('Erro ao fazer upload do currículo. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-container">
      {/* Header/Navigation */}
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

      {/* Main Content */}
      <main className="upload-main">
        <div className="upload-card">
          <div className="upload-header-section">
            <h1 className="upload-title">Análise Inteligente de Currículo</h1>
            <p className="upload-description">
              Nossa IA avalia seu currículo e cria uma trilha de estudos personalizada para acelerar sua carreira
            </p>
          </div>

          <form onSubmit={handleSubmit} className="upload-form">
            {error && <p className="error">{error}</p>}

            <div
              className={`upload-area ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="file-input"
                style={{ display: 'none' }}
              />
              
              {selectedFile ? (
                <div className="file-selected">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="upload-icon">☁️</div>
                  <p className="upload-text">Envie seu currículo em PDF</p>
                  <p className="upload-instructions">Clique aqui ou arraste seu arquivo PDF</p>
                  <p className="upload-limit">Tamanho máximo: 10MB</p>
                </>
              )}
            </div>

            <button
              type="submit"
              className="analyze-button"
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Enviando...' : '✓ Analisar Currículo'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadResumePage;

