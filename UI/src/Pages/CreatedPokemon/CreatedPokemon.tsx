import { Link, useParams } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import TopCreatedPokemon from './Components/TopCreatedPokemon'
import UsersCreatedPokemon from './Components/UsersCreatedPokemon'

export default function CreatedPokemon() {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  return (
    <>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link
            to={'/created-pokemon'}
            className={`${
              userId ? '' : 'border-b-2 border-black dark:border-white'
            }`}
          >
            Top Pokemon
          </Link>
          <Link
            to={`/created-pokemon/${currentUser.id}`}
            className={`${
              userId ? 'border-b-2 border-black dark:border-white' : ''
            }`}
          >
            Your Pokemon
          </Link>
        </div>
      ) : null}
      {userId ? <UsersCreatedPokemon /> : <TopCreatedPokemon />}
    </>
  )
}
