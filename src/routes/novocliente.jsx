import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NovoClienteView from "../views/NovoClienteView";

export default function NovoClienteRoute() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    birth: "",
    cpf: "",
    address: "",
    brand: "",
    year: "",
    plate: "",
    color: "",
    mileage: "",
    notes: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBack() {
    navigate("/dashboard");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.car) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const client = {
      id: Date.now(),
      ...form
    };

    const clients =
      JSON.parse(localStorage.getItem("lj_clients")) || [];

    clients.push(client);
    localStorage.setItem("lj_clients", JSON.stringify(clients));

    alert("Cliente cadastrado com sucesso!");
    navigate("/dashboard");
  }

  return (
    <NovoClienteView
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
