import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'
import Pagination from './components/Pagination'
import { searchImages } from './services/unsplashApi'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentQuery, setCurrentQuery] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleSearchResults = (results, total, pages) => {
    setImages(results)
    setTotalPages(pages)
    setCurrentPage(1)
  }

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setLoading(true)
    try {
      const response = await searchImages(currentQuery, newPage)
      setImages(response.results)
      setCurrentPage(newPage)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Image Search Engine</h1>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <SearchBar
        onSearchResults={handleSearchResults}
        onLoadingChange={setLoading}
        onQueryChange={setCurrentQuery}
      />
      {loading && <p>Loading...</p>}
      <ImageGrid images={images} />
      {images.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <p>Made by <a href="https://github.com/cnikhil469">cnikhil469</a></p>
    </div>
  )
}

export default App