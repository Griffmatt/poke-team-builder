import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import fetchSinglePokemon from '../../../Utils/fetch/fetchSinglePokemon'

import fetchHeldItems from '../../../Utils/fetch/fetchHeldItems'
import fetchCreatedPokemon from '../../../Utils/fetch/fetchCreatedPokemon'
import FormCreatedPokemon from './FormUpdatePokemon'

export default function CreatePokemon() {
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

  const loaded = pokemon && createdPokemon && heldItems

  if (results[0].isLoading) return <div>Loading...</div>

  return (
    <>
      {loaded && (
        <>
          <h1>Updating {createdPokemon.name}</h1>
          <FormCreatedPokemon
            pokemon={pokemon}
            createdPokemon={createdPokemon}
            heldItems={heldItems}
          />
        </>
      )}
    </>
  )
}
