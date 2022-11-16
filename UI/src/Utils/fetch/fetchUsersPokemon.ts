import axios from 'axios'
import { CreatedPokemon } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUsersPokemon(userId?: string) {
  const response = await axios.get<CreatedPokemon[]>(`${url}/pokemon/${userId}`)
  console.log(response.data)
  return response.data
}
