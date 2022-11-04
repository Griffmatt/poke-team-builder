import axios from 'axios'

const url = import.meta.env.VITE_POKE_API_URL

interface Data{
  results: Pokemon[]
}

interface Pokemon{
  name: string,
  url: string
}

export default async function fetchPokemon() {
  const response = await axios.get<Data>(`${url}pokemon?limit=898`)

  return response.data.results
}
