import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'
import { useUserContext } from '../../../Context/userContext'

import fetchUsersPokemon from '../../../Utils/fetch/fetchUsersPokemon'

export default function UsersCreatedPokemon() {
  const { userId } = useParams()
  const { currentUser } = useUserContext()
  const { data: pokemonArr, isLoading } = useQuery(['usersPokemon', userId], () =>
    fetchUsersPokemon(userId),
  )
  if (isLoading) return <div></div>
  return (
    <>
      <h1>{currentUser.name}'s Pokemon</h1>
      {pokemonArr && (
        <PokemonGrid>
          {[...pokemonArr].reverse().map((pokemon) => {
            return (
              <Link to={`/pokemon/update/${pokemon.pokemon_id}/${pokemon.id}`} key={pokemon.id} className="p-2">
                <PokemonCard
                  pokemonName={pokemon.pokemon_id}
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
