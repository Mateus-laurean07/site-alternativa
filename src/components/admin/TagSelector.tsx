"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const TAGS_PADRAO = [
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
  const [tagsDisponiveis, setTagsDisponiveis] = useState<string[]>(TAGS_PADRAO);
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_custom_tags");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTagsDisponiveis((prev) => Array.from(new Set([...prev, ...parsed])));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const handleAdd = () => {
    let trimmed = newTag.trim();
    if (trimmed.startsWith('#')) trimmed = trimmed.substring(1);

    if (trimmed && !tagsDisponiveis.includes(trimmed)) {
      const updated = [...tagsDisponiveis, trimmed];
      setTagsDisponiveis(updated);
      
      const custom = updated.filter(t => !TAGS_PADRAO.includes(t));
      localStorage.setItem("admin_custom_tags", JSON.stringify(custom));
      
      if (!selectedTags.includes(trimmed)) {
        onChange([...selectedTags, trimmed]);
      }
      setNewTag("");
      setIsAdding(false);
    } else if (tagsDisponiveis.includes(trimmed)) {
      if (!selectedTags.includes(trimmed)) {
        onChange([...selectedTags, trimmed]);
      }
      setNewTag("");
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
        Tags{" "}
        <span style={{ fontWeight: 400, color: "#adb5bd", fontSize: "0.8rem" }}>
          ({selectedTags.length} selecionada{selectedTags.length !== 1 ? "s" : ""})
        </span>
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tagsDisponiveis.map((tag) => {
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

        {isAdding ? (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#adb5bd", fontWeight: 600, marginLeft: 4 }}>#</span>
            <input 
              type="text"
              autoFocus
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? (e.preventDefault(), handleAdd()) : null}
              placeholder="Nova tag..."
              style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid #ced4da", outline: "none", fontSize: "0.875rem", width: 120 }}
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

      {selectedTags.length > 0 && (
        <p style={{ margin: "12px 0 0", fontSize: "0.8rem", color: "#adb5bd" }}>
          Selecionadas: {selectedTags.map((t) => `#${t}`).join(", ")}
        </p>
      )}
    </div>
  );
}
