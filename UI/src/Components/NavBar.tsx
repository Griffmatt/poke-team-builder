import { NavLink } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext'

export default function NavBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
    const user = false

    const navoptions = [
        {
            value: "Home",
            link: "/"
        },
        {
            value: "Pokemon",
            link: "/pokemon"
        },
        {
            value: "Teams",
            link: "/teams"
        },
    ]

  return (
    <div className="flex justify-around p-3 max-w-[40rem] mx-auto">
      {navoptions.map(option =>{
        return(
            <NavLink to={option.link}  className={({ isActive }) =>
            isActive ? "border-b-2 border-black dark:border-white" : undefined
          }>{option.value}</NavLink>
        )
      })}
      <button onClick={handleDarkMode}>
        <h2>{darkMode ? 'Light' : 'Dark'}</h2>
      </button>
      <button>
        <h2>{user? "Logout" : "Login"}</h2>
      </button>
    </div>
  )
}
