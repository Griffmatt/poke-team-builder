import {ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../../Context/themeContext'
import { useUserContext } from '../../../Context/userContext'
import { User } from '../../../Typescript/interfaces'
import { formatString } from '../../../Utils/formatString'

interface Props {
  user: User
}

function DetailWrapper({ children }: { children: ReactNode }) {
  return(<div className="flex gap-2 text-center">{children}</div>)
}

export default function Profile({ user }: Props) {
  const { currentUser, setCurrentUser } = useUserContext()
  const { darkMode, handleDarkMode } = useThemeContext()

  const navigate = useNavigate()

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.setItem('currentUser', JSON.stringify(null))
    navigate('/')
  }
  return (
    <div className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-[18rem] mx-auto grid gap-2 ">
      <h2>Trainer's Details</h2>
      <DetailWrapper><h3>Name: </h3><p>{formatString(user.name)}</p></DetailWrapper>
      <DetailWrapper><h3>User Name: </h3><p>{user.user_name}</p></DetailWrapper>
      <DetailWrapper><h3>Favorite Pokemon: </h3><p>Charizard</p></DetailWrapper>
      <DetailWrapper><h3>Total Pokemon:</h3><p>12</p></DetailWrapper>
      <DetailWrapper><h3>Total Teams:</h3><p>6</p></DetailWrapper>
      <DetailWrapper><h3>Total Battles:</h3><p>12</p></DetailWrapper>
      <DetailWrapper><h3>Battles Won:</h3><p>6</p></DetailWrapper>
      <DetailWrapper><h3>Win Percentage:</h3><p>50%</p></DetailWrapper>
      {currentUser?.id === user.id ? (
        <>
          <button
      onClick={handleDarkMode}
      className="bg-light dark:bg-dark text-dark dark:text-light rounded-xl p-2"
    >
      {darkMode ? 'Light' : 'Dark'}
    </button>
          <button
            onClick={logoutUser}
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-xl p-2"
          >
            LogOut
          </button>
        </>
      ) : null}
    </div>
  )
}
