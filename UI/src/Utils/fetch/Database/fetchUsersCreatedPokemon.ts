import axios from 'axios'
import { CreatedPokemon } from '../../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUsersCreatedPokemon(userId?: number) {
  if(userId == null) return null
  const response = await axios.get<CreatedPokemon[]>(`${url}/pokemon/users-pokemon/${userId}`)
  return response.data
}
