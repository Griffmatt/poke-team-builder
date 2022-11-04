import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import fetchHeldItems from '../Utils/fetch/fetchHeldItems'
import fetchSinglePokemon from '../Utils/fetch/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

import { stats } from '../assets/stats'
import { moves } from '../assets/movesOrder'
import { natures } from '../assets/natures'
import PokemonCard from '../Components/PokemonCard'

export default function CreatePokemon() {
  const { pokemonName } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', pokemonName],
        queryFn: () => fetchSinglePokemon(pokemonName),
        staleTime: Infinity,
      },
      {
        queryKey: ['held-items'],
        queryFn: fetchHeldItems,
        staleTime: Infinity,
      },
    ],
  })

  const pokemon = results[0].data

  if (results[0].isLoading) return <div>Loading...</div>

  return (
    <>
      {pokemon && (
        <>
          <h2>Creating pokemon</h2>
          <div className="lg:flex justify-center gap-10">
            <PokemonCard pokemonName={pokemon.name}/>
            <div>
              <form className="flex flex-col gap-2">
                <label className="flex flex-col">
                  Name <input defaultValue={formatString(pokemon.name)} />
                </label>
                <label className="flex flex-col">
                  Ability{' '}
                  <select>
                    {pokemon.abilities.map((ability: any) => {
                      return (
                        <option>{formatString(ability.ability.name)}</option>
                      )
                    })}
                  </select>
                </label>
                <label className="flex flex-col">
                  Nature{' '}
                  <select className="text-black">
                    {natures.map((nature: string) => {
                      return <option>{nature}</option>
                    })}
                  </select>
                </label>
                <label className="flex flex-col">
                  Held Item <input />
                </label>
                <h4>Moves</h4>
                {moves.map((move) => {
                  return (
                    <label className="flex flex-col">
                      {move} Move{' '}
                      <select className="text-black">
                        {pokemon.moves
                          .sort(
                            (
                              a,
                              b,
                            ) => {
                              if (a.move.name < b.move.name) {
                                return -1
                              }
                              if (a.move.name > b.move.name) {
                                return 1
                              }
                              return 0
                            },
                          )
                          .map((move: { move: { name: string } }) => {
                            return (
                              <option>{formatString(move.move.name)}</option>
                            )
                          })}
                      </select>
                    </label>
                  )
                })}
                <h4>Evs</h4>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col">
                      {stat} <input type="number" />
                    </label>
                  )
                })}
                <h4>Ivs</h4>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col">
                      {stat} <input type="number" />
                    </label>
                  )
                })}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
