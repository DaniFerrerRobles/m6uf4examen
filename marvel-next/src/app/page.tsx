"use client"
import { useEffect, useState } from "react"

type Character = {
  id: number
  name: string
  img: string
}

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => {

        const transformed = data.map((char: any) => ({
          id: char.id,
          name: char.name,
          img: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        }))
        setCharacters(transformed)
      })
      .catch((err) => console.error("Error:", err))
  }, [])

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Personajes de Marvel</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1.5rem",
          listStyle: "none",
          padding: 0,
        }}
      >
        {characters.map((char) => (
          <li key={char.id} style={{ textAlign: "center" }}>
            <img
              src={char.img}
              alt={char.name}
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
              {char.name}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}