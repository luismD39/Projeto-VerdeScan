"use client";

import { useState } from "react";

const especies = [
  { slug: "manga", nome: "Manga" },
  { slug: "uva", nome: "Uva" },
];

export default function Home() {
  const [especie, setEspecie] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  function aoEscolherFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setFoto(URL.createObjectURL(arquivo));
  }

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 24, textAlign: "center" }}>
      <h1>VerdeScan</h1>

      <select
        value={especie}
        onChange={(e) => {
          setEspecie(e.target.value);
          setFoto(null);
        }}
        style={{
          width: "100%",
          padding: 16,
          fontSize: 18,
          borderRadius: 12,
          border: "2px solid #2e7d32",
          marginTop: 16,
        }}
      >
        <option value="">Selecione a espécie...</option>
        {especies.map((e) => (
          <option key={e.slug} value={e.slug}>
            {e.nome}
          </option>
        ))}
      </select>

      {especie && (
        <label
          style={{
            display: "block",
            padding: 16,
            marginTop: 16,
            borderRadius: 12,
            background: "#2e7d32",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          📷 Tirar foto ou escolher da galeria
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={aoEscolherFoto}
            style={{ display: "none" }}
          />
        </label>
      )}

      {foto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={foto}
          alt="Folha selecionada"
          style={{ maxWidth: "100%", borderRadius: 12, marginTop: 16 }}
        />
      )}
    </main>
  );
}
