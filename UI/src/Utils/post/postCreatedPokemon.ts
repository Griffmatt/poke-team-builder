import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../main'
import { CreatedPokemon, EvStats, IvStats } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

type Stats = IvStats & EvStats

interface Data {
  name: string
  ability: string
  nature: string
  held_item: string
  moves: string[]
  stats: Stats
  pokemon_name: string
}

export default function usePostCreatedPokemon(pokemon: Data, userId = 0, accessToken?: string) {
  const navigate = useNavigate()
  async function postCreatedPokemon() {
    const response = await axios.post<Data>(`${url}/pokemon`, pokemon, {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    return response.status
  }

  const postCreatedPokemonMutation = useMutation({
    mutationFn: postCreatedPokemon,

    onMutate: async () => {
      await queryClient.cancelQueries(['usersPokemon', userId])

      const previousCreatedPokemon = queryClient.getQueryData([
        'usersPokemon',
        userId,
      ]) as CreatedPokemon[]

      if (previousCreatedPokemon) {
        queryClient.setQueryData(
          ['usersPokemon', userId],
          [{ ...pokemon, id: 0 }, ...previousCreatedPokemon],
        )
        return { previousCreatedPokemon }
      }
    },
    onError: (err, team, context) => {
      queryClient.setQueryData(
        ['usersPokemon', userId],
        context?.previousCreatedPokemon,
      )
    },
    onSuccess: () => {
      navigate(`/boxes/${userId}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['usersPokemon', userId])
    },
  })

  return postCreatedPokemonMutation
}
