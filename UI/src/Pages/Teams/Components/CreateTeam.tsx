import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'
import { CreatedPokemon } from '../../../Typescript/interfaces'
import fetchUsersPokemon from '../../../Utils/fetch/fetchUsersPokemon'
import postTeam from '../../../Utils/post/postTeam'

export default function CreateTeam() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const { data: pokemonArr, isLoading } = useQuery(['user', userId], () =>
    fetchUsersPokemon(userId),
  )
  const [teamName, setTeamName] = useState('New Team')
  const [selectedPokemon, setSelectedPokemon] = useState<CreatedPokemon[]>([])

  const filteredPokemonArr = pokemonArr?.filter(
    (pokemon) =>
      !selectedPokemon.some((pokemonOnTeam) => pokemon.id === pokemonOnTeam.id),
  )

  const addPokemonToTeam = (pokemon: CreatedPokemon) => {
    if (selectedPokemon.length >= 6) return null
    const containsPokemon = selectedPokemon.find(
      (pokemonOnTeam) => pokemonOnTeam.id === pokemon.id,
    )

    if (containsPokemon) return null

    setSelectedPokemon([...selectedPokemon, pokemon])
  }

  const removePokemonFromTeam = (id: number) => {
    const filterOutPokemon = selectedPokemon.filter(
      (pokemon) => pokemon.id !== id,
    )

    setSelectedPokemon(filterOutPokemon)
  }

  const createTeam = async () => {
    if (selectedPokemon.length < 6) return null

    const pokemonIds = selectedPokemon.map((pokemon) => {
      return pokemon.id
    })

    console.log({
      userId: userId,
      pokemonIds: pokemonIds,
      teamName: teamName,
      teamStyle: 'double',
    })

    if (userId == null) return
    const response = await postTeam({
      user_id: Number(userId),
      pokemon_ids: pokemonIds,
      team_name: teamName,
      team_style: 'double',
    })
    if (response === 200) navigate(`/teams/${userId}`)
  }

  if (isLoading) return <div></div>

  return (
    <div className="grid gap-4">
      <h1>Creating New Team</h1>
      <div className="grid gap-3">
        <input
          className="md:w-[40vw] lg:w-[25vw]"
          value={teamName}
          onChange={(event) => setTeamName(event?.target.value)}
        />
        {pokemonArr && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {selectedPokemon.length === 0 ? (
              <div className="w-full aspect-[4/5]"></div>
            ) : (
              selectedPokemon.map((pokemon) => {
                return (
                  <div
                    key={pokemon.id}
                    onClick={() => removePokemonFromTeam(pokemon.id)}
                  >
                    <PokemonCard
                      pokemonName={pokemon.pokemon_id}
                      createdPokemon={pokemon}
                    />
                  </div>
                )
              })
            )}
          </div>
        )}
        <button className="p-3 bg-slate-700 rounded-2xl" onClick={createTeam}>
          Create Team
        </button>
      </div>
      <h1>Griffin's Pokemon</h1>
      {pokemonArr && (
        <PokemonGrid>
          {filteredPokemonArr?.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="p-2"
                onClick={() => addPokemonToTeam(pokemon)}
              >
                <PokemonCard
                  pokemonName={pokemon.pokemon_id}
                  createdPokemon={pokemon}
                />
              </div>
            )
          })}
        </PokemonGrid>
      )}
    </div>
  )
}
