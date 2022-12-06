import { useQuery } from '@tanstack/react-query'

import fetchSinglePokemon from '../Utils/fetch/Poke_Api/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'
import LoadingSpinner from './LoadingSpinner'

interface Props {
  pokemonName?: string
  createdPokemonName?: string
  amount?:number
}

export default function PokemonCard({
  pokemonName,
  createdPokemonName,
  amount
}: Props) {
  const { data: pokemon, isLoading } = useQuery(['pokemon', pokemonName], () =>
    fetchSinglePokemon(pokemonName),
  )
  if (isLoading) return <div className="text-center mx-auto p-4 rounded-2xl w-full  aspect-[4/5] max-w-[32rem]"><LoadingSpinner/></div>
  return (
    <>
      {pokemon && (
        <div className="text-center mx-auto bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-full aspect-[4/5] max-w-[32rem]">
          <div className="aspect-square lg:w-full">
            <img src={pokemon.sprites.front_default} className="h-full" />
          </div>
          <h3>{formatString(createdPokemonName ?? pokemon.name)}</h3>
          <div className="flex justify-center gap-2">
            {amount !== undefined ? "percentage" : pokemon.types.map((type) => {
              return (
                <h4 key={type.type.name}>{formatString(type.type.name)}</h4>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
