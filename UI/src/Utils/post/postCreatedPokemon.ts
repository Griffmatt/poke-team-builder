import axios from 'axios'
import { CreatedPokemon } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function postCreatedPokemon(pokemon: CreatedPokemon) {
  const response = await axios.post<CreatedPokemon>(`${url}/pokemon`, pokemon, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
  return response.status
}