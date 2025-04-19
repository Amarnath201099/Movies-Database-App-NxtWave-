import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MoviesList from '../MoviesList'
import Pagination from '../Pagination'

import './index.css'

class TopRated extends Component {
  state = {topratedMoviesList: [], totalPages: '', isLoading: true}

  componentDidMount() {
    this.getTopRatedMoviesData()
  }

  getTopRatedMoviesData = async (pageNo = 1) => {
    this.setState({isLoading: true})

    const apiKey = '683445102e37dd8e1342a6724dddcea9'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNo}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    const updatedFormatData = data.results.map(eachMovie => ({
      movieId: eachMovie.id,
      moviePosterPath: `https://image.tmdb.org/t/p/w500/${eachMovie.poster_path}`,
      movieTitle: eachMovie.original_title,
      movieVoteAverage: eachMovie.vote_average,
    }))

    this.setState({
      topratedMoviesList: updatedFormatData,
      totalPages: data.total_pages,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#2091ea" height={40} />
    </div>
  )

  render() {
    const {topratedMoviesList, totalPages, isLoading} = this.state

    return (
      <>
        <NavBar />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <MoviesList moviesData={topratedMoviesList} />
        )}
        <Pagination
          totalPages={totalPages}
          apiCallBack={this.getTopRatedMoviesData}
        />
      </>
    )
  }
}

export default TopRated
