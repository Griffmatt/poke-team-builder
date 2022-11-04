import axios from 'axios'

const url = import.meta.env.VITE_POKE_API_URL

export default async function fetchSinglePokemon() {
  const response = await axios.get(`${url}item?limit=1607`)

  return response.data
}