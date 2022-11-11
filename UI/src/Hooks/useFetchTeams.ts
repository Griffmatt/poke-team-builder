import { useQuery } from '@tanstack/react-query'
import { UsersCreatedTeam, UserTeam } from '../Typescript/interfaces'

export function useFetchTeams(
  fetchCallBack: () => Promise<UserTeam[]>,
  userId?: string,
) {
  const { data, isLoading } = useQuery(['teams', userId ?? null], fetchCallBack)

  const pokemonMap = new Map()
  const pokeArr = [] as UsersCreatedTeam[]
  data?.forEach((team) => {
    const key = pokemonMap.get(team.id) ?? []
    pokemonMap.set(team.id, {
        user_id: team.user_id,
      team_name: team.team_name,
      team_style: team.team_style,
      team_id: team.id,
      pokemon: [...(key.pokemon ?? []), {name: team.name, pokemon_id: team.pokemon_id, created_pokemon_id: team.created_pokemon_id}],
    })
  })

  pokemonMap.forEach((pokemon) => {
    pokeArr.push(pokemon)
  })

  return { pokeArr, isLoading }
}
