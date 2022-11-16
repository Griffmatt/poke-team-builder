import { Link, useParams } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import CreatePokemonGrid from './Components/CreatePokemonGrid'
import UsersCreatedPokemon from './Components/UsersCreatedPokemon'

export default function CreatedPokemon() {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  return (
    <>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link
            to={'/pokemon'}
            className={`${
              userId ? '' : 'border-b-2 border-black dark:border-white'
            }`}
          >
            Create Pokemon
          </Link>
          <Link
            to={`/pokemon/${currentUser.id}`}
            className={`${
              userId ? 'border-b-2 border-black dark:border-white' : ''
            }`}
          >
            Your Pokemon
          </Link>
        </div>
      ) : null}
      {userId ? <UsersCreatedPokemon /> : <CreatePokemonGrid />}
    </>
  )
}
