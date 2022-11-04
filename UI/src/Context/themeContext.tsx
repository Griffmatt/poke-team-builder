import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Context {
  darkMode: boolean
  handleDarkMode: () => void
}
interface Props {
  children: ReactNode
}

const ThemeContext = createContext({} as Context)

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !theme
    ) {
      setDarkMode(true)
    }

    if (theme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  const handleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
      return
    }
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    setDarkMode(true)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
