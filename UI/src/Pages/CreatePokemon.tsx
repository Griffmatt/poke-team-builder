import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import fetchHeldItems from '../Utils/fetch/fetchHeldItems'
import fetchSinglePokemon from '../Utils/fetch/fetchSinglePokemon'
import { formatString } from '../Utils/formatString'

import { stats } from '../assets/stats'
import { movesOrder } from '../assets/movesOrder'
import { natures } from '../assets/natures'

import { useUserContext } from '../Context/userContext'

import PokemonCard from '../Components/PokemonCard'
import postCreatedPokemon from '../Utils/post/postCreatedPokemon'
import useHandleEvChange from '../Hooks/useHandleEvChange'
import useHandleIvChange from '../Hooks/useHandleIvChange'

interface EvStats {
  hitpointsEv: number
  attackEv: number
  defenseEv: number
  specialAttackEv: number
  specialDefenseEv: number
  speedEv: number
}

interface IvStats {
  hitpointsIv: number
  attackIv: number
  defenseIv: number
  specialAttackIv: number
  specialDefenseIv: number
  speedIv: number
}

export default function CreatePokemon() {
  const { pokemonName } = useParams()
  const { currentUser } = useUserContext()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const { evs, decreaseEv, increaseEv, handleEvChange } = useHandleEvChange()

  const { ivs, decreaseIv, increaseIv, handleIvChange } = useHandleIvChange()

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
          <form
            className="grid lg:grid-cols-4 gap-3 p-2"
            onSubmit={handleSubmit(async (data) => {
              if (currentUser === null) return
              const response = await postCreatedPokemon({
                ...data as {name: string, ability: string, nature:string, held_item: string, first_move: string, second_move: string, third_move: string, fourth_move: string},
                ...ivs,
                ...evs,
                user_id: currentUser.id,
                pokemon_id: pokemon.id,
                id: 0,
              })
              if (response === 200)
                navigate(`/created-pokemon/${currentUser.id}`)
            })}
          >
            <div className="md:col-span-2 md:row-span-3 w-full">
              <PokemonCard pokemonName={pokemon.name} />
            </div>
            <div>
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
            </div>
            <div>
              <h2>Moves</h2>
              {movesOrder.map((order) => {
                return (
                  <label className="flex flex-col" key={order}>
                    {order} Move
                    <select
                      className="text-black"
                      {...register(`${order.toLowerCase()}_move`)}
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
            </div>
            <div>
              <h2>Evs</h2>
              {stats.map((stat) => {
                return (
                  <label className="flex flex-col" key={stat.evValue}>
                    {stat.name}
                    <div className="flex gap-2 w-full">
                      <button
                        className="bg-slate-700 w-8 rounded-xl"
                        onClick={() => decreaseEv(stat.evValue)}
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full"
                        type="number"
                        value={evs[stat.evValue as keyof EvStats]}
                        onChange={(event) =>
                          handleEvChange(
                            Number(event.target.value),
                            stat.evValue,
                          )
                        }
                      />
                      <button
                        className="bg-slate-700 w-8 rounded-xl"
                        onClick={() => increaseEv(stat.evValue)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </label>
                )
              })}
            </div>
            <div>
              <h2>Ivs</h2>
              {stats.map((stat) => {
                return (
                  <label className="flex flex-col" key={stat.ivValue}>
                    {stat.name}
                    <div className="flex gap-2 w-full">
                      <button
                        className="bg-slate-700 w-8 rounded-xl"
                        onClick={() => decreaseIv(stat.ivValue)}
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full"
                        type="number"
                        value={ivs[stat.ivValue as keyof IvStats]}
                        onChange={(event) =>
                          handleIvChange(
                            Number(event.target.value),
                            stat.ivValue,
                          )
                        }
                      />
                      <button
                        className="bg-slate-700 w-8 rounded-xl"
                        onClick={() => increaseIv(stat.ivValue)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </label>
                )
              })}
            </div>
            <button
              className="bg-slate-500 p-4 rounded-xl w-full md:col-span-2"
              type="submit"
            >
              Create Pokemon
            </button>
          </form>
        </>
      )}
    </>
  )
}
