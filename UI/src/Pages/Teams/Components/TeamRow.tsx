import { useQuery } from '@tanstack/react-query'
import PokemonCard from '../../../Components/PokemonCard'
import { UsersCreatedTeam } from '../../../Typescript/interfaces'
import fetchUser from '../../../Utils/fetch/fetchUser'

interface Props {
  team: UsersCreatedTeam
}

export default function TeamRow({ team }: Props) {
  const { data: teamsUser, isLoading } = useQuery(['user', team.user_id], () =>
    fetchUser(team.user_id),
  )

  if (isLoading) return <div></div>

  return (
    <>
      {teamsUser && (
        <div key={team.team_id} className="grid gap-2">
          <h2>
            {team.team_name}- Created By: Trainer {teamsUser.name}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6">
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
