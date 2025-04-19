import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'

import './index.css'

class MovieDetails extends Component {
  state = {movieDetails: [], castDetails: [], isLoading: true}

  componentDidMount() {
    // Scroll to the top of the page whenever pageNo changes
    window.scrollTo({top: 0, behavior: 'smooth'})
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: true})

    const apiKey = '683445102e37dd8e1342a6724dddcea9'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const apiCastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`

    const movieDetailsResponse = await fetch(apiUrl)
    const castDetailsResponse = await fetch(apiCastUrl)
    const movieDetailsData = await movieDetailsResponse.json()
    const castDetailsData = await castDetailsResponse.json()

    const updatedFormatMovieDetails = {
      movieName: movieDetailsData.original_title,
      movieImage: `https://image.tmdb.org/t/p/w500/${movieDetailsData.poster_path}`,
      movieRatings: movieDetailsData.vote_average,
      movieDuation: movieDetailsData.runtime,
      movieGenre: movieDetailsData.genres,
      movieReleaseDate: movieDetailsData.release_date,
      movieOverview: movieDetailsData.overview,
    }

    const updatedFormatCastDetails = castDetailsData.cast.map(each => ({
      castId: each.cast_id,
      castImage: `https://image.tmdb.org/t/p/w500/${each.profile_path}`,
      castOriginalName: each.original_name,
      castCharacterName: each.character,
    }))

    this.setState({
      movieDetails: updatedFormatMovieDetails,
      castDetails: updatedFormatCastDetails,
      isLoading: false,
    })
  }

  renderMovieAndCastDetails = () => {
    const {movieDetails, castDetails} = this.state
    const {
      movieName,
      movieRatings,
      movieDuation,
      movieGenre,
      movieReleaseDate,
      movieOverview,
      movieImage,
    } = movieDetails

    const movieGenersDetails = movieGenre.map(each => each.name)

    return (
      <div className="movie-cast-details-container">
        <div className="movie-details-container">
          <div className="movie-details-card">
            <h1 className="movie-details-name">{movieName}</h1>
            <p className="movie-details-rating">Rating: {movieRatings}</p>
            <p>{movieDuation}mins</p>
            <p className="movie-details-genres">
              {movieGenersDetails.join(',\u200B')}
            </p>
            <p>{movieReleaseDate}</p>
            <p className="movie-details-overview">{movieOverview}</p>
          </div>
          <img
            src={movieImage}
            alt={movieName}
            className="movie-details-image"
          />
        </div>
        <div className="cast-container">
          <h2 className="cast-heading">Cast</h2>
          <ul className="cast-list-container">
            {castDetails.map(eachCast => (
              <li key={eachCast.castId}>
                <img
                  src={eachCast.castImage}
                  alt={eachCast.castOriginalName}
                  className="cast-image"
                />
                <p className="cast-name">{eachCast.castOriginalName}</p>
                <p className="cast-character-name">
                  {eachCast.castCharacterName}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#2091ea" height={40} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <>
        <NavBar />
        {isLoading ? this.renderLoader() : this.renderMovieAndCastDetails()}
      </>
    )
  }
}

export default MovieDetails
