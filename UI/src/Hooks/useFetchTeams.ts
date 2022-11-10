import { useQuery } from '@tanstack/react-query'
import { UsersCreatedTeam, UserTeam } from '../Typescript/interfaces'

export function useFetchTeams(
  fetchCallBack: () => Promise<UserTeam[]>,
  userId?: string,
) {
  const { data, isLoading } = useQuery(['teams', userId], fetchCallBack)

  const pokemonMap = new Map()
  const pokeArr = [] as UsersCreatedTeam[]

  data?.forEach((pokemon) => {
    const key = pokemonMap.get(pokemon.id) ?? []
    pokemonMap.set(pokemon.id, {
        user_id: pokemon.user_id,
      team_name: pokemon.team_name,
      pokemon: [...(key.pokemon ?? []), pokemon],
    })
  })

  pokemonMap.forEach((pokemon) => {
    pokeArr.push(pokemon)
  })

  return { pokeArr, isLoading }
}
