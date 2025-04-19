import {Sling as Hamburger} from 'hamburger-react'
import {BiSearch} from 'react-icons/bi'

import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const NavBar = props => {
  const [isOpen, setOpen] = useState(false)

  const renderSearchBlock = () => (
    <SearchedMovieContext.Consumer>
      {value => {
        const {updateSearchInput, searchInput, getSearchedMoviesData} = value

        const onChangeInput = event => {
          updateSearchInput(event.target.value)
        }

        const updateSearchMovies = event => {
          event.preventDefault()
          const {history} = props
          getSearchedMoviesData()
          history.push('/search')
        }

        return (
          <div className="search-container">
            <input
              className="search-input-box"
              type="search"
              placeholder="Search"
              onChange={onChangeInput}
              value={searchInput}
            />
            <button
              type="button"
              className="search-btn"
              onClick={updateSearchMovies}
            >
              <BiSearch size={14} />
            </button>
          </div>
        )
      }}
    </SearchedMovieContext.Consumer>
  )

  return (
    <div className="navbar-container">
      <h1 className="logo-icon">MoviesDB</h1>
      <div className="search-options-container">
        <div className="icons-container">
          {renderSearchBlock()}
          <div className="burger-icon">
            <Hamburger toggled={isOpen} toggle={setOpen} size={16} />
          </div>
        </div>
        <ul className={`categories-container nav-menu ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className="option-link">
              <h2 type="button" className="option-btn">
                Popular
              </h2>
            </Link>
          </li>
          <li>
            <Link to="/top-rated" className="option-link">
              <h2 type="button" className="option-btn">
                Top Rated
              </h2>
            </Link>
          </li>
          <li>
            <Link to="/upcoming" className="option-link">
              <h2 type="button" className="option-btn">
                Upcoming
              </h2>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default withRouter(NavBar)
