import { useQuery } from '@tanstack/react-query'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchAllCreatedPokemon from '../../../Utils/fetch/fetchAllCreatedPokemon'

export default function CreatedPokemon() {
  const { data: pokemonArr, isLoading } = useQuery(
    ['created-pokemon'],
    fetchAllCreatedPokemon,
  )

  if (isLoading) return <div></div>
  return (
    <>
      <h1>Top Created pokemon</h1>
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
