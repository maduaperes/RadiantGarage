import { useState } from "react";
import "../../styles/agendamento.css";

export default function AgendamentoView() {
  // =========================
  // ESTADOS
  // =========================
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    pagamento: "",
    observacoes: "",
    servico: "manutencao_motor",
    termos: false
  });

  const [feedback, setFeedback] = useState({ text: "", type: "" });

  // =========================
  // HANDLERS
  // =========================
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleTelefone(e) {
    const somenteNumeros = e.target.value.replace(/\D/g, "");
    setForm(prev => ({ ...prev, telefone: somenteNumeros }));
  }

  function showMessage(text, type = "error") {
    setFeedback({ text, type });

    setTimeout(() => {
      setFeedback({ text: "", type: "" });
    }, 2000);
  }

  function validateForm() {
    if (
      !form.nome ||
      !form.telefone ||
      !form.veiculo ||
      !form.pagamento ||
      !form.servico
    ) {
      showMessage("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (!form.termos) {
      showMessage("Você deve aceitar os termos de uso.");
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const cliente = {
      nome: form.nome,
      telefone: form.telefone
    };

    const agendamento = {
      veiculo: form.veiculo,
      servico: form.servico,
      pagamento: form.pagamento,
      observacoes: form.observacoes
    };

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(cliente);

    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("ultimoAgendamento", JSON.stringify(agendamento));

    showMessage("Agendamento realizado com sucesso!", "success");

    setTimeout(() => {
      window.location.href = "/status";
    }, 1500);
  }

  function handleClear() {
    setForm({
      nome: "",
      telefone: "",
      veiculo: "",
      pagamento: "",
      observacoes: "",
      servico: "manutencao_motor",
      termos: false
    });

    showMessage("Formulário limpo com sucesso!", "success");
  }

  // =========================
  // JSX
  // =========================
  return (
    <main>
      <div className="card">
        <h2>Agendar Serviço</h2>
        <p className="subtitle">
          Preencha os campos abaixo para agendar o seu atendimento
        </p>

        <form onSubmit={handleSubmit}>
          <div className="col">
            <label>Nome completo:</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <label>Telefone:</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleTelefone}
              required
            />
          </div>

          <div className="col">
            <label>Modelo do veículo:</label>
            <input
              name="veiculo"
              value={form.veiculo}
              onChange={handleChange}
              required
            />

            <label>Forma de pagamento:</label>
            <select
              name="pagamento"
              value={form.pagamento}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="pix">Pix</option>
              <option value="cartao">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div className="full-width">
            <label>Observações:</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="full-width">
            <label>Serviço:</label>
            <select
              name="servico"
              value={form.servico}
              onChange={handleChange}
              required
            >
              <option value="manutencao_motor">
                Manutenção do Motor
              </option>
            </select>
          </div>

          <div className="privacy">
            <input
              type="checkbox"
              name="termos"
              checked={form.termos}
              onChange={handleChange}
            />
            <label>Li e aceito os termos de uso e privacidade</label>
          </div>

          <div className="full-width buttons">
            <button type="submit" className="primary">
              Confirmar agendamento
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleClear}
            >
              Limpar
            </button>
          </div>

          {feedback.text && (
            <div
              style={{
                marginTop: 10,
                fontWeight: 600,
                textAlign: "center",
                color:
                  feedback.type === "success"
                    ? "#4ade80"
                    : "#f87171"
              }}
            >
              {feedback.text}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
