import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import fetchHeldItems from '../Utils/fetch/fetchHeldItems'
import fetchSinglePokemon from '../Utils/fetch/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

import { stats } from '../assets/stats'
import { movesOrder } from '../assets/movesOrder'
import { natures } from '../assets/natures'

import { useUserContext } from '../Context/userContext'

import PokemonCard from '../Components/PokemonCard'

export default function CreatePokemon() {
  const { pokemonName } = useParams()
  const { currentUser } = useUserContext()

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

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("HI")
  }

  const pokemon = results[0].data
  const heldItems = results[1].data

  if (results[0].isLoading) return <div>Loading...</div>

  return (
    <>
      {pokemon && heldItems && (
        <>
          <h1>Creating pokemon</h1>
          <div className="lg:flex justify-center gap-10">
            <PokemonCard pokemonName={pokemon.name} />
            <div className="bg-slate-700 p-4 rounded-2xl">
              <form className="flex flex-col gap-2" onSubmit={(event) => submitForm(event)}>
                <h2>Pokemon Info</h2>
                <label className="flex flex-col">
                  Name <input defaultValue={formatString(pokemon.name)} />
                </label>
                <label className="flex flex-col">
                  Ability
                  <select>
                    {pokemon.abilities.map((ability) => {
                      return (
                        <option key={ability.ability.name}>
                          {formatString(ability.ability.name)}
                        </option>
                      )
                    })}
                  </select>
                </label>
                <label className="flex flex-col">
                  Nature
                  <select className="text-black">
                    {natures.map((nature: string) => {
                      return <option key={nature}>{nature}</option>
                    })}
                  </select>
                </label>
                <label className="flex flex-col">
                  Held Item
                  <select>
                    {heldItems.sort((a, b) => {
                            if (a.name < b.name) {
                              return -1
                            }
                            if (a.name > b.name) {
                              return 1
                            }
                            return 0
                          }).map((heldItem: any) => {
                      return (
                        <option key={heldItem.name}>
                          {formatString(heldItem.name)}
                        </option>
                      )
                    })}
                  </select>
                </label>
                <h2>Moves</h2>
                {movesOrder.map((order, moveOrderIndex) => {
                  return (
                    <label className="flex flex-col" key={order}>
                      {order} Move
                      <select className="text-black">
                        {pokemon.moves
                          .sort((a, b) => {
                            if (a.move.name < b.move.name) {
                              return -1
                            }
                            if (a.move.name > b.move.name) {
                              return 1
                            }
                            return 0
                          })
                          .map(
                            (move: { move: { name: string } }, moveIndex) => {
                              return (
                                <option selected={moveOrderIndex === moveIndex} key={move.move.name}>
                                  {formatString(move.move.name)}
                                </option>
                              )
                            },
                          )}
                      </select>
                    </label>
                  )
                })}
                <h2>Evs</h2>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col" key={stat}>
                      {stat} <input type="number" defaultValue={0} />
                    </label>
                  )
                })}
                <h2>Ivs</h2>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col" key={stat}>
                      {stat} <input type="number" defaultValue={31} />
                    </label>
                  )
                })}
                <button className="bg-slate-500 p-4 rounded-xl" type="submit">Create Pokemon</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
