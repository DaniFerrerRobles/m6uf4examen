import axios from "axios";
import CryptoJS from "crypto-js";

export async function GET() {
  const ts = Date.now().toString();
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await axios.get(url);
    return Response.json(response.data.data.results);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener personajes" }),
      { status: 500 }
    );
  }
}