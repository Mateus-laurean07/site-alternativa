"use client";

const CATEGORIAS_DISPONIVEIS = [
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
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.875rem", fontWeight: 600,
        color: "var(--verde-escuro)", marginBottom: 12
      }}>
        Categoria *
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {CATEGORIAS_DISPONIVEIS.map((cat) => {
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
      </div>
    </div>
  );
}
