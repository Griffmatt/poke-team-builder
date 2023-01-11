import React from 'react'
import { Pokemon } from '../Typescript/interfaces'
import { formatString } from '../Utils/formatString'

interface Props {
  order: string
  pokemon: Pokemon
  move: string
  setMove: React.Dispatch<React.SetStateAction<string>>
}

export default function MovesInput({ order, pokemon, move, setMove }: Props) {
  console.log(move)
  return (
    <label className="flex flex-col">
      {order} Move
      <select
        className="text-dark"
        value={formatString(move)}
        onChange={(event) => setMove(event.target.value)}
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
          .map((moveOption: { move: { name: string } }) => {
            return (
              <option
                key={moveOption.move.name}
              >
                {formatString(moveOption.move.name)}
              </option>
            )
          })}
      </select>
    </label>
  )
}
