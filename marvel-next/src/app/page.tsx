"use client";

import { useEffect, useState } from "react";

type Pelicula = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

export default function PeliculasPopulares() {
  const [peliculas, setPeliculas] = useState<Pelicula[] | null>(null);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos completos:", data);
        setPeliculas(data.results);
      })
      .catch((err) => console.error("Error al obtener películas:", err));
  }, []);

  if (!peliculas) {
    return <p>Cargando películas populares...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Películas Populares</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} style={{ textAlign: "center" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ marginTop: "0.5rem" }}>{pelicula.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}