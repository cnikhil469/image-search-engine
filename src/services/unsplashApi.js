import { UNSPLASH_API_KEY, BASE_URL } from '../config/constants'

export const searchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${UNSPLASH_API_KEY}`
    )
    const data = await response.json()
    return {
      results: data.results,
      total: data.total,
      totalPages: Math.ceil(data.total / perPage)
    }
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}