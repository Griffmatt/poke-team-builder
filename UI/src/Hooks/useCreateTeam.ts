import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreatedPokemon } from '../Typescript/interfaces'
import { postTeam } from '../Utils/post/postTeam'


export function useCreateTeam(userId?: number) {
  const navigate = useNavigate()
  const [selectedPokemon, setSelectedPokemon] = useState<CreatedPokemon[]>([])
  const [teamName, setTeamName] = useState('New Team')

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
      return { created_pokemon_id: pokemon.id, name: pokemon.name, pokemon_id: pokemon.pokemon_id }
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

  return {
    addPokemonToTeam,
    removePokemonFromTeam,
    createTeam,
    selectedPokemon,
    teamName,
    setTeamName,
  }
}
