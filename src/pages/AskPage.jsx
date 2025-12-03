import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicionado para navegação
import Header from '../components/Header'; // Importando o Header component
import './AskPage.css';

const AskPage = () => {
    const navigate = useNavigate();
    const totalSteps = 12;
    const [currentStep, setCurrentStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    
    // Recuperar usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{"name": "Maria Silva"}');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

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
            {/* Header component */}
            <Header user={user} onLogout={handleLogout} />

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