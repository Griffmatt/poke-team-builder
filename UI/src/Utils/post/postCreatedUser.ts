import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface UserData {
  name: string
  user_name: string
  password: string
  is_admin: boolean
}

export const postCreatedUser = async (userData: UserData) => {
  const response = await axios.post<number>(`${url}/user`, userData, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return response.status
}