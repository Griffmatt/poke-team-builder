import axios from 'axios'
import { User } from '../../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default async function fetchUser(userId?: number | string) {
  if(userId == null) return null
  const response = await axios.get<User[]>(`${url}/user/${userId}`)
  return response.data[0]
}