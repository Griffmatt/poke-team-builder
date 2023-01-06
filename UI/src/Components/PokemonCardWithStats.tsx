import { useQuery } from '@tanstack/react-query'
import { CreatedPokemon } from '../Typescript/interfaces'

import fetchSinglePokemon from '../Utils/fetch/Poke_Api/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'
import LoadingSpinner from './UI/LoadingSpinner'

interface Props {
  pokemonName: string
  createdPokemon: CreatedPokemon
}

export default function PokemonCard({
  pokemonName,
  createdPokemon,
}: Props) {
  const { data: pokemon, isLoading } = useQuery(['pokemon', pokemonName], () =>
    fetchSinglePokemon(pokemonName),
  )

  if (isLoading)
    return (
      <div className="text-center mx-auto p-4 rounded-2xl w-full  aspect-[4/5] max-w-[32rem]">
        <LoadingSpinner />
      </div>
    )
  return (
    <>
      {pokemon && (
        <div className="text-center mx-auto bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-full aspect-[4/5] max-w-[32rem]">
          <div className="aspect-square lg:w-full">
            <img src={pokemon.sprites.front_default} className="h-full" />
          </div>
          <h3>{formatString(createdPokemon.name)}</h3>
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
