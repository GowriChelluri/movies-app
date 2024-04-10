import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './index.css'

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=91af57ac251a42fc781975ebb474135d&language=en-US&page=1"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results)
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
   
      
      <ul className='movies-container'>
        {movies.map((movie) => (
          <div classNmae="each-movie-container">
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-poster" style={{width:"300px",height:"350px",marginTop:'30px',marginLeft:'30px',marginRight:'30px'}}/></Link>
            <h1 key={movie.id} className='movie-title'>{movie.title}</h1>
          </div>
        ))}
      </ul>
    
  );
};

export default UpcomingMovies;
