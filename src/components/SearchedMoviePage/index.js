import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchedMoviePage = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = '91af57ac251a42fc781975ebb474135d';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            searchQuery
          )}&page=1`
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
      setSearchResults([]); 
    }
  }, [searchQuery]);

  return (
    <ul className='movies-container'>
      {searchResults.map((movie) => (
        <div className="each-movie-container" key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-poster" style={{ width: "300px", height: "350px", marginTop: '30px', marginLeft: '30px', marginRight: '30px' }} />
          </Link>
          <h1 className='movie-title'>{movie.title}</h1>
          <p style={{ fontSize: '15px', color: 'white', marginTop: '8px' }}>Rating: {parseFloat(movie.vote_average).toFixed(1)}</p>
        </div>
      ))}
    </ul>
  );
};

export default SearchedMoviePage;
