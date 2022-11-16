import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PokemonCard from '../../../Components/PokemonCard'
import { useUserContext } from '../../../Context/userContext'
import { UsersCreatedTeam } from '../../../Typescript/interfaces'
import useDeleteTeam from '../../../Utils/delete/useDeleteTeam'
import fetchUser from '../../../Utils/fetch/fetchUser'

interface Props {
  team: UsersCreatedTeam
}

export default function TeamRow({ team }: Props) {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  const { data: teamsUser, isLoading } = useQuery(['user', team.user_id], () =>
    fetchUser(team.user_id),
  )
  const deleteTeamMutation = useDeleteTeam(team.id, userId)

  if (isLoading) return <div></div>

  return (
    <>
      {teamsUser && (
        <div className="grid gap-4">
          <div className="flex justify-between align-middle">
            <div>
              <h2>{team.team_name}</h2>
              <h2>{teamsUser.name}</h2>
            </div>
            {Number(userId) === currentUser.id ? (
              <button
                className="bg-slate-200 dark:bg-slate-600 py-2 px-4 rounded-2xl"
                onClick={() => deleteTeamMutation.mutate()}
              >
                Delete Team
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6">
            {team.pokemon.map((pokemon, index) => {
              return (
                <div key={index} className="p-2">
                  <PokemonCard
                    pokemonName={pokemon.pokemon_id}
                    createdPokemonName={pokemon.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
