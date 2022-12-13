import { Link, useParams } from 'react-router-dom'
import CreatePokemonGrid from './Components/CreatePokemonGrid'
import RecentlyCreatedPokemon from './Components/RecentlyCreatedPokemon'

export default function CreatedPokemon() {
  const { recent } = useParams()

  return (
    <>
      <div className="flex gap-4 justify-center">
        <Link
          to={'/pokemon'}
          className={`${
            recent ? '' : 'border-b-2 border-dark dark:border-light'
          }`}
        >
          Create Pokemon
        </Link>
        <Link
          to={`/pokemon/recent`}
          className={`${
            recent ? 'border-b-2 border-dark dark:border-light' : ''
          }`}
        >
          Recent Pokemon
        </Link>
      </div>
      {recent ? <RecentlyCreatedPokemon /> : <CreatePokemonGrid />}
    </>
  )
}
