import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'

import SearchedMovieContext from './context/SearchedMovieContext'

import './App.css'

// write your code here
const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchedMoviesData, setSearchedMovie] = useState({
    searchedMoviesList: [],
    totalPages: 0,
  })
  const [isSearchLoading, setIsSearchLoading] = useState(true)

  const updateSearchInput = inputValue => {
    setSearchInput(inputValue)
  }

  const getSearchedMoviesData = async (pageNo = 1, searchedMovieName) => {
    setIsSearchLoading(true)
    const searchQuery = searchedMovieName ?? searchInput

    const apiKey = '683445102e37dd8e1342a6724dddcea9'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageNo}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    const updatedFormatData = data.results.map(eachMovie => ({
      movieId: eachMovie.id,
      moviePosterPath: `https://image.tmdb.org/t/p/w500/${eachMovie.poster_path}`,
      movieTitle: eachMovie.original_title,
      movieVoteAverage: eachMovie.vote_average,
    }))

    const totalPages = data.total_pages

    setSearchedMovie({
      searchedMoviesList: updatedFormatData,
      totalPages,
    })
    setIsSearchLoading(false)
  }

  return (
    <SearchedMovieContext.Provider
      value={{
        searchInput,
        updateSearchInput,
        getSearchedMoviesData,
        isSearchLoading,
        searchedMoviesData,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/search" component={SearchedMovies} />
        <Route exact path="/movie/:id" component={MovieDetails} />
      </Switch>
    </SearchedMovieContext.Provider>
  )
}

export default App
