import axios from "axios";

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

  try {
    const response = await axios.get(url);
    return Response.json(response.data.results);
  } catch (error) {
    console.error("Error al obtener películas populares:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener películas populares" }),
      { status: 500 }
    );
  }
}