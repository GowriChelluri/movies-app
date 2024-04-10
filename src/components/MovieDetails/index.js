import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=91af57ac251a42fc781975ebb474135d&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=91af57ac251a42fc781975ebb474135d&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cast');
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
    fetchCast();
  }, [movie_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movieDetails) {
    return <p>No movie details available</p>;
  }

  return (
    <div className='single-movie-container'>
      <div className='each-movie-box-container'>
        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="movie-poster" style={{height:'200px',width:'150px',marginRight:'20px'}}/>
        <div style={{display:'flex',flexDirection:'column'}}>
          <h1 style={{fontSize:'20px',margin:'0px'}}>{movieDetails.title}</h1>
          <p style={{fontSize:'15px',color:'blue',marginTop:'8px'}}>Rating: {movieDetails.vote_average}</p>
          <p> {movieDetails.runtime} minutes</p>
          <p style={{fontSize:'14px',marginTop:'0px'}}>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
          <p style={{fontSize:'12px',marginTop:'0px'}}>Release Date: {movieDetails.release_date}</p>
          <p>Overview: {movieDetails.overview}</p>
        </div>
      </div>
      <h1>CAST</h1>
      {cast && (
              <div className="cast-container">
                {cast.map(castMember => (
                  <div className="cast-member" key={castMember.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                      alt={castMember.name}
                      className="cast-image"
                    />
                    <p className="cast-name">{castMember.name}</p>
                    <p className="cast-character">as {castMember.character}</p>
                  </div>
                ))}
              </div>
            )}
    </div>
  );
};

export default MovieDetails;
