import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/agendamento.css";

export default function Agendamento() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    pagamento: "",
    observacoes: "",
    termos: false,
  });

  const [feedback, setFeedback] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleTelefone(e) {
    setFormData({
      ...formData,
      telefone: e.target.value.replace(/\D/g, ""),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nome || !formData.telefone || !formData.veiculo) {
      setFeedback("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!formData.termos) {
      setFeedback("Aceite os termos para continuar.");
      return;
    }

    localStorage.setItem("ultimoAgendamento", JSON.stringify(formData));

    setFeedback("Agendamento realizado com sucesso!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <main>
      <div className="card">
        <h2>Agendar Serviço</h2>

        <form onSubmit={handleSubmit}>
          <div className="col">
            <label>Nome</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <label>Telefone</label>
            <input
              name="telefone"
              value={formData.telefone}
              onChange={handleTelefone}
              required
            />
          </div>

          <div className="col">
            <label>Veículo</label>
            <input
              name="veiculo"
              value={formData.veiculo}
              onChange={handleChange}
              required
            />

            <label>Pagamento</label>
            <select
              name="pagamento"
              value={formData.pagamento}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="pix">Pix</option>
              <option value="cartao">Cartão</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div className="full-width">
            <textarea
              name="observacoes"
              placeholder="Observações"
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="privacy">
            <input
              type="checkbox"
              name="termos"
              checked={formData.termos}
              onChange={handleChange}
            />
            <label>Aceito os termos</label>
          </div>

          <div className="buttons">
            <button type="submit" className="primary">
              Confirmar
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                setFormData({
                  nome: "",
                  telefone: "",
                  veiculo: "",
                  pagamento: "",
                  observacoes: "",
                  termos: false,
                })
              }
            >
              Limpar
            </button>
          </div>

          {feedback && <p id="feedbackMessage">{feedback}</p>}
        </form>
      </div>
    </main>
  );
}
