import {
    createContext,
    ReactNode,
    useContext,
    useState
  } from 'react'
  
  interface User{
    id: number,
    name: string,
    userName: string
  }

  interface Context {
    currentUser: User
  }
  interface Props {
    children: ReactNode
  }
  
  const UserContext = createContext({} as Context)
  
  export function useUserContext() {
    return useContext(UserContext)
  }
  
  export function UserContextProvider({ children }: Props) {
    const [currentUser] = useState({
        id: 2,
        name:"Griffin",
        userName:"griffin"

    })
  
    return (
      <UserContext.Provider value={{ currentUser }}>
        {children}
      </UserContext.Provider>
    )
  }
  