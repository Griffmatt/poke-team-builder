import { Link } from 'react-router-dom'
import CreatePokemonGrid from './Components/CreatePokemonGrid'
import RecentlyCreatedPokemon from './Components/RecentlyCreatedPokemon'

interface Props {
  recentlyCreated?: boolean
}

export default function CreatedPokemon({ recentlyCreated }: Props) {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <Link
          to={'/pokemon'}
          className={`${
            recentlyCreated ? '' : 'border-b-2 border-dark dark:border-light'
          }`}
        >
          Create Pokemon
        </Link>
        <Link
          to={`/pokemon/recent`}
          className={`${
            recentlyCreated ? 'border-b-2 border-dark dark:border-light' : ''
          }`}
        >
          Recent Pokemon
        </Link>
      </div>
      {recentlyCreated ? <RecentlyCreatedPokemon /> : <CreatePokemonGrid />}
    </>
  )
}
