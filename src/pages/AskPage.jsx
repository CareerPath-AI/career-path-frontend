import React, { useState } from 'react';
import './AskPage.css'; // IMPORTANTE

const MockLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
    </svg>
);

const AskPage = () => {
    const totalSteps = 12;
    const [currentStep, setCurrentStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const handleNext = () => {
        if (currentStep < totalSteps && fullName.trim() !== '') {
            setCurrentStep(currentStep + 1);
            setError('');
        } else if (fullName.trim() === '') {
            setError('Por favor, preencha o campo para continuar.');
        } else if (currentStep === totalSteps) {
            alert('Formulário concluído! (Simulação)');
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };

    const currentQuestion = {
        title: 'Qual é o seu nome completo?',
        placeholder: 'Digite seu nome completo...',
        value: fullName,
        setter: setFullName,
    };

    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="form-container">
            <header className="form-header">
                <div className="header-left">
                    <div className="logo-box-header">
                        <MockLogo />
                    </div>
                    <span className="app-name">CareerPathAI</span>
                </div>

                <nav className="header-nav">
                    <button className="nav-link">Histórico</button>
                    <button className="nav-link">Configurações</button>

                    <div className="notification-container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="notification-bell" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707l-.707-.707V8a6 6 0 00-6-6zm-5.707 9.707l.707-.707V8a5 5 0 0110 0v3.586l.707.707A1 1 0 0016 12H4a1 1 0 00-.707.293zM10 16a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <div className="notification-badge"></div>
                    </div>

                    <div className="user-profile">
                        <span className="user-name">Maria Silva</span>
                        <div className="user-avatar">MS</div>
                        <span className="dropdown-arrow">▼</span>
                    </div>
                </nav>
            </header>

            <main className="form-main">
                <div className="form-progress-bar">
                    <div className="form-progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="form-header-section">
                    <h1 className="form-title">Defina sua Rota Profissional</h1>
                    <p className="form-description">
                        Responda às perguntas abaixo para criarmos sua trilha de estudos personalizada.
                    </p>
                </div>

                <div className="question-card">

                    {error && <p className="error">{error}</p>}

                    <h2 className="question-title">{currentQuestion.title}</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={currentQuestion.value}
                            onChange={(e) => currentQuestion.setter(e.target.value)}
                            placeholder={currentQuestion.placeholder}
                            className="input-field"
                            autoFocus
                        />

                        <div className="navigation-footer">

                            <div className="nav-buttons">

                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className="nav-btn previous"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    type="submit"
                                    disabled={currentStep > totalSteps}
                                    className="nav-btn next"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="step-indicator">
                                {currentStep} de {totalSteps}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AskPage;
