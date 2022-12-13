import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchUser from '../../Utils/fetch/Database/fetchUser'
import SideNavBar from './Components/SideNavBar'
import UsersCreatedPokemon from './Components/UsersCreatedPokemon'
import UsersTeams from './Components/UsersTeams'

interface Props{
  teams?: boolean
}

export default function UserBoxes({ teams }: Props) {
  const { userId } = useParams()
  const { data: user, isLoading } = useQuery(['user', userId], () =>
    fetchUser(userId),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex gap-4 justify-center">
          <Link
            to={`/boxes/${userId}`}
            className={`${
              teams ? '' : 'border-b-2 border-dark dark:border-light'
            }`}
          >
            Pokemon
          </Link>
          <Link
            to={`/boxes/${userId}/teams`}
            className={`${
              teams ? 'border-b-2 border-dark dark:border-light' : ''
            }`}
          >
            Teams
          </Link>
        </div>
      {user ? (
        <div className="flex">
          <div className="w-1/4 flex flex-col gap-2 text-center">
            <SideNavBar user={user} />
          </div>
          <div className="w-3/4">
            {teams ? (
              <UsersTeams user={user} />
            ) : (
              <UsersCreatedPokemon user={user} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
