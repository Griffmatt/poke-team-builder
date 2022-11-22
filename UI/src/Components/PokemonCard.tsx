import { useQuery } from '@tanstack/react-query'

import fetchSinglePokemon from '../Utils/fetch/Poke_Api/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

interface Props {
  pokemonName?: string
  createdPokemonName?: string
}

export default function PokemonCard({
  pokemonName,
  createdPokemonName,
}: Props) {
  const { data: pokemon, isLoading } = useQuery(['pokemon', pokemonName], () =>
    fetchSinglePokemon(pokemonName),
  )

  if (isLoading) return <div></div>
  return (
    <>
      {pokemon && (
        <div className="text-center mx-auto bg-slate-200 dark:bg-slate-700 p-4 rounded-2xl h-fit aspect-[4/5] max-w-[32rem]">
          <div className="aspect-square lg:w-full">
            <img src={pokemon.sprites.front_default} className="h-full" />
          </div>
          <h3>{formatString(createdPokemonName ?? pokemon.name)}</h3>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => {
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
