import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchCreatedPokemon from '../../Utils/fetch/Database/fetchCreatedPokemon'
import fetchHeldItems from '../../Utils/fetch/Poke_Api/fetchHeldItems'
import fetchSinglePokemon from '../../Utils/fetch/Poke_Api/fetchSinglePokemon'
import FormCopyPokemon from './Components/FormCopyPokemon'

export default function CopyPokemon() {
  const { pokemonName, pokemonId } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', pokemonName],
        queryFn: () => fetchSinglePokemon(pokemonName),
      },
      {
        queryKey: ['createdPokemon', pokemonId],
        queryFn: () => fetchCreatedPokemon(pokemonId),
      },
      {
        queryKey: ['held-items'],
        queryFn: fetchHeldItems,
      },
    ],
  })

  const pokemon = results[0].data
  const createdPokemon = results[1].data
  const heldItems = results[2].data

  if (results[0].isLoading) return <LoadingSpinner />

  return (
    <>
      {pokemon && heldItems && createdPokemon && (
        <>
          <h1>Copying pokemon</h1>
          <FormCopyPokemon pokemon={pokemon} heldItems={heldItems} createdPokemon={createdPokemon} />
        </>
      )}
    </>
  )
}