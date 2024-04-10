import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';

const SearchedMoviePage = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const { movie_id } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=91af57ac251a42fc781975ebb474135d&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results:</h1>
      <ul className="movies-container">
        {searchResults.map((movie) => (
          <div className="each-movie-container" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="movie-poster"
                style={{ width: '300px', height: '350px', marginTop: '30px', marginLeft: '30px', marginRight: '30px' }}
              />
            </Link>
            <h1 className="movie-title">{movie.title}</h1>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchedMoviePage;
