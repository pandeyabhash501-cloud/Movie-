import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '694219f1';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (searchText) => {
    const text = searchText || query;
    if (text.trim() === '') return;
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    setResults(data.Search || []);
  };

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  const handleSearch = () => {
    searchMovies();
  };

  const handleMovieClick = async (movie) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
    );
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="app">
      <h1>Movie / TV Show Browser</h1>
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies or TV shows..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>
      {selectedMovie && (
        <div className="details">
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

export default App;