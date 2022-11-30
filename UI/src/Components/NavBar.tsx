import { NavLink } from 'react-router-dom'
import { useLoginModalContext } from '../Context/loginModalContext'
import { useThemeContext } from '../Context/themeContext'
import { useUserContext } from '../Context/userContext'
import LoginModal from './LoginModal/LoginModal'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { currentUser, setCurrentUser } = useUserContext()

  const { setShowLoginModal } = useLoginModalContext()

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.setItem("currentUser", JSON.stringify(null))
  }

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
      {currentUser ? (
        <button onClick={logoutUser}>Logout</button>
      ) : (
        <button onClick={() => setShowLoginModal(true)}>Login</button>
      )}
      <LoginModal />
    </div>
  )
}
