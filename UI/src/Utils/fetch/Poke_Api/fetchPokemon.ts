import axios from 'axios'
import { Pokemon } from '../../../Typescript/interfaces'

interface Data {
  results: Pokemon[]
}

const url = import.meta.env.VITE_POKE_API_URL

export default async function fetchPokemon() {
  const response = await axios.get<Data>(`${url}pokemon?limit=898`)

  return response.data.results
}
