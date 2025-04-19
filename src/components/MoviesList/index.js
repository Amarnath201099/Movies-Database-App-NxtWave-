import {Link} from 'react-router-dom'

import './index.css'

const MoviesList = props => {
  const {moviesData} = props

  return (
    <ul className="movies-container">
      {moviesData.map(eachMovie => (
        <li key={eachMovie.movieId}>
          <img
            src={eachMovie.moviePosterPath}
            alt={eachMovie.movieTitle}
            className="movie-poster-img"
          />
          <div className="movie-info-container">
            <h1 className="movie-title">{eachMovie.movieTitle}</h1>
            <p className="movie-rating">Rating: {eachMovie.movieVoteAverage}</p>
            <Link
              to={`/movie/${eachMovie.movieId}`}
              className="movie-link-style"
            >
              <button type="button" className="view-btn">
                View Details
              </button>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MoviesList
