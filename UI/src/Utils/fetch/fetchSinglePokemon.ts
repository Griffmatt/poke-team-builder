import axios from 'axios'
import { Pokemon } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_POKE_API_URL

export default async function fetchSinglePokemon(pokemonName?: string) {
  const response = await axios.get<Pokemon>(`${url}pokemon/${pokemonName}`)

  return response.data
}