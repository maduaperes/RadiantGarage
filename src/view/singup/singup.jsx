import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import logo from "../../assets/IMG/logo.png";

export default function Cadastro() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("cliente");
  const [feedback, setFeedback] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    estabelecimento: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    horario: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validações básicas
    if (!formData.email) {
      setFeedback("Informe um email.");
      return;
    }

    if (!formData.senha) {
      setFeedback("Informe uma senha.");
      return;
    }

    const user = {
      tipo: userType,
      ...formData
    };

    localStorage.setItem("lj_user", JSON.stringify(user));

    setFeedback("Conta criada com sucesso! Redirecionando...");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user">Conecte-se a uma conta</div>
      </header>

      <main className="card">
        <h2>Cadastro</h2>

        <div className="signup-container">
          {/* Radios */}
          <input
            type="radio"
            name="userType"
            checked={userType === "cliente"}
            onChange={() => setUserType("cliente")}
          />
          <label className="radio-label">Cliente</label>

          <input
            type="radio"
            name="userType"
            checked={userType === "estabelecimento"}
            onChange={() => setUserType("estabelecimento")}
          />
          <label className="radio-label">Estabelecimento</label>

          <form onSubmit={handleSubmit}>
            {/* Cliente */}
            {userType === "cliente" && (
              <div className="fields">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Estabelecimento */}
            {userType === "estabelecimento" && (
              <div className="fields">
                <input
                  type="text"
                  name="estabelecimento"
                  placeholder="Nome do Estabelecimento"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cnpj"
                  placeholder="CNPJ"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="endereco"
                  placeholder="Endereço completo"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="estado"
                  placeholder="Estado"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="horario"
                  placeholder="Horário de funcionamento"
                  onChange={handleChange}
                />
              </div>
            )}

            <button className="primary" type="submit">
              Criar conta
            </button>
          </form>
        </div>

        <p className="muted">
          <a href="/login">Já tem conta? Entrar</a>
        </p>

        {feedback && <div className="feedback-message">{feedback}</div>}
      </main>
    </>
  );
}
