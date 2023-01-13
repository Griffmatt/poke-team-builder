import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface Response {
    exists: boolean
}

export default async function checkUserNameAvailable(userName: string) {
  const response = await axios.get<Response[]>(`${url}/user/user-name/${userName}`)
  return response.data[0].exists
}