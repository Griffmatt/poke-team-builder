import axios from 'axios'

const url = import.meta.env.VITE_POKE_API_URL

export default async function fetchSinglePokemon(id?: string) {
  const response = await axios.get(`${url}pokemon/${id}`)

  return response.data
}