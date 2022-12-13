import { Link, useParams } from 'react-router-dom'
import TopTeams from './Components/TopTeams'
import { useUserContext } from '../../Context/userContext'
import CreateTeam from './Components/CreateTeam'

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
              userId ? '' : 'border-b-2 border-dark dark:border-light'
            }`}
          >
            Create Team
          </Link>
          <Link
            to={`/teams/${currentUser.id}`}
            className={`${
              userId ? 'border-b-2 border-dark dark:border-light' : ''
            }`}
          >
            Recent Teams
          </Link>
        </div>
      ) : null}
      {userId ? <TopTeams /> : <CreateTeam />}
    </div>
  )
}
