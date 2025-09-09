import React from "react";
import logo from "../assets/logo.png";
import "./Login.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de login
  };

  return (
    <div>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user" id="userName">Conecte-se a uma conta</div>
      </header>

      <main className="card">
        <div className="back" id="btnBack">⇦</div>
        <h2>Entrar</h2>

        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email ou telefone</label>
          <input
            id="email"
            placeholder="ex: voce@exemplo.com ou (11) 9xxxx-xxxx"
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="••••••"
          />

          <button className="primary" type="submit">Entrar</button>
        </form>

        <div className="socials">
          <button className="social">Entrar com Google</button>
          <button className="social">Entrar com Facebook</button>
        </div>

        <p className="muted">
          Ainda não tem conta? <a href="signup.html">Cadastre-se</a>
        </p>
      </main>
    </div>
  );
};

export default Login;
