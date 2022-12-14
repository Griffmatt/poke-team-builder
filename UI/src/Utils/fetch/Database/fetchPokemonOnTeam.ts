import axios from 'axios'

interface Data{
    pokemon_name: string
    id: number
    teams: number[]
}

const url = import.meta.env.VITE_BASE_URL

export default async function fetchPokemonOnTeam() {
  const response = await axios.get<Data[]>(`${url}/pokemon/on-team`)
  return response.data
}