import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  user_name: string
  is_admin: boolean
}

interface Context {
  currentUser: User | null
  setCurrentUser: React.Dispatch<
    React.SetStateAction<User | null>
  >
}
interface Props {
  children: ReactNode
}

const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if(user === null) return
    setCurrentUser(JSON.parse(user))
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
