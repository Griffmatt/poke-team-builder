import { useState } from 'react'

import { formatString } from '../../../Utils/formatString'
import useUpdateCreatedPokemon from '../../../Utils/post/useUpdateCreatedPokemon'

import { stats } from '../../../assets/stats'
import { natures } from '../../../assets/natures'

import { useUserContext } from '../../../Context/userContext'

import PokemonCard from '../../../Components/PokemonCard'
import useHandleEvChange from '../../../Hooks/useHandleEvChange'
import useHandleIvChange from '../../../Hooks/useHandleIvChange'

import {
  CreatedPokemon,
  HeldItem,
  Pokemon,
  IvStats,
  EvStats,
} from '../../../Typescript/interfaces'
import { useParams } from 'react-router-dom'
import MovesInput from '../../../Components/MovesInput'

interface Props {
  pokemon: Pokemon
  createdPokemon: CreatedPokemon
  heldItems: HeldItem[]
}

export default function FormUpdatePokemon({
  pokemon,
  heldItems,
  createdPokemon,
}: Props) {
  const { currentUser } = useUserContext()
  const { pokemonId } = useParams()

  const [name, setName] = useState<string>(createdPokemon.name)
  const [ability, setAbility] = useState<string>(createdPokemon.ability)
  const [nature, setNature] = useState<string>(createdPokemon.nature)
  const [heldItem, setHeldItem] = useState<string>(createdPokemon.held_item)
 
  const [firstMove, setFirstMove] = useState<string>(createdPokemon.moves[0])
  const [secondMove, setSecondMove] = useState<string>(
    createdPokemon.moves[1]
  )
  const [thirdMove, setThirdMove] = useState<string>(createdPokemon.moves[2])
  const [fourthMove, setFourthMove] = useState<string>(
    createdPokemon.moves[3]
  )

  console.log(createdPokemon)

  const { evs, decreaseEv, increaseEv, handleEvChange } = useHandleEvChange(
    createdPokemon.stats,
  )

  const { ivs, decreaseIv, increaseIv, handleIvChange } = useHandleIvChange(
    createdPokemon.stats,
  )

  const updateCreatedPokemonMutation = useUpdateCreatedPokemon(
    {
      name: name,
      ability: ability,
      nature: nature,
      held_item: heldItem,
      moves: [firstMove, secondMove, thirdMove, fourthMove],
      stats: { ...evs, ...ivs },
      user_id: createdPokemon.user_id,
      pokemon_id: pokemon.id,
    },
    pokemonId,
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (currentUser === null) return
    updateCreatedPokemonMutation.mutate()
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
            value={formatString(ability)}
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
            value={formatString(nature)}
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
            value={formatString(heldItem)}
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
        <MovesInput
          order={'First'}
          pokemon={pokemon}
          move={firstMove}
          setMove={setFirstMove}
        />
        <MovesInput
          order={'Second'}
          pokemon={pokemon}
          move={secondMove}
          setMove={setSecondMove}
        />
        <MovesInput
          order={'Third'}
          pokemon={pokemon}
          move={thirdMove}
          setMove={setThirdMove}
        />
        <MovesInput
          order={'Fourth'}
          pokemon={pokemon}
          move={fourthMove}
          setMove={setFourthMove}
        />
      </div>
      <div>
        <h2>Evs</h2>
        {stats.map((stat) => {
          return (
            <label className="flex flex-col" key={stat.evValue}>
              {stat.name}
              <div className="flex gap-2 w-full">
                <button
                  className="w-8 rounded-xl"
                  onClick={() => decreaseEv(stat.evValue)}
                  type="button"
                >
                  -
                </button>
                <input
                  className="w-full"
                  value={evs[stat.evValue as keyof EvStats]}
                  onChange={(event) =>
                    handleEvChange(Number(event.target.value), stat.evValue)
                  }
                />
                <button
                  className="w-8 rounded-xl"
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
                  className="w-8 rounded-xl"
                  onClick={() => decreaseIv(stat.ivValue)}
                  type="button"
                >
                  -
                </button>
                <input
                  className="w-full"
                  value={ivs[stat.ivValue as keyof IvStats]}
                  onChange={(event) =>
                    handleIvChange(Number(event.target.value), stat.ivValue)
                  }
                />
                <button
                  className="w-8 rounded-xl"
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
        className="p-4 rounded-xl w-full md:col-span-2"
        type="submit"
      >
        Update Pokemon
      </button>
    </form>
  )
}
