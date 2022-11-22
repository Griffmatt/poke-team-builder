import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'
import { useUserContext } from '../../../Context/userContext'

import fetchUsersCreatedPokemon from '../../../Utils/fetch/Database/fetchUsersCreatedPokemon'

export default function UsersCreatedPokemon() {
  const { userId } = useParams()
  const { currentUser } = useUserContext()
  const { data: pokemonArr, isLoading } = useQuery(
    ['usersPokemon', userId],
    () => fetchUsersCreatedPokemon(userId),
  )
  if (isLoading) return <div></div>
  return (
    <>
      <h1>{currentUser.name}'s Pokemon</h1>
      {pokemonArr && (
        <PokemonGrid>
          {[...pokemonArr].reverse().map((pokemon) => {
            return (
              <Link
                to={`/pokemon/update/${pokemon.pokemon_name}/${pokemon.id}`}
                key={pokemon.id}
                className="p-2"
              >
                <PokemonCard
                  pokemonName={pokemon.pokemon_name}
                  createdPokemonName={pokemon.name}
                />
              </Link>
            )
          })}
        </PokemonGrid>
      )}
    </>
  )
}
