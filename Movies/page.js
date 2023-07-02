"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";

const apiKey = process.env.TMDB_API_KEY;

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;

    // Fetch configuration
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch configuration");
        }
        return res.json();
      })
      .then((json) => {
        const baseUrl = json.images.secure_base_url;
        const posterSize = json.images.poster_sizes[0];
        const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        return fetch(moviesUrl);
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((json) => {
        const movieNames = json.results.map((movie) => movie.title);
        setMovies(movieNames);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div>
      <h1>Movie Recommendations</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}
