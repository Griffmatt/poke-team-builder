import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import fetchSinglePokemon from '../../Utils/fetch/Poke_Api/fetchSinglePokemon'

import fetchHeldItems from '../../Utils/fetch/Poke_Api/fetchHeldItems'
import fetchCreatedPokemon from '../../Utils/fetch/Database/fetchCreatedPokemon'
import FormUpdatePokemon from './Components/FormUpdatePokemon'

export default function UpdatePokemon() {
  const { pokemonName, pokemonId } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', pokemonName],
        queryFn: () => fetchSinglePokemon(pokemonName),
      },
      {
        queryKey: ['createdPokemon', Number(pokemonId)],
        queryFn: () => fetchCreatedPokemon(Number(pokemonId)),
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
          <FormUpdatePokemon
            pokemon={pokemon}
            createdPokemon={createdPokemon}
            heldItems={heldItems}
          />
        </>
      )}
    </>
  )
}
