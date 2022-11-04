import { NavLink } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
    const user = false
  return (
    <div className="flex justify-around p-3 max-w-[30rem] mx-auto">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pokemon">Pokemon</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <button onClick={handleDarkMode}>
        <h2>{darkMode ? 'Light' : 'Dark'}</h2>
      </button>
      <button>
        <h2>{user? "Logout" : "Login"}</h2>
      </button>
    </div>
  )
}
