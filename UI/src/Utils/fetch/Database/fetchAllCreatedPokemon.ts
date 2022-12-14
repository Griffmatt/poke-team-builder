import axios from 'axios'
import { CreatedPokemon } from '../../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchAllCreatedPokemon() {
  const response = await axios.get<CreatedPokemon[]>(`${url}/pokemon`)
  return response.data
}
