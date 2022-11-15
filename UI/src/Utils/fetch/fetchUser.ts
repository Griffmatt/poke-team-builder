import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUser(userId?: number ) {
  const response = await axios.get<any>(`${url}/users/${userId}`)
  return response.data[0]
}