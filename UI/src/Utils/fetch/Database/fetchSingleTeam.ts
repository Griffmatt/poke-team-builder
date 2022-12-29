import axios from 'axios'
import { UsersCreatedTeam } from '../../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUsersTeams(teamId?: number ) {
  if(teamId == null) return null
  const response = await axios.get<UsersCreatedTeam[]>(`${url}/teams/team/${teamId}`)
  return response.data[0]
}