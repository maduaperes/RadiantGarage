import { useState } from "react";
import "../../styles/novo-servico.css";

export default function NovoServico() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("ativo");

  const [urgent, setUrgent] = useState([]);
  const [serviceType, setServiceType] = useState([]);

  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  function toggleArrayValue(value, array, setArray) {
    setArray(
      array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value]
    );
  }

  function formatPrice(value) {
    let v = value.replace(/\D/g, "");
    v = (parseInt(v || "0") / 100).toFixed(2);
    return v.replace(".", ",");
  }

  function handlePriceChange(e) {
    setPrice(formatPrice(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !category) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const services = JSON.parse(
      localStorage.getItem("lj_services") || "[]"
    );

    const newService = {
      id: Date.now(),
      name,
      category,
      status,
      urgent,
      times: [time1, time2],
      type: serviceType,
      price: parseFloat(price.replace(",", ".")) || 0,
      notes,
      image: image ? URL.createObjectURL(image) : null,
    };

    services.push(newService);
    localStorage.setItem("lj_services", JSON.stringify(services));

    alert("Serviço cadastrado com sucesso!");
    window.location.href = "/dashboard";
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <div className="back" onClick={() => (window.location.href = "/dashboard")}>
            ↩
          </div>

          <h2>Novo Serviço</h2>
          <p className="subtitle">Cadastre um novo serviço de veículo</p>

          <form className="form-grid" onSubmit={handleSubmit}>
            {/* COLUNA 1 */}
            <div className="column">
              <label>Nome do Serviço</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Categoria</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>

              <label>Atendimento de Urgência</label>
              <div className="multi-select">
                {["normal", "urgente", "imediato"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={urgent.includes(item)}
                      onChange={() =>
                        toggleArrayValue(item, urgent, setUrgent)
                      }
                    />
                    {item}
                  </label>
                ))}
              </div>

              <label>Horário do Serviço</label>
              <input type="time" value={time1} onChange={(e) => setTime1(e.target.value)} />
              <input type="time" value={time2} onChange={(e) => setTime2(e.target.value)} />
            </div>

            {/* COLUNA 2 */}
            <div className="column">
              <label>Tipo de Atendimento</label>
              <div className="multi-select">
                {["presencial", "retirada_entrega", "rapido"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={serviceType.includes(item)}
                      onChange={() =>
                        toggleArrayValue(item, serviceType, setServiceType)
                      }
                    />
                    {item}
                  </label>
                ))}
              </div>

              <label>Preço (R$)</label>
              <input value={price} onChange={handlePriceChange} />

              <label>Imagem do Serviço</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <label>Observações</label>
              <textarea
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="full-width-field">
              <button className="primary" type="submit">
                Salvar Serviço
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
