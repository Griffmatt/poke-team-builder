import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchAllCreatedPokemon(userName: string) {
  const response = await axios.get<any>(`${url}/user/user-name/${userName}`)
  console.log(response.data)
  return response.data[0]
}