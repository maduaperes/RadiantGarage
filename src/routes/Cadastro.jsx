import React from "react";
import logo from "../assets/logo.png";
import "../styles/Cadastro.css";

const Cadastro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você coloca a lógica de cadastro
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
          {/* Radios */}
          <input type="radio" id="cliente" name="userType" defaultChecked />
          <label htmlFor="cliente" className="radio-label">Cliente</label>

          <input type="radio" id="estabelecimento" name="userType" />
          <label htmlFor="estabelecimento" className="radio-label">Estabelecimento</label>

          {/* Formulário */}
          <form id="signupForm" onSubmit={handleSubmit}>
            {/* Campos Cliente */}
            <div id="clienteFields" className="fields">
              <input type="text" placeholder="Nome completo" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Senha" required />
              <input type="text" placeholder="CPF" required />
            </div>

            {/* Campos Estabelecimento */}
            <div id="establishmentFields" className="fields">
              <input type="text" placeholder="Nome do Estabelecimento" required />
              <input type="text" placeholder="CNPJ" required />
              <input type="text" placeholder="Endereço completo" required />
              <input type="text" placeholder="Cidade" required />
              <input type="text" placeholder="Estado" required />
              <input type="text" placeholder="CEP" required />
              <input type="text" placeholder="Horário de funcionamento" />
            </div>

            <button className="primary" type="submit">Criar conta</button>
          </form>
        </div>

        <p className="muted">
          <a href="login.html">Já tem conta? Entrar</a>
        </p>

        <div id="feedback" className="feedback-message"></div>
      </main>
    </div>
  );
};

export default Cadastro;
