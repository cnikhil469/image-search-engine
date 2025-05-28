import React from 'react'

function ImageCard({ image }) {
  return (
    <div className="image-card">
      <img src={image.urls.regular} alt={image.alt_description} />
    </div>
  )
}

export default ImageCard 