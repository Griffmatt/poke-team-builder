import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreatedPokemon } from '../Typescript/interfaces'
import { postTeam } from '../Utils/post/postTeam'

export function useCreateTeam(userId?: number) {
  const navigate = useNavigate()
  const [pokemonOnTeam, setPokemonOnTeam] = useState<CreatedPokemon[]>([])
  const [teamName, setTeamName] = useState('Team Name')
  const [selectedPokemon, setSelectedPokemon] = useState<CreatedPokemon | null>(null)

  const addPokemonToTeam = (pokemon: CreatedPokemon) => {
    if (pokemonOnTeam.length >= 6) return null
    const containsPokemon = pokemonOnTeam.find(
      (pokemonOnTeam) => pokemonOnTeam.id === pokemon.id,
    )

    if (containsPokemon) return null

    setPokemonOnTeam([...pokemonOnTeam, pokemon])
  }

  const removePokemonFromTeam = (id: number) => {
    const filterOutPokemon = pokemonOnTeam.filter(
      (pokemon) => pokemon.id !== id,
    )

    setPokemonOnTeam(filterOutPokemon)
  }

  const createTeam = async () => {
    if (pokemonOnTeam.length < 6) return null

    const pokemonIds = pokemonOnTeam.map((pokemon) => {
      return { created_pokemon_id: pokemon.id }
    })

    if (userId == null) return
    const response = await postTeam({
      user_id: Number(userId),
      pokemon_ids: pokemonIds,
      team_name: teamName,
      team_style: 'double',
    })
    if (response === 200) navigate(`/boxes/${userId}/teams`)
  }

  return {
    addPokemonToTeam,
    removePokemonFromTeam,
    createTeam,
    selectedPokemon,
    setSelectedPokemon,
    pokemonOnTeam,
    teamName,
    setTeamName,
  }
}
