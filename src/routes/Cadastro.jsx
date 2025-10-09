import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/SupabaseClient";
import logo from "../assets/logo.png";
import "../styles/Cadastro.css";

const Cadastro = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const nome = form[0].value;
    const email = form[1].value;
    const senha = form[2].value;
    const cpf = form[3].value;

    // Cadastro no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      setFeedback("Erro ao cadastrar: " + error.message);
      return;
    }

    // Inserção de dados extras
    const { error: insertError } = await supabase.from("usuarios").insert([
      { nome, email, cpf, tipo: "cliente" },
    ]);

    if (insertError) {
      setFeedback("Erro ao salvar dados: " + insertError.message);
    } else {
      setFeedback("Conta criada com sucesso!");
      form.reset();
    }
  };

  return (
    <div>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user" id="userName">Conecte-se a uma conta</div>
      </header>

      <main className="card">
        <h2>Cadastro</h2>
        <div className="signup-container">
          <form id="signupForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome completo" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Senha" required />
            <input type="text" placeholder="CPF" required />
            <button className="primary" type="submit">Criar conta</button>
          </form>
        </div>

        <p className="muted">
          <Link to="/login">Já tem conta? Entrar</Link>
        </p>

        <div id="feedback" className="feedback-message">{feedback}</div>
      </main>
    </div>
  );
};

export default Cadastro;
