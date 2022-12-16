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
  user_id: number,
  pokemon_id: number
}

export default function useUpdateCreatedPokemon(pokemon: Data, pokemonId?: string) {
    const navigate = useNavigate()
  async function updateCreatedPokemon() {
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

      const previousPokemon = queryClient.getQueryData([
        'createdPokemon',
        pokemonId,
      ]) as CreatedPokemon
      queryClient.setQueryData(
        ['createdPokemon', pokemonId],
        pokemon
      )

      const previousCreatedPokemon= queryClient.getQueryData(['usersPokemon', pokemon.user_id.toString()]) as CreatedPokemon[]
      if(previousCreatedPokemon?.length > 0){
        const filterPrevious = previousCreatedPokemon.filter(previousPokemon => previousPokemon.id !== Number(pokemonId))
        queryClient.setQueryData(['usersPokemon', pokemon.user_id.toString()], [...filterPrevious, {...pokemon, id: Number(pokemonId)}])
        return { previousCreatedPokemon, previousPokemon }
      }

      return { previousPokemon }
    },
    onError: (err, team, context) => {
      queryClient.setQueryData(
        ['createdPokemon', pokemonId],
        context?.previousPokemon,
      )
    },
    onSuccess: () => {
      navigate(`/boxes/${pokemon.user_id}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['createdPokemon', pokemonId])
    },
  })

  return updateCreatedPokemonMutation
}
