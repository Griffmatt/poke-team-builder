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

  const formatPokemonData = () => {
    const pokemonNameMap = new Map<string, number>()
    let pokemonCounted = [] as { name: string, amount: number}[]

    pokemonArr?.forEach((pokemon) => {
      const pokemonValue = pokemonNameMap.get(pokemon.pokemon_name)
      pokemonNameMap.set(pokemon.pokemon_name, (pokemonValue ?? 0) + 1)
    })

    pokemonNameMap.forEach((value, key) =>{
      pokemonCounted = [...pokemonCounted, { name: key, amount: value}]
    })

    const totalPokemon = pokemonCounted.reduce((a, b) => a + b.amount, 0) 
    const pokemonData = pokemonCounted.sort((a, b) => b.amount - a.amount)
    return {pokemonData, totalPokemon}
  }

  const { pokemonData, totalPokemon} = formatPokemonData()

  const formatPercentage = (amount: number, total: number) => {
    const percentage = (amount/total)*100
    return percentage.toFixed(2)
  }

  return (
    <div className="grid gap-4">
      <h1>Most Used pokemon</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokemonData && (
          <PokemonGrid>
            {pokemonData.slice(0, 6).map((pokemon) => {
              return (
                <div key={pokemon.name} className="p-2">
                  <PokemonCard pokemonName={pokemon.name} amount={formatPercentage(pokemon.amount, totalPokemon)} />
                </div>
              )
            })}
          </PokemonGrid>
        )
      )}
    </div>
  )
}
