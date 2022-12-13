import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchAllCreatedPokemon from '../../../Utils/fetch/Database/fetchAllCreatedPokemon'

export default function MostUsedPokemon() {
  const { data: pokemonData, isLoading } = useQuery(
    ['created-pokemon'],
    fetchAllCreatedPokemon,
  )


  return (
    <div className="grid gap-4">
      <h1>Recent Pokemon</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokemonData && (
          <PokemonGrid>
            {pokemonData.map((pokemon) => {
              return (
                <div key={pokemon.name} className="p-2">
                  <PokemonCard
                    pokemonName={pokemon.pokemon_name}
                    createdPokemonName={pokemon.name}
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