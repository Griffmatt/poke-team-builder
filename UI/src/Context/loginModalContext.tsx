import {
    createContext,
    ReactNode,
    useContext,
    useState,
  } from 'react'
  
  interface Context {
    showLoginModal: boolean
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  }
  interface Props {
    children: ReactNode
  }
  
  const ThemeContext = createContext({} as Context)
  
  export function useLoginModalContext() {
    return useContext(ThemeContext)
  }
  
  export function LoginModalContextProvider({ children }: Props) {
    const [showLoginModal, setShowLoginModal] = useState(false)
  

    return (
      <ThemeContext.Provider value={{ showLoginModal, setShowLoginModal }}>
        {children}
      </ThemeContext.Provider>
    )
  }