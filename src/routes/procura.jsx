import { useState, useMemo } from "react";
import ProcuraView from "../views/ProcuraView";
import { services } from "../data/services";

export default function ProcuraRoute() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  function toggleOption(value) {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  }

  function clearFilters() {
    setSelected([]);
  }

  function getSelectedText() {
    if (selected.length === 0) return "Selecione os serviços";
    if (selected.length <= 3) return selected.join(", ");
    return `${selected.slice(0, 3).join(", ")} + ${selected.length - 3} outros`;
  }

  const filteredServices = useMemo(() => {
    if (selected.length === 0) return services;
    return services.filter(s => selected.includes(s.category));
  }, [selected]);

  return (
    <ProcuraView
      open={open}
      setOpen={setOpen}
      selected={selected}
      onToggle={toggleOption}
      onClear={clearFilters}
      selectedText={getSelectedText()}
      services={filteredServices}
    />
  );
}
