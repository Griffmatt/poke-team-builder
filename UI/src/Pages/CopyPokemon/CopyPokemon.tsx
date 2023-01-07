import { useQueries } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchCreatedPokemon from '../../Utils/fetch/Database/fetchCreatedPokemon'
import fetchHeldItems from '../../Utils/fetch/Poke_Api/fetchHeldItems'
import fetchSinglePokemon from '../../Utils/fetch/Poke_Api/fetchSinglePokemon'
import FormCopyPokemon from './Components/FormCopyPokemon'

export default function CopyPokemon() {
  const { pokemonName, pokemonId } = useParams()

  const navigate = useNavigate()

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

  const isLoading = results[0].isLoading || results[1].isLoading

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      {pokemon && heldItems && createdPokemon && (
        <>
          <button onClick={() => navigate(-1)} className="bg-transparent">
            Back
          </button>
          <h1>Copying pokemon</h1>
          <FormCopyPokemon
            pokemon={pokemon}
            heldItems={heldItems}
            createdPokemon={createdPokemon}
          />
        </>
      )}
    </>
  )
}
