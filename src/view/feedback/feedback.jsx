import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/feedback.css";

export default function Feedback() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    titulo: "",
    descricao: "",
    agree: false,
  });

  const [ratings, setRatings] = useState({
    geral: 0,
    servico: 0,
    atendimento: 0,
  });

  const [charLeft, setCharLeft] = useState(500);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCharLeft(500 - form.descricao.length);
  }, [form.descricao]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleStars(tipo, valor) {
    setRatings({
      ...ratings,
      [tipo]: valor,
    });
  }

  function canSubmit() {
    const hasRating =
      ratings.geral > 0 || ratings.servico > 0 || ratings.atendimento > 0;

    return hasRating && form.agree;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!canSubmit()) {
      setMessage("Preencha a avaliação e aceite os termos.");
      return;
    }

    const review = {
      nome: form.nome || "Anônimo",
      email: form.email,
      titulo: form.titulo,
      descricao: form.descricao,
      ratings,
      data: new Date().toLocaleString("pt-BR"),
    };

    const reviews = JSON.parse(
      localStorage.getItem("radiant_reviews") || "[]"
    );

    reviews.unshift(review);
    localStorage.setItem("radiant_reviews", JSON.stringify(reviews));

    setMessage("Obrigado pelo feedback!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }

  function renderStars(tipo) {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={ratings[tipo] >= i + 1 ? "selected" : ""}
        onClick={() => handleStars(tipo, i + 1)}
      >
        ★
      </span>
    ));
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <span>RadiantGarage</span>
        </div>
      </header>

      <main className="card">
        <div className="back" onClick={() => navigate(-1)}>
          ↩
        </div>

        <h2>Queremos saber sua opinião!</h2>
        <p className="intro">
          Sua opinião é muito importante para nós!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row-2">
            <div>
              <label>Seu nome (opcional)</label>
              <input name="nome" value={form.nome} onChange={handleChange} />
            </div>

            <div>
              <label>Seu e-mail (opcional)</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row-full">
            <label>Título da avaliação</label>
            <input
              name="titulo"
              maxLength={50}
              value={form.titulo}
              onChange={handleChange}
            />

            <textarea
              name="descricao"
              rows="4"
              maxLength={500}
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva sua experiência"
            />
            <div id="charCount">{charLeft} caracteres disponíveis</div>
          </div>

          <div className="row-3">
            <div className="rating-section">
              <label>Avaliação geral</label>
              <div className="stars">{renderStars("geral")}</div>
            </div>

            <div className="rating-section">
              <label>Serviço</label>
              <div className="stars">{renderStars("servico")}</div>
            </div>

            <div className="rating-section">
              <label>Atendimento</label>
              <div className="stars">{renderStars("atendimento")}</div>
            </div>
          </div>

          <div className="privacy">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <label>
              Concordo que meu feedback será usado para aprimorar os serviços.
            </label>
          </div>

          <div className="buttons">
            <button className="primary" disabled={!canSubmit()}>
              Enviar
            </button>
          </div>

          {message && <p id="feedbackMessage" className="active">{message}</p>}
        </form>
      </main>

      <footer>
        <p>&copy; 2025 RadiantGarage</p>
      </footer>
    </>
  );
}
