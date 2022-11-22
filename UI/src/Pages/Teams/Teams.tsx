import { Link, useParams } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import CreateTeam from './Components/CreateTeam'
import UsersTeams from './Components/UsersTeams'

export default function Teams() {
  const { currentUser } = useUserContext()
  const { userId } = useParams()

  return (
    <div>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link
            to={`/teams`}
            className={`${
              userId ? '' : 'border-b-2 border-black dark:border-white'
            }`}
          >
            Create Team
          </Link>
          <Link
            to={`/teams/${currentUser.id}`}
            className={`${
              userId ? 'border-b-2 border-black dark:border-white' : ''
            }`}
          >
            Your Teams
          </Link>
        </div>
      ) : null}
      {userId ? <UsersTeams /> : <CreateTeam />}
    </div>
  )
}
