import axios from 'axios'

import { UsersCreatedTeam } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchTeams() {
  const response = await axios.get<UsersCreatedTeam[]>(`${url}/teams`)
  return response.data ?? null
}