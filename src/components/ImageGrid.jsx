import React from 'react'
import ImageCard from './ImageCard'

function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  )
}

export default ImageGrid 