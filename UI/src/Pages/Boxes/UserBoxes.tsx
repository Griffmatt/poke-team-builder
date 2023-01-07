import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchUser from '../../Utils/fetch/Database/fetchUser'
import { formatString } from '../../Utils/formatString'
import Profile from './Components/Profile'
import UsersCreatedPokemon from './Components/UsersCreatedPokemon'
import UsersTeams from './Components/UsersTeams'

interface Props {
  selected: 'pokemon' | 'teams' | 'profile'
}

export default function UserBoxes({ selected }: Props) {
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
            selected === 'pokemon'
              ? 'border-b-2 border-dark dark:border-light'
              : ''
          }`}
        >
          Pokemon
        </Link>
        <Link
          to={`/boxes/${userId}/teams`}
          className={`${
            selected === 'teams'
              ? 'border-b-2 border-dark dark:border-light'
              : ''
          }`}
        >
          Teams
        </Link>
        <Link
          to={`/boxes/${userId}/profile`}
          className={`${
            selected === 'profile'
              ? 'border-b-2 border-dark dark:border-light'
              : ''
          }`}
        >
          Profile
        </Link>
      </div>
      <div className="w-full">
        <h1>{`${formatString(user?.name ?? '')}'s` ?? null} Boxes</h1>
        {user && (
          <>
            {selected === 'pokemon' && <UsersCreatedPokemon user={user} />}
            {selected === 'teams' && <UsersTeams user={user} />}
            {selected === 'profile' && <Profile user={user}/>}
          </>
        )}
      </div>
    </div>
  )
}
