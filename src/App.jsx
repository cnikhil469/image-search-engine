import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'
import { searchImages } from './services/unsplashApi'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentQuery, setCurrentQuery] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleSearchResults = (results, total) => {
    setImages(results)
    setCurrentPage(1)
    setHasMore(total > results.length)
    setError(null)
  }

  const handleLoadMore = async () => {
    if (!hasMore || loading) return
    setLoading(true)
    setError(null)
    try {
      const nextPage = currentPage + 1
      const response = await searchImages(currentQuery, nextPage)
      setImages(prevImages => [...prevImages, ...response.results])
      setCurrentPage(nextPage)
      setHasMore(response.total > (nextPage * 12))
    } catch (error) {
      setError('Failed to load more images. Please try again.')
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
          data-tooltip={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <SearchBar
        onSearchResults={handleSearchResults}
        onLoadingChange={setLoading}
        onQueryChange={setCurrentQuery}
        onError={setError}
      />
      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <ImageGrid images={images} />
      {images.length > 0 && hasMore && (
        <div className="load-more-container">
          <button 
            className="load-more-button"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      <p>Made by <a href="https://github.com/cnikhil469">cnikhil469</a></p>
    </div>
  )
}

export default App