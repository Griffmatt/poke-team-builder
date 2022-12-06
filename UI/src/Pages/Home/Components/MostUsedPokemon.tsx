import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/LoadingSpinner'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchAllCreatedPokemon from '../../../Utils/fetch/Database/fetchAllCreatedPokemon'

export default function MostUsedPokemon() {
  const { data: pokemonArr, isLoading } = useQuery(
    ['created-pokemon'],
    fetchAllCreatedPokemon,
  )

  return (
    <div className="grid gap-4">
      <h1>Most Used pokemon</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokemonArr && (
          <PokemonGrid>
            {pokemonArr.slice(0, 6).map((pokemon) => {
              return (
                <div key={pokemon.id} className="p-2">
                  <PokemonCard
                    pokemonName={pokemon.pokemon_name}
                    amount={0}
                  />
                </div>
              )
            })}
          </PokemonGrid>
        )
      )}
    </div>
  )
}
