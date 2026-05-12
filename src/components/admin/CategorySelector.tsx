"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const CATEGORIAS_PADRAO = [
  "Saúde Animal",
  "Nutrição",
  "Manejo",
  "Tecnologia",
  "Mercado"
];

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategorySelector({ selectedCategory, onChange }: CategorySelectorProps) {
  const [categories, setCategories] = useState<string[]>(CATEGORIAS_PADRAO);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_custom_categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCategories((prev) => Array.from(new Set([...prev, ...parsed])));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      const updated = [...categories, trimmed];
      setCategories(updated);
      
      const custom = updated.filter(c => !CATEGORIAS_PADRAO.includes(c));
      localStorage.setItem("admin_custom_categories", JSON.stringify(custom));
      
      onChange(trimmed);
      setNewCategory("");
      setIsAdding(false);
    } else if (categories.includes(trimmed)) {
      onChange(trimmed);
      setNewCategory("");
      setIsAdding(false);
    } else {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.875rem", fontWeight: 600,
        color: "var(--verde-escuro)", marginBottom: 12
      }}>
        Categoria *
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {categories.map((cat) => {
          const selected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: selected ? "2px solid var(--verde-escuro)" : "2px solid #dee2e6",
                background: selected ? "var(--verde-escuro)" : "white",
                color: selected ? "white" : "#495057",
                fontWeight: selected ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
                userSelect: "none",
              }}
            >
              {selected && (
                <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>✓</span>
              )}
              {cat}
            </button>
          );
        })}

        {isAdding ? (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input 
              type="text"
              autoFocus
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? (e.preventDefault(), handleAdd()) : null}
              placeholder="Nova categoria..."
              style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid #ced4da", outline: "none", fontSize: "0.875rem" }}
            />
            <button type="button" onClick={handleAdd} style={{ padding: "6px 12px", borderRadius: 20, background: "var(--verde-escuro)", color: "white", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}>
              OK
            </button>
            <button type="button" onClick={() => setIsAdding(false)} style={{ padding: "6px 10px", borderRadius: 20, background: "#f1f3f5", color: "#495057", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px dashed #adb5bd",
              background: "white",
              color: "#495057",
              fontWeight: 500,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Plus size={14} /> Criar Nova
          </button>
        )}
      </div>
    </div>
  );
}
