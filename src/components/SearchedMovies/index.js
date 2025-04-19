import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MoviesList from '../MoviesList'
import Pagination from '../Pagination'
import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const SearchedMovies = () => (
  <SearchedMovieContext.Consumer>
    {value => {
      const {searchedMoviesData, getSearchedMoviesData, isSearchLoading} = value

      const {searchedMoviesList, totalPages} = searchedMoviesData
      const isSearchFound = searchedMoviesList.length > 0

      const renderSearchContent = () => {
        if (isSearchLoading) {
          return (
            <div className="loader-container">
              <Loader type="Oval" color="#2091ea" height={40} />
            </div>
          )
        }

        if (isSearchFound) {
          return (
            <>
              <MoviesList moviesData={searchedMoviesList} />
              <Pagination
                totalPages={totalPages}
                apiCallBack={getSearchedMoviesData}
              />
            </>
          )
        }

        return (
          <div className="empty-search-container">
            <p>Well, that’s a plot twist — no movies found!</p>
            <p>Try checking the title or browse our top picks instead.</p>
          </div>
        )
      }

      return (
        <>
          <NavBar />
          {renderSearchContent()}
        </>
      )
    }}
  </SearchedMovieContext.Consumer>
)

export default SearchedMovies
