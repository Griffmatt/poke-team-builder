import { useQueries } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PokemonCardWithStats from '../../Components/PokemonCardWithStats'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchSingleTeam from '../../Utils/fetch/Database/fetchSingleTeam'
import fetchUser from '../../Utils/fetch/Database/fetchUser'

export default function Team() {
  const { userId, teamId } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['user', Number(userId)],
        queryFn: () => fetchUser(Number(userId)),
      },
      {
        queryKey: ['team', Number(teamId)],
        queryFn: () => fetchSingleTeam(Number(teamId)),
      },
    ],
  })

  const isLoading = results[0].isLoading && results[1].isLoading

  const teamsUser = results[0].data
  const team = results[1].data

  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex justify-between">
        <button onClick={() => navigate(-1)} className="bg-transparent">
          Back
        </button>
        <button className="py-2 px-3 rounded-2xl">Copy Team</button>
      </div>
      <h2>{teamsUser?.name}'s Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {team?.pokemon.map((pokemon, index) => {
          return (
            <div key={index} className="p-2">
              <Link to={`/pokemon/copy/${pokemon.pokemon_name}/${pokemon.id}`}>
                <div className="text-center mx-auto bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-full">
                  <PokemonCardWithStats
                    pokemonName={pokemon.pokemon_name}
                    pokemonId={pokemon.id}
                  />
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
