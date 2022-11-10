import { Link } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import CreateTeam from './Components/CreateTeam'
import TopTeams from './Components/TopTeams'
import UsersTeams from './Components/UsersTeams'

interface Props{
    currentMenu: string
}

export default function Teams({currentMenu}: Props) {
  const { currentUser } = useUserContext()

  return (
    <div>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link
            to={`/teams`}
            className={`${
              currentMenu === 'top-teams'
                ? 'border-b-2 border-black dark:border-white'
                : ''
            }`}
          >
            Top Teams
          </Link>
          <Link
            to={`/teams/${currentUser.id}`}
            className={`${
              currentMenu === 'your-teams'
                ? 'border-b-2 border-black dark:border-white'
                : ''
            }`}
          >
            Your Teams
          </Link>
          <Link
            to={`/teams/create/${currentUser.id}`}
            className={`${
              currentMenu === 'create-team'
                ? 'border-b-2 border-black dark:border-white'
                : ''
            }`}
          >
            Create A Team
          </Link>
        </div>
      ) : null}
      {currentMenu === 'top-teams' && <TopTeams/>}
      {currentMenu === 'your-teams' && <UsersTeams/>}
      {currentMenu === 'create-team' && <CreateTeam/>}
    </div>
  )
}
