import React from 'react'

const SearchedMovieContext = React.createContext({
  searchedMoviesData: {},
  updateSearchedMovie: () => {},
})

export default SearchedMovieContext
