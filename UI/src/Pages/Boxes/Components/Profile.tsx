import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../../Context/themeContext'
import { useUserContext } from '../../../Context/userContext'
import { User } from '../../../Typescript/interfaces'
import { formatString } from '../../../Utils/formatString'

interface Props {
  user: User
}

const url = import.meta.env.VITE_BASE_URL

export default function Profile({ user }: Props) {
  const { currentUser, setCurrentUser } = useUserContext()
  const { darkMode, handleDarkMode } = useThemeContext()

  const navigate = useNavigate()

  const handleLogoutUser = async () => {
    setCurrentUser(null)
    await axios.post(`${url}/login/log-out`, [], {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    navigate('/')
  }
  return (
    <div className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-[18rem] mx-auto grid gap-2 ">
      <h2>Trainer's Details</h2>
      <div className="flex gap-2 text-center">
        <h3>Name: </h3>
        <p>{formatString(user.name)}</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>User Name: </h3>
        <p>{user.user_name}</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Favorite Pokemon: </h3>
        <p>Charizard</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Total Pokemon:</h3>
        <p>12</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Total Teams:</h3>
        <p>6</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Total Battles:</h3>
        <p>12</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Battles Won:</h3>
        <p>6</p>
      </div>
      <div className="flex gap-2 text-center">
        <h3>Win Percentage:</h3>
        <p>50%</p>
      </div>
      {currentUser?.id === user.id ? (
        <>
          <button
            onClick={handleDarkMode}
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-xl p-2"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <button
            onClick={handleLogoutUser}
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-xl p-2"
          >
            LogOut
          </button>
        </>
      ) : null}
    </div>
  )
}
