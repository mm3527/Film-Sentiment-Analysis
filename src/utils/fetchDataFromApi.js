import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

/**
 * Fetch data from TMDB API.
 * @param {string} endpoint - API endpoint (e.g. '/genre/movie/list').
 * @param {object} params - Additional query parameters.
 * @returns {Promise<object>} - The response data.
 */
async function fetchDataFromApi(endpoint, params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params }
    });
    return response.data;
  } catch (err) {
    console.error('TMDB fetch error:', err.response?.status, err.message);
    throw err;
  }
}

export default fetchDataFromApi;
