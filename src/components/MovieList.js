import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3001/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🎬 Movies List</h1>
        {/* Create Movie button */}
        <button
          onClick={() => navigate("/add-movie")}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Create Movie
        </button>
      </div>

      <h2>Movies List</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "flex-start",
                gap: "15px",
              }}
            >
              <img
                src={movie.posterPath}
                alt={movie.originalTitle}
                style={{ width: "100px", borderRadius: "6px" }}
              />
              <div>
                <h3>{movie.originalTitle}</h3>
                <p>
                  <strong>Language:</strong> {movie.originalLanguage}
                </p>
                <p>
                  <strong>Release Date:</strong> {movie.releaseDate}
                </p>
                <p>{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
