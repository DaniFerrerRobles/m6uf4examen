// app/api/peliculas/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}