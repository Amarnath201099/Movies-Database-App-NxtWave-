import {useState} from 'react'

import './index.css'

const Pagination = props => {
  const [pageNo, setPageNo] = useState(1)
  const {totalPages, apiCallBack} = props

  const previousPage = () => {
    setPageNo(prevState => {
      if (prevState > 1) {
        const newPageNo = prevState - 1
        // Scroll to the top of the page whenever pageNo changes
        window.scrollTo({top: 0, behavior: 'smooth'})
        apiCallBack(newPageNo)
        return newPageNo
      }
      return prevState
    })
  }

  const nextPage = () => {
    setPageNo(prevState => {
      if (prevState < totalPages) {
        const newPageNo = prevState + 1
        // Scroll to the top of the page whenever pageNo changes
        window.scrollTo({top: 0, behavior: 'smooth'})
        apiCallBack(newPageNo)
        return newPageNo
      }
      return prevState
    })
  }

  return (
    <div className="pagination-container">
      <button type="button" className="pagination-btn" onClick={previousPage}>
        Previous
      </button>
      <p className="page-no-style">{pageNo}</p>
      <button type="button" className="pagination-btn" onClick={nextPage}>
        Next
      </button>
    </div>
  )
}

export default Pagination
