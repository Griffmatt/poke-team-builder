import { Link, useNavigate } from 'react-router-dom'
import TopTeams from './Components/TopTeams'
import { useUserContext } from '../../Context/userContext'
import CreateTeam from './Components/CreateTeam'
import { useEffect } from 'react'

interface Props {
  create?: boolean
}

export default function Teams({ create }: Props) {
  const { currentUser } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser === null) {
      navigate('/teams')
    }
  }, [])

  return (
    <div>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link
            to={`/teams`}
            className={`${
              create ? '' : 'border-b-2 border-dark dark:border-light'
            }`}
          >
            Recent Teams
          </Link>
          <Link
            to={`/teams/create`}
            className={`${
              create ? 'border-b-2 border-dark dark:border-light' : ''
            }`}
          >
            Create Team
          </Link>
        </div>
      ) : null}
      {create ? <CreateTeam /> : <TopTeams />}
    </div>
  )
}
