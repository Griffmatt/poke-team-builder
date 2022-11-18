import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'


import fetchHeldItems from '../../Utils/fetch/Poke_Api/fetchHeldItems'
import fetchSinglePokemon from '../../Utils/fetch/Poke_Api/fetchSinglePokemon'
import FormCreatePokemon from './Components/FormCreatePokemon'


export default function CreatePokemon() {
  const { pokemonName } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', pokemonName],
        queryFn: () => fetchSinglePokemon(pokemonName),
        staleTime: 100000,
      },
      {
        queryKey: ['held-items'],
        queryFn: fetchHeldItems,
        staleTime: 100000,
      },
    ],
  })

  const pokemon = results[0].data
  const heldItems = results[1].data

  if (results[0].isLoading) return <div>Loading...</div>

  return (
    <>
      {pokemon && heldItems && (
        <>
          <h1>Creating pokemon</h1>
          <FormCreatePokemon pokemon={pokemon} heldItems={heldItems} />
        </>
      )}
    </>
  )
}
