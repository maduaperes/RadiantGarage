import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/SupabaseClient";
import logo from "../assets/logo.png";
import "../styles/Login.css";

const Login = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const senha = form.password.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setFeedback("Erro ao entrar: " + error.message);
      return;
    }

    setFeedback("Login realizado com sucesso!");
    console.log("Usuário logado:", data.user);
    window.location.href = "/";
  };

  return (
    <div>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user" id="userName">Conecte-se a uma conta</div>
      </header>

      <main className="card">
        <h2>Entrar</h2>

        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="ex: voce@exemplo.com" />

          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" required placeholder="••••••" />

          <button className="primary" type="submit">Entrar</button>
        </form>

        <p className="muted">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

        <div id="feedback" className="feedback-message">{feedback}</div>
      </main>
    </div>
  );
};

export default Login;
