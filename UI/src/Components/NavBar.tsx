import {  NavLink } from 'react-router-dom'
import { useLoginModalContext } from '../Context/loginModalContext'
import { useUserContext } from '../Context/userContext'
import LoginModal from './LoginModal/LoginModal'
import DarkModeButton from './UI/DarkModeButton'

export default function NavBar() {
  const { currentUser } = useUserContext()


  const { setShowLoginModal } = useLoginModalContext()

  if(currentUser === undefined) return null

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
      {currentUser ? null : (
      <DarkModeButton />
      )}
      {currentUser ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'border-b-2 border-dark dark:border-light' : undefined
          }
          to={`/boxes/${currentUser.id}`}
        >
          Boxes
        </NavLink>
      ) : (
        <button
          onClick={() => setShowLoginModal(true)}
          className="bg-transparent text-dark dark:text-light"
        >
          Login
        </button>
      )}
      <LoginModal />
    </div>
  )
}
