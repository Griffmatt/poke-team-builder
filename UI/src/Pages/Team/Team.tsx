import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PokemonCard from '../../Components/PokemonCard'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchSingleTeam from '../../Utils/fetch/Database/fetchSingleTeam'
import fetchUser from '../../Utils/fetch/Database/fetchUser'

export default function Team() {
  const { userId, teamId } = useParams()


  const results = useQueries({
    queries: [
      { queryKey: ['user', Number(userId)], queryFn: () => fetchUser(Number(userId))},
      { queryKey: ['team', Number(teamId)], queryFn: () => fetchSingleTeam(Number(teamId))}
    ]
  })

  const isLoading = results[0].isLoading && results[1].isLoading
  
  const teamsUser = results[0].data
  const team = results[1].data

  if(isLoading) return <LoadingSpinner/>

  return (
    <div>
      <h2>{teamsUser?.name}'s Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {team?.pokemon.map((pokemon, index) => {
          return (
            <div key={index} className="p-2">
              <PokemonCard
                pokemonName={pokemon.pokemon_name}
                createdPokemonName={pokemon.name}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
