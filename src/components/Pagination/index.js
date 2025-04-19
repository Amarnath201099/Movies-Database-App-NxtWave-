import {useState, useEffect} from 'react'
import './index.css'

const Pagination = props => {
  const {totalPages, currentPage, onPageChange, apiCallBack} = props

  // Use internal state only if currentPage not provided
  const isControlled = currentPage !== undefined && onPageChange !== undefined
  const [internalPage, setInternalPage] = useState(1)

  // Keep internalPage in sync when switching pages via buttons
  useEffect(() => {
    if (isControlled) {
      setInternalPage(currentPage)
    }
  }, [currentPage])

  const handlePrevious = () => {
    const pageToSet = isControlled ? currentPage : internalPage

    if (pageToSet > 1) {
      const newPage = pageToSet - 1
      window.scrollTo({top: 0, behavior: 'smooth'})

      if (isControlled) {
        onPageChange(newPage)
      } else {
        setInternalPage(newPage)
        apiCallBack(newPage)
      }
    }
  }

  const handleNext = () => {
    const pageToSet = isControlled ? currentPage : internalPage

    if (pageToSet < totalPages) {
      const newPage = pageToSet + 1
      window.scrollTo({top: 0, behavior: 'smooth'})

      if (isControlled) {
        onPageChange(newPage)
      } else {
        setInternalPage(newPage)
        apiCallBack(newPage)
      }
    }
  }

  const displayPage = isControlled ? currentPage : internalPage

  return (
    <div className="pagination-container">
      <button type="button" className="pagination-btn" onClick={handlePrevious}>
        Previous
      </button>
      <p className="page-no-style">{displayPage}</p>
      <button type="button" className="pagination-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default Pagination
