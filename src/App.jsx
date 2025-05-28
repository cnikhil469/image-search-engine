import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchResults = (results) => {
    setImages(results)
  }

  return (
    <div className="container">
      <h1>Image Search Engine</h1>
      <SearchBar
        onSearchResults={handleSearchResults}
        onLoadingChange={setLoading}
      />
      {loading && <p>Loading...</p>}
      <ImageGrid images={images} />
      <p>Made by <a href="https://github.com/cnikhil469">cnikhil469</a></p>
    </div>
  )
}

export default App
