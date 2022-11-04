import { useQueries, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import fetchHeldItems from '../Utils/fetchHeldItems'
import fetchSinglePokemon from '../Utils/fetchSinglePokemon'

export default function CreatePokemon() {
  const { id } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['pokemon', id],
        queryFn: () => fetchSinglePokemon(id),
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

  const stats = [
    'Hitpoints',
    'Attack',
    'Defense',
    'Special Attack',
    'Special Defense',
    'Speed',
  ]
  const moves = ['First', 'Second', 'Third', 'Fourth']
  const natures = [
    'Adamant',
    'Bashful',
    'Bold',
    'Brave',
    'Calm',
    'Careful',
    'Docile',
    'Gentle',
    'Hardy',
    'Hasty',
    'Impish',
    'Jolly',
    'Lax',
    'Lonely',
    'Mild',
    'Modest',
    'Naive',
    'Naughty',
    'Quiet',
    'Quirky',
    'Rash',
    'Relaxed',
    'Sassy',
    'Serious',
    'Timid',
  ]

  const formatString = (string: string) => {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }

  if (results[0].isLoading) return <div>Loading...</div>

  return (
    <>
      {pokemon && (
        <>
          <h2>Creating pokemon</h2>
          <div className="lg:flex justify-center gap-10">
            <div>
              <img src={pokemon.sprites.front_default} />
              <h3>{formatString(pokemon.name)}</h3>
              <div className="flex justify-between">
                {pokemon.types.map((type: { type: { name: string } }) => {
                  return (
                    <h4 key={type.type.name}>{formatString(type.type.name)}</h4>
                  )
                })}
              </div>
            </div>
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
                              a: { move: { name: string } },
                              b: { move: { name: string } },
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
