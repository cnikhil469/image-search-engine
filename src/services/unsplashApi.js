import { UNSPLASH_API_KEY, BASE_URL } from '../config/constants'

export const searchImages = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
} 