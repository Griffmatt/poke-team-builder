import axios from 'axios'

import { UsersCreatedTeam } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUsersTeams(userId?: string ) {
  const response = await axios.get<UsersCreatedTeam[]>(`${url}/teams/${userId}`)
  return response.data
}