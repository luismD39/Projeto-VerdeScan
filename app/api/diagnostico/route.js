import { db } from "@/lib/db";

export async function POST(request) {
  const { especie, classe, confianca } = await request.json();

  const [linhas] = await db.query(
    `SELECT d.id, d.especie_id, d.nome, d.sintomas, d.causa, d.recomendacao
     FROM deficiencias d
     JOIN especies e ON e.id = d.especie_id
     WHERE e.slug = ? AND d.classe = ?`,
    [especie, classe]
  );

  if (linhas.length === 0) {
    return Response.json({ erro: "Não encontrado" }, { status: 404 });
  }

  const d = linhas[0];
  await db.query(
    "INSERT INTO analises (especie_id, deficiencia_id, confianca) VALUES (?, ?, ?)",
    [d.especie_id, d.id, confianca]
  );

  return Response.json(d);
}