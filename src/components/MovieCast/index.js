import React, { useState, useEffect } from 'react';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=91af57ac251a42fc781975ebb474135d&language=en-US&page=1`
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

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2 style={{marginLeft:'20px'}}>Cast</h2>
      <div className="cast-container">
        {cast.map((actor) => (
          <div key={actor.id} className="cast-member">
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="cast-image"
              />
            )}
            <p className="cast-name">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
