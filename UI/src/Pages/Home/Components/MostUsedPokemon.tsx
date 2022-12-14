import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchAllCreatedPokemon from '../../../Utils/fetch/Database/fetchAllCreatedPokemon'
import { formatPercentage } from '../../../Utils/formatPercentage'
import { formatPokemonData } from '../../../Utils/formatPokemonData'
import { Link } from 'react-router-dom'

export default function MostUsedPokemon() {
  const { data: pokemonArr, isLoading } = useQuery(
    ['created-pokemon'],
    fetchAllCreatedPokemon,
  )

  const { pokemonData, totalPokemon } = formatPokemonData(pokemonArr ?? [])

  return (
    <div className="grid gap-4">
      <h1>Most Used pokemon</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokemonData && (
          <PokemonGrid>
            {pokemonData.map((pokemon) => {
              return (
                <Link to={`/pokemon/create/${pokemon.name}`}key={pokemon.name} className="p-2">
          
                  <PokemonCard
                    pokemonName={pokemon.name}
                    amount={formatPercentage(pokemon.amount, totalPokemon)}
                  />
                </Link>
              )
            })}
          </PokemonGrid>
        )
      )}
    </div>
  )
}
