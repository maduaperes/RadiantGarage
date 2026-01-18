import { useEffect, useState } from "react";
import "../../styles/feedback.css";

export default function Feedback() {
  const [overallRating, setOverallRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [attendanceRating, setAttendanceRating] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [agree, setAgree] = useState(false);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [charsLeft, setCharsLeft] = useState(500);

  const hasRating =
    overallRating > 0 || serviceRating > 0 || attendanceRating > 0;

  const submitEnabled = hasRating && agree;

  useEffect(() => {
    setCharsLeft(500 - description.length);
  }, [description]);

  function showMessage(text, color) {
    setMessage(text);
    setMessageColor(color);
    setTimeout(() => setMessage(""), 8000);
  }

  function clearForm() {
    setOverallRating(0);
    setServiceRating(0);
    setAttendanceRating(0);
    setName("");
    setEmail("");
    setTitle("");
    setDescription("");
    setImage(null);
    setAgree(false);
    setCharsLeft(500);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!agree) {
      showMessage("Você precisa concordar com os termos.", "red");
      return;
    }

    const review = {
      nome: name || "Anônimo",
      email,
      titulo: title,
      ratings: {
        geral: overallRating,
        servico: serviceRating,
        atendimento: attendanceRating,
      },
      observacoes: description,
      imagem: image?.name || "",
      data: new Date().toLocaleString("pt-BR"),
    };

    const reviews = JSON.parse(
      localStorage.getItem("radiant_reviews") || "[]"
    );

    reviews.unshift(review);
    localStorage.setItem("radiant_reviews", JSON.stringify(reviews));

    showMessage("Obrigada pelo feedback!", "green");

    setTimeout(clearForm, 1000);
    setTimeout(() => {
      window.location.href = "/procura";
    }, 2500);
  }

  function Stars({ value, onChange }) {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= value ? "selected" : ""}
            onMouseEnter={() => onChange(star)}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>
      </header>

      <main className="card">
        <div className="back" onClick={() => (window.location.href = "/status")}>
          ↩
        </div>

        <h2>Queremos saber sua opinião!</h2>

        <form onSubmit={handleSubmit}>
          <div className="row-2">
            <div>
              <label>Seu nome (opcional):</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Seu e-mail (opcional):</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row-full">
            <label>Título da avaliação:</label>
            <input
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              maxLength={500}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div
              style={{ color: charsLeft <= 50 ? "red" : "inherit" }}
            >
              {charsLeft} caracteres disponíveis
            </div>
          </div>

          <div className="row-3">
            <div>
              <label>Avaliação geral:</label>
              <Stars value={overallRating} onChange={setOverallRating} />
            </div>

            <div>
              <label>Serviço:</label>
              <Stars value={serviceRating} onChange={setServiceRating} />
            </div>

            <div>
              <label>Atendimento:</label>
              <Stars value={attendanceRating} onChange={setAttendanceRating} />
            </div>
          </div>

          <div className="full-width-field">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="full-width-field">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label>
              Concordo que meu feedback será usado para aprimorar os serviços.
            </label>

            <div className="buttons">
              <button type="submit" disabled={!submitEnabled}>
                Enviar
              </button>
              <button type="button" onClick={clearForm}>
                Limpar
              </button>
            </div>

            {message && (
              <div style={{ color: messageColor }}>{message}</div>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
