import axios from 'axios'
import { User } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

interface UserData {
  user_name: string
  password: string
}


export const loginUser = async (userData: UserData) => {
  try{
    const response = await axios.post<User>(`${url}/login`, userData, {
    withCredentials: true,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  }) 
  return response.data
} catch (error: any){
  console.log(error.response.data.error)
}
}
