// app/api/peliculas/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "TMDB API key no está definida en el entorno" },
      { status: 500 }
    );
  }

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Fallo al contactar TMDB", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener datos del servidor" },
      { status: 500 }
    );
  }
}