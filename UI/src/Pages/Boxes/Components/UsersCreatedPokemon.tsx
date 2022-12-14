import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'

import PokemonCard from '../../../Components/PokemonCard'
import fetchUsersCreatedPokemon from '../../../Utils/fetch/Database/fetchUsersCreatedPokemon'
import { User } from '../../../Typescript/interfaces'

interface Props {
  user: User
}

export default function UsersCreatedPokemon({user}: Props) {
  const { userId } = useParams()
  const { data: pokemonArr, isLoading } = useQuery(
    ['usersPokemon', userId],
    () => fetchUsersCreatedPokemon(userId),
  )

  if (isLoading) return <LoadingSpinner />
  return (
    <div className="grid gap-6">
      {pokemonArr && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {[...pokemonArr].reverse().map((pokemon) => {
            return (
              <Link
                to={`/pokemon/update/${pokemon.pokemon_name}/${pokemon.id}`}
                key={pokemon.id}
                className="p-2"
              >
                <PokemonCard
                  pokemonName={pokemon.pokemon_name}
                  createdPokemon={pokemon}
                />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
