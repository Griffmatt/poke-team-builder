import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const user = false

  const [showLoginModal, setShowLoginModal] = useState(false)

  const LoginModal = () => {
    return (
      <div
        className={`fixed top-0 left-0  w-screen h-screen place-items-center ${
          showLoginModal ? 'grid' : 'hidden'
        }`}
        onClick={() => setShowLoginModal(false)}
      >
        <div
          className="bg-slate-500 rounded-xl p-4 grid gap-4"
          onClick={(event) => event?.stopPropagation()}
        >
          <h2>Login</h2>
          <form className="grid gap-2">
            <input type="text" placeholder="Enter Username" />
            <input type="password" placeholder="Enter Password" />
            <div className="flex justify-around">
              <button
                className="rounded py-1 px-2 bg-slate-400"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button className="rounded py-1 px-2 bg-slate-400">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
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
      <button onClick={() => setShowLoginModal(true)}>
        {user ? 'Logout' : 'Login'}
      </button>
      <LoginModal />
    </div>
  )
}
