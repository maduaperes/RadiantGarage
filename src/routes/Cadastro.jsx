import React, { useState } from "react";
import CadastroForm from "../view/cadastro/CadastroForm";

export default function Cadastro() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
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

  function handleSubmit(e) {
    e.preventDefault();
    alert("Cliente salvo!");
  }

  function handleBack() {
    console.log("Voltar");
  }

  return (
    <CadastroForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
