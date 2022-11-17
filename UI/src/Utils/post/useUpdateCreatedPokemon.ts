import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../main'
import { CreatedPokemon } from '../../Typescript/interfaces'
import { IvStats, EvStats } from '../../Typescript/interfaces'


const url = import.meta.env.VITE_BASE_URL

type Stats = IvStats & EvStats

interface Data {
  name: string
  ability: string
  nature: string
  held_item: string
  moves: string[]
  stats: Stats,
  user_id: number
}

export default function useUpdateCreatedPokemon(pokemon: Data, pokemonId?: string) {
    const navigate = useNavigate()
  async function updateCreatedPokemon() {
    console.log(pokemonId)
    const response = await axios.post<Data>(
      `${url}/pokemon/update/${pokemonId}`,
      pokemon,
      {
        params: {
          pokemonId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
    return response.status
  }

  const updateCreatedPokemonMutation = useMutation({
    mutationFn: updateCreatedPokemon,

    onMutate: async () => {
      await queryClient.cancelQueries(['createdPokemon', pokemonId])

      const previousTeams = queryClient.getQueryData([
        'createdPokemon',
        pokemonId,
      ]) as CreatedPokemon
      console.log(pokemon)
      queryClient.setQueryData(
        ['createdPokemon', pokemonId],
        pokemon
      )

      return { previousTeams }
    },
    onError: (err, team, context) => {
      queryClient.setQueryData(
        ['createdPokemon', pokemonId],
        context?.previousTeams,
      )
    },
    onSuccess: () => {
      navigate(`/pokemon/${pokemon.user_id}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['createdPokemon', pokemonId])
    },
  })

  return updateCreatedPokemonMutation
}
