import { useState } from 'react'

import { formatString } from '../../../Utils/formatString'
import usePostCreatedPokemon from '../../../Utils/post/postCreatedPokemon'

import { stats } from '../../../assets/stats'
import { natures } from '../../../assets/natures'

import { useUserContext } from '../../../Context/userContext'

import PokemonCard from '../../../Components/PokemonCard'
import useHandleEvChange from '../../../Hooks/useHandleEvChange'
import useHandleIvChange from '../../../Hooks/useHandleIvChange'
import { useLoginModalContext } from '../../../Context/loginModalContext'

import {
  HeldItem,
  Pokemon,
  IvStats,
  EvStats,
} from '../../../Typescript/interfaces'
import MovesInput from '../../../Components/MovesInput'

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

  const [firstMove, setFirstMove] = useState<string>(pokemon.moves[0].move.name)
  const [secondMove, setSecondMove] = useState<string>(
    pokemon.moves[1].move.name,
  )
  const [thirdMove, setThirdMove] = useState<string>(pokemon.moves[2].move.name)
  const [fourthMove, setFourthMove] = useState<string>(
    pokemon.moves[3].move.name,
  )

  const { evs, decreaseEv, increaseEv, handleEvChange } = useHandleEvChange()

  const { ivs, decreaseIv, increaseIv, handleIvChange } = useHandleIvChange()

  const { setShowLoginModal } = useLoginModalContext()

  const postCreatedPokemonMutation = usePostCreatedPokemon(
    {
      name: name,
      ability: ability,
      nature: nature,
      held_item: heldItem,
      moves: [firstMove, secondMove, thirdMove, fourthMove],
      stats: { ...evs, ...ivs },
      pokemon_name: pokemon.name,
    },
    currentUser?.id,
    currentUser?.accessToken
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (currentUser === null) {
      setShowLoginModal(true)
    }
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
            className="text-dark"
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
      <button className="p-4 rounded-xl w-full md:col-span-2" type="submit">
        Create Pokemon
      </button>
    </form>
  )
}
