import { useState } from 'react'

import { formatString } from '../../../Utils/formatString'
import usePostCreatedPokemon from '../../../Utils/post/postCreatedPokemon'

import { stats } from '../../../assets/stats'
import { movesOrder } from '../../../assets/movesOrder'
import { natures } from '../../../assets/natures'

import { useUserContext } from '../../../Context/userContext'

import PokemonCard from '../../../Components/PokemonCard'
import useHandleEvChange from '../../../Hooks/useHandleEvChange'
import useHandleIvChange from '../../../Hooks/useHandleIvChange'

import {
  HeldItem,
  Pokemon,
  IvStats,
  EvStats,
} from '../../../Typescript/interfaces'

interface Props {
  pokemon: Pokemon
  heldItems: HeldItem[]
}

export default function FormCreatePokemon({ pokemon, heldItems }: Props) {
  const { currentUser } = useUserContext()

  const [name, setName] = useState<string>(formatString(pokemon.name))
  const [ability, setAbility] = useState<string>(
    pokemon.abilities[0].ability.name,
  )
  const [nature, setNature] = useState<string>(natures[0])
  const [heldItem, setHeldItem] = useState<string>(heldItems[0].name)
  const [moves, setMoves] = useState<string[]>([
    pokemon.moves[0].move.name,
    pokemon.moves[1].move.name,
    pokemon.moves[2].move.name,
    pokemon.moves[3].move.name,
  ])

  const { evs, decreaseEv, increaseEv, handleEvChange } = useHandleEvChange()

  const { ivs, decreaseIv, increaseIv, handleIvChange } = useHandleIvChange()

  const postCreatedPokemonMutation = usePostCreatedPokemon(
    {
      name: name,
      ability: ability,
      nature: nature,
      held_item: heldItem,
      moves: moves,
      stats: { ...evs, ...ivs },
      user_id: currentUser?.id ?? 0,
      pokemon_name: pokemon.name,
    },
    `${currentUser?.id}`,
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (currentUser === null) return
    postCreatedPokemonMutation.mutate()
  }

  return (
    <form
      className="grid lg:grid-cols-4 gap-3 p-2"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="md:col-span-2 md:row-span-3 w-full">
        <PokemonCard pokemonName={pokemon.name} />
      </div>
      <div>
        <h2>Pokemon Info</h2>
        <label className="flex flex-col">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Ability
          <select
            onChange={(event) => setAbility(event.target.value)}
            value={ability}
          >
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
          <select
            className="text-black"
            onChange={(event) => setNature(event.target.value)}
            value={nature}
          >
            {natures.map((nature: string) => {
              return <option key={nature}>{nature}</option>
            })}
          </select>
        </label>
        <label className="flex flex-col">
          Held Item
          <select
            onChange={(event) => setHeldItem(event.target.value)}
            value={heldItem}
          >
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
        {movesOrder.map((order, index) => {
          return (
            <label className="flex flex-col" key={order}>
              {order} Move
              <select
                className="text-black"
                value={moves[index]}
                onChange={(event) =>
                  setMoves([...moves, (moves[index] = event.target.value)])
                }
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
                  className="bg-slate-200 dark:bg-slate-600 w-8 rounded-xl"
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
                    handleEvChange(Number(event.target.value), stat.evValue)
                  }
                />
                <button
                  className="bg-slate-200 dark:bg-slate-600 w-8 rounded-xl"
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
                  className="bg-slate-200 dark:bg-slate-600 w-8 rounded-xl"
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
                    handleIvChange(Number(event.target.value), stat.ivValue)
                  }
                />
                <button
                  className="bg-slate-200 dark:bg-slate-600 w-8 rounded-xl"
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
        className="bg-slate-200 dark:bg-slate-600 p-4 rounded-xl w-full md:col-span-2"
        type="submit"
      >
        Create Pokemon
      </button>
    </form>
  )
}
