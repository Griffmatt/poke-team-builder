import { useQueries } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'

import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'

import fetchAllCreatedPokemon from '../../../Utils/fetch/Database/fetchAllCreatedPokemon'
import { formatPercentage } from '../../../Utils/formatPercentage'
import { formatPokemonData } from '../../../Utils/formatPokemonData'
import fetchPokemonOnTeam from '../../../Utils/fetch/Database/fetchPokemonOnTeam'

export default function CommonTeamMates() {
  const results = useQueries({
    queries: [
      { queryKey: ['created-pokemon'], queryFn: fetchAllCreatedPokemon, staleTime: Infinity},
      { queryKey: ['pokemon-on-team'], queryFn: fetchPokemonOnTeam, staleTime: Infinity}
    ]
  })

  const isLoading = results[0].isLoading && results[1].isLoading
  const pokemonOnTeam = results[1].data

  console.log(pokemonOnTeam)

  const { pokemonData, totalPokemon } = formatPokemonData(results[0].data ?? [])

  const teammates = [] as string[][]

  const commonTeams = () => {
    pokemonData.forEach((pokemon, index) =>{
        let teams = [] as number[]
        teammates[index] = [pokemon.name]

        pokemonOnTeam?.forEach(pokemonTeam => {
            if(pokemonTeam.pokemon_name === pokemon.name){
                teams.push(...pokemonTeam.teams)
                console.log(...pokemonTeam.teams)
            }
        })

        pokemonOnTeam?.forEach(pokemonTeamMates => {
           if(pokemonTeamMates.teams.some(value => teams.includes(value))){
            teammates[index].push(pokemonTeamMates.pokemon_name)
           }
        })
    })
    console.log(teammates)
  }

  commonTeams()

  return (
    <div className="grid gap-4">
      <h1>Common Teammates</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokemonData && (
          <PokemonGrid>
            {pokemonData.slice(0, 6).map((pokemon) => {
              return (
                <div key={pokemon.name} className="p-2">
                  <PokemonCard
                    pokemonName={pokemon.name}
                    amount={formatPercentage(pokemon.amount, totalPokemon)}
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
