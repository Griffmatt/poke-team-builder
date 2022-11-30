import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUser(userId?: number ) {
  if(userId == null) return null
  const response = await axios.get<any>(`${url}/user/${userId}`)
  return response.data[0]
}