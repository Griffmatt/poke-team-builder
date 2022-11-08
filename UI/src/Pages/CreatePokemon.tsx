import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import fetchHeldItems from '../Utils/fetch/fetchHeldItems'
import fetchSinglePokemon from '../Utils/fetch/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

import { stats } from '../assets/stats'
import { movesOrder } from '../assets/movesOrder'
import { natures } from '../assets/natures'

import { useUserContext } from '../Context/userContext'

import PokemonCard from '../Components/PokemonCard'
import postCreatedPokemon from '../Utils/post/postCreatedPokemon'

interface Stats {
  hitpointsEv: number
  attackEv: number
  defenseEv: number
  specialAttackEv: number
  specialDefenseEv: number
  speedEv: number
}

export default function CreatePokemon() {
  const { pokemonName } = useParams()
  const { currentUser } = useUserContext()
  const { register, handleSubmit } = useForm()

  const [evs, setEvs] = useState({
    hitpointsEv: 0,
    attackEv: 0,
    defenseEv: 0,
    specialAttackEv: 0,
    specialDefenseEv: 0,
    speedEv: 0,
  })

  const decreaseEv = (currentStat: string) => {
    if (evs[currentStat as keyof Stats] - 4 < 0) return
    setEvs({
      ...evs,
      [currentStat]:
        evs[currentStat as keyof Stats] -
        (((4 + (evs[currentStat as keyof Stats] % 4)) % 4) || 4),
    })
  }

  const increaseEv = (currentStat: string) => {
    let total = 4
    for (const stat in evs) {
      total += evs[stat as keyof Stats]
    }
    if (total > 510 || evs[currentStat as keyof Stats] + 4 > 252) return
    setEvs({
      ...evs,
      [currentStat]:
        evs[currentStat as keyof Stats] +
        (4 - (evs[currentStat as keyof Stats] % 4)),
    })
  }

  const handleEvChange = (value: number, currentStat: string) => {
    let total = 510

    for (const stat in evs) {
      if (stat === currentStat) continue
      total -= evs[stat as keyof Stats]
    }

    if (value > total || value > 252) {
      setEvs({ ...evs, [currentStat]: Math.min(252, total) })
      return
    }

    setEvs({ ...evs, [currentStat]: value })
  }

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
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit((data) =>{
                  if(currentUser === null) return
                  postCreatedPokemon({...data, ...evs, userId: currentUser.id, pokemonId: pokemon.id})
                })}
              >
                <h2>Pokemon Info</h2>
                <label className="flex flex-col">
                  Name
                  <input
                    defaultValue={formatString(pokemon.name)}
                    {...register('name')}
                  />
                </label>
                <label className="flex flex-col">
                  Ability
                  <select {...register('ability')}>
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
                  <select className="text-black" {...register('nature')}>
                    {natures.map((nature: string) => {
                      return <option key={nature}>{nature}</option>
                    })}
                  </select>
                </label>
                <label className="flex flex-col">
                  Held Item
                  <select {...register('heldItem')}>
                    {heldItems
                      .sort((a, b) => {
                        if (a.name < b.name) {
                          return -1
                        }
                        if (a.name > b.name) {
                          return 1
                        }
                        return 0
                      })
                      .map((heldItem: any) => {
                        return (
                          <option key={heldItem.name}>
                            {formatString(heldItem.name)}
                          </option>
                        )
                      })}
                  </select>
                </label>
                <h2>Moves</h2>
                {movesOrder.map((order) => {
                  return (
                    <label className="flex flex-col" key={order}>
                      {order} Move
                      <select
                        className="text-black"
                        {...register(`${order.toLowerCase()}Move`)}
                      >
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
                          .map((move: { move: { name: string } }) => {
                            return (
                              <option key={move.move.name}>
                                {formatString(move.move.name)}
                              </option>
                            )
                          })}
                      </select>
                    </label>
                  )
                })}
                <h2>Evs</h2>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col" key={stat.evValue}>
                      {stat.name}
                      <button
                        onClick={() => decreaseEv(stat.evValue)}
                        type="button"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={evs[stat.evValue as keyof Stats]}
                        onChange={(event) =>
                          handleEvChange(Number(event.target.value), stat.evValue)
                        }
                      />
                      <button
                        onClick={() => increaseEv(stat.evValue)}
                        type="button"
                      >
                        +
                      </button>
                    </label>
                  )
                })}
                <h2>Ivs</h2>
                {stats.map((stat) => {
                  return (
                    <label className="flex flex-col" key={stat.ivValue}>
                      {stat.name}
                      <input
                        type="number"
                        defaultValue={31}
                        {...register(stat.ivValue, {
                          valueAsNumber: true,
                        })}
                      />
                    </label>
                  )
                })}
                <button className="bg-slate-500 p-4 rounded-xl" type="submit">
                  Create Pokemon
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
