import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface UserData {
  user_name: string
  password: string
}

interface User {
  id: number
  name: string
  user_name: string
  is_admin: boolean
}

export const loginUser = async (userData: UserData) => {
  const response = await axios.post<User[]>(`${url}/user/login`, userData, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return response.data[0]
}
