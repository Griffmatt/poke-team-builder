import { NavLink, useNavigate } from 'react-router-dom'
import DarkModeButton from '../../../Components/UI/DarkModeButton'
import { useUserContext } from '../../../Context/userContext'
import { User } from '../../../Typescript/interfaces'

interface Props {
  user: User
}

export default function SideNavBar({ user }: Props) {
  const { currentUser, setCurrentUser } = useUserContext()

  const navigate = useNavigate()

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.setItem('currentUser', JSON.stringify(null))
    navigate('/')
  }
  return (
    <>
      <h1>{user.user_name}'s Profile</h1>
      <NavLink to={''}>Pokemon</NavLink>
      <NavLink to={''}>Teams</NavLink>
      <DarkModeButton />
      {currentUser?.id === user.id ? <button onClick={logoutUser} className="bg-transparent text-dark dark:text-light">LogOut</button> : null}
    </>
  )
}
