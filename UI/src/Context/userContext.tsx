import axios from 'axios'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { User } from '../Typescript/interfaces'



interface Context {
  currentUser?: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}
interface Props {
  children: ReactNode
}

const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>()

  useEffect(() => {
    const loginUserWithToken = async () => {
      const url = import.meta.env.VITE_BASE_URL
      const response = await axios.get<User>(`${url}/login/with-token`, {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (response.data === null) {
        setCurrentUser(null)
        return response.data
      }
      setCurrentUser(response.data)
      return response.data
    }
    loginUserWithToken()
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
