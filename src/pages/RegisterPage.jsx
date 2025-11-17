import React, { useState } from 'react';

import logo from '../assets/div.svg';
import emailLogo from '../assets/Vector.svg';
import passwordLogo from '../assets/pass.svg';
import { loginUser } from '../services/authService'; 
import './RegisterPage.css';

const RegisterPage = ({ onForgotPassword }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

  //   try {
      const data = await RegisterUser(name, email, password);

  //     // guarda os tokens
  //     localStorage.setItem('access_token', data.access_token);
  //     localStorage.setItem('refresh_token', data.refresh_token);

  //     alert('Login realizado com sucesso!');
  //     window.location.href = '/dashboard';

  //   } catch (err) {
  //     console.error(err);
  //     setError('Email ou senha incorretos');
  //   }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className='logo-box'>
            <img src={logo} alt="Logo" />
          </div>
          <h1>Cadastro</h1>
          <p className="subtitle">Preencha os dados abaixo para criar sua conta.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label className="form-label">Nome</label>
            <div className="input-icon-container">
              {/* <img src={emailLogo} alt="ícone de e-mail" className="input-icon" /> */}
              <input
                type="name"
                className="form-input"
                placeholder="Digite seu nome completo"
                value={email}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <div className="input-icon-container">
              <img src={emailLogo} alt="ícone de e-mail" className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <div className="input-icon-container">
              <img src={passwordLogo} alt="ícone de senha" className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">Cadastrar</button>
        </form>

        <footer className="footer">
          <p>&copy; 2025 CareerPath-AI. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
