import axios from 'axios'
import { CreatedPokemon } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function deleteTeam(teamId: number) {
  console.log(teamId)
  const response = await axios.delete<CreatedPokemon[]>(
    `${url}/teams/team/${teamId}`,
    { data: { teamId } }
  )
  return response.data ?? null
}
