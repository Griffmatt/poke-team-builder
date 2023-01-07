import { useQueries } from '@tanstack/react-query'

import fetchSinglePokemon from '../../Utils/fetch/Poke_Api/fetchSinglePokemon'
import { formatString } from '../../Utils/formatString'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchCreatedPokemon from '../../Utils/fetch/Database/fetchCreatedPokemon'

interface Props {
  pokemonName: string
  pokemonInfo: {
    name: string
    id: number
    pokemon_name: string
  }
}

export default function PokemonCardWithStats({ pokemonName, pokemonInfo }: Props) {


  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', pokemonName],
        queryFn: () => fetchSinglePokemon(pokemonName),
      },
      {
        queryKey: ['createdPokemon', pokemonInfo.id],
        queryFn: () => fetchCreatedPokemon(pokemonInfo.id),
      },
    ]
  })

  const pokemon = results[0].data
  const createdPokemon = results[1].data

  const isLoading = results[0].isLoading || results[1].isLoading

  console.log(pokemon)

  if (isLoading)
    return (
      <div className="text-center mx-auto p-4 rounded-2xl w-full  aspect-[4/5] max-w-[32rem]">
        <LoadingSpinner />
      </div>
    )
  return (
    <>
      {pokemon && createdPokemon && (
        <div className="text-center mx-auto bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-full aspect-[4/5] max-w-[32rem]">
          <div className="aspect-square lg:w-full">
            <img src={pokemon.sprites.front_default} className="h-full" />
          </div>
          <h2>{formatString(createdPokemon.name)}</h2>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => {
              return (
                <h4 key={type.type.name}>{formatString(type.type.name)}</h4>
              )
            })}
          </div>
          <div>
            <div>
              <h2>Ability</h2>
              <p>{createdPokemon?.ability}</p>
            </div>
            <div>
              <h2>Nature</h2>
              <p>{createdPokemon?.nature}</p>
            </div>
            <div>
              <h2>Moves</h2>
              {createdPokemon?.moves.map((move) => {
                return <p>{move}</p>
              })}
            </div>
            <div>
              <h3>EVs</h3>
              <div className="grid grid-cols-3">
                <div>
                  <h3>Hp</h3>
                  <p>{createdPokemon.stats.hitpointsEv}</p>
                </div>
                <div>
                  <h3>Att</h3>
                  <p>{createdPokemon.stats.attackEv}</p>
                </div>
                <div>
                  <h3>Def</h3>
                  <p>{createdPokemon.stats.defenseEv}</p>
                </div>
                <div>
                  <h3>Spa</h3>
                  <p>{createdPokemon.stats.specialAttackEv}</p>
                </div>
                <div>
                  <h3>Spd</h3>
                  <p>{createdPokemon.stats.specialDefenseEv}</p>
                </div>
                <div>
                  <h3>Spa</h3>
                  <p>{createdPokemon.stats.speedEv}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>IVs</h3>
              <div className="grid grid-cols-3">
                <div>
                  <h3>Hp</h3>
                  <p>{createdPokemon.stats.hitpointsIv}</p>
                </div>
                <div>
                  <h3>Att</h3>
                  <p>{createdPokemon.stats.attackEv}</p>
                </div>
                <div>
                  <h3>Def</h3>
                  <p>{createdPokemon.stats.defenseIv}</p>
                </div>
                <div>
                  <h3>Spa</h3>
                  <p>{createdPokemon.stats.specialAttackIv}</p>
                </div>
                <div>
                  <h3>Spd</h3>
                  <p>{createdPokemon.stats.specialDefenseIv}</p>
                </div>
                <div>
                  <h3>Spe</h3>
                  <p>{createdPokemon.stats.speedIv}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
