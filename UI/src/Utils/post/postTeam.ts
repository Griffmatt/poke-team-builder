import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface TeamData {
  user_id: number
  pokemon_ids: {
    created_pokemon_id: number
  }[]
  team_name: string
  team_style: string
}

export const postTeam = async (teamData: TeamData, accessToken?: string) => {
  const response = await axios.post<number>(`${url}/teams`, teamData, {
    withCredentials: true,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`
    },
  })
  return response.status
}
