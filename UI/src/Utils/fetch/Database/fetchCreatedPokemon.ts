import axios from 'axios'
import { CreatedPokemon } from '../../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchCreatedPokemon(createdPokemonId?: number) {
  const response = await axios.get<CreatedPokemon[]>(`${url}/pokemon/${createdPokemonId}`)
  return response.data[0]
}