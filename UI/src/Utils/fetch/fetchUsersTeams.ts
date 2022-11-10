import axios from 'axios'

import { UserTeam } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUsersTeams(userId?: string ) {
  const response = await axios.get<UserTeam[]>(`${url}/teams/${userId}`)
  return response.data ?? null
}