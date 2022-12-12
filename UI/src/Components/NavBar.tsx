import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLoginModalContext } from '../Context/loginModalContext'
import { useThemeContext } from '../Context/themeContext'
import { useUserContext } from '../Context/userContext'
import LoginModal from './LoginModal/LoginModal'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { currentUser, setCurrentUser } = useUserContext()

  const navigate = useNavigate()

  const { setShowLoginModal } = useLoginModalContext()

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.setItem("currentUser", JSON.stringify(null))
    navigate('/')
  }

  return (
    <div className="flex justify-around p-3 max-w-[40rem] mx-auto">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-dark dark:border-light' : undefined
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pokemon"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-dark dark:border-light' : undefined
        }
      >
        Pokemon
      </NavLink>
      <NavLink
        to="/teams"
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-dark dark:border-light' : undefined
        }
      >
        Teams
      </NavLink>
      <button onClick={handleDarkMode} className="bg-transparent text-dark dark:text-light">{darkMode ? 'Light' : 'Dark'}</button>
      {currentUser ? (
        <Link className="bg-transparent text-dark dark:text-light" to={`/user-profile/${currentUser.id}`}>Profile</Link>
      ) : (
        <button onClick={() => setShowLoginModal(true)} className="bg-transparent text-dark dark:text-light">Login</button>
      )}
      <LoginModal />
    </div>
  )
}
