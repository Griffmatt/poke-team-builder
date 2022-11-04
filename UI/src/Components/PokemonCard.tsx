import { useQuery } from '@tanstack/react-query'

import fetchSinglePokemon from '../Utils/fetch/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

interface Props {
  pokemonName?: string
}

export default function PokemonCard({ pokemonName }: Props) {
  const { data: pokemon, isLoading } = useQuery(['pokemon', pokemonName], () =>
    fetchSinglePokemon(pokemonName),
  )

  if (isLoading) return <div></div>
  return (
    <>
      {pokemon && (
        <div className="text-center bg-slate-200 dark:bg-slate-700 p-4 rounded-2xl h-44 aspect-[2/3]">
          <div className="aspect-square w-24">
          <img src={pokemon.sprites.front_default} />
          </div>
          <h3>{formatString(pokemon.name)}</h3>
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
