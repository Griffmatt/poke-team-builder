import { NavLink } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const user = false

  return (
    <div className="flex justify-around p-3 max-w-[40rem] mx-auto">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-black dark:border-white' : undefined
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pokemon"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-black dark:border-white' : undefined
        }
      >
        Pokemon
      </NavLink>
      <NavLink
        to="/teams"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-black dark:border-white' : undefined
        }
      >
        Teams
      </NavLink>
      <button onClick={handleDarkMode}>{darkMode ? 'Light' : 'Dark'}</button>
      <button>{user ? 'Logout' : 'Login'}</button>
    </div>
  )
}
