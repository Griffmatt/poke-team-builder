import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface TeamData{
    user_id: number,
      pokemon_ids: number[],
      team_name: string,
      team_style: string,
}

export default async function postTeam(teamData: TeamData) {
  const response = await axios.post<any>(`${url}/team`, teamData, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
  return response.status
}