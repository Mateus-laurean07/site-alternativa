"use client";

const TAGS_DISPONIVEIS = [
  "bovinos",
  "água limpa",
  "pecuária",
  "saúde animal",
  "manejo",
  "produtividade",
  "bebedouros",
];

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const toggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.875rem", fontWeight: 600,
        color: "var(--verde-escuro)", marginBottom: 12
      }}>
        Tags{" "}
        <span style={{ fontWeight: 400, color: "#adb5bd", fontSize: "0.8rem" }}>
          ({selectedTags.length} selecionada{selectedTags.length !== 1 ? "s" : ""})
        </span>
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {TAGS_DISPONIVEIS.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
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
              #{tag}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <p style={{ margin: "12px 0 0", fontSize: "0.8rem", color: "#adb5bd" }}>
          Selecionadas: {selectedTags.map((t) => `#${t}`).join(", ")}
        </p>
      )}
    </div>
  );
}
