import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchUsersPokemon from '../../../Utils/fetch/fetchUsersPokemon'

export default function UsersCreatedPokemon() {
  const { userId } = useParams()

  const { data: pokemonArr, isLoading } = useQuery(['user', userId], () =>
    fetchUsersPokemon(userId),
  )

  if (isLoading) return <div></div>
  return (
    <>
      <h1>Griffin's Pokemon</h1>
      {pokemonArr && (
        <PokemonGrid>
          {pokemonArr.map((pokemon) => {
            return (
              <div key={pokemon.id} className="p-2">
                <PokemonCard
                  pokemonName={pokemon.pokemon_id}
                  createdPokemon={pokemon}
                />
              </div>
            )
          })}
        </PokemonGrid>
      )}
    </>
  )
}
