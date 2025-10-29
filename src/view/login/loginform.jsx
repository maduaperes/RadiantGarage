import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setFeedback("Preencha email e senha.");
      return;
    }

    const validEmail = "...";
    const validSenha = "...";

    if (email !== validEmail || senha !== validSenha) {
      setFeedback("Email ou senha incorretos.");
      return;
    }

    setFeedback("Entrando em sua conta...");
    localStorage.setItem("lj_user", JSON.stringify({ name: "Cliente", contact: email }));

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  };

  return (
    <>
      <h2>Entrar</h2>
      <p className="subtitle">Preencha os campos abaixo para entrar</p>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ex: voce@exemplo.com"
        />

        <label>Senha</label>
        <input
          id="password"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••"
        />

        <button className="primary" type="submit">
          Entrar
        </button>
      </form>

      <div className="socials">
        <button className="social">Entrar com Google</button>
        <button className="social">Entrar com Facebook</button>
      </div>

      <p className="muted">
        Ainda não tem conta? <a href="signup.html">Cadastre-se</a>
      </p>

      <div id="feedback" className="feedback-message">
        {feedback}
      </div>
    </>
  );
}
