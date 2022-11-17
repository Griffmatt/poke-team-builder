export interface HeldItem {
  name: string
}

export interface Pokemon {
  name: string
  types: Pokemon_Type[]
  sprites: Images
  abilities: Abilities[]
  moves: Moves[]
  id: number
}

export interface CreatedPokemon {
  id: number
  user_id: number
  pokemon_id: number
  name: string
  ability: string
  nature: string
  held_item: string
  moves: string[]
  stats: {
    hitpointsEv: number
    attackEv: number
    defenseEv: number
    specialAttackEv: number
    specialDefenseEv: number
    speedEv: number
    hitpointsIv: number
    attackIv: number
    defenseIv: number
    specialAttackIv: number
    specialDefenseIv: number
    speedIv: number
  }
}

export interface UsersCreatedTeam {
  id: number
  user_id: number
  team_name: string
  team_style: string
  pokemon: UserTeam[]
}
export interface UserTeam {
  id: number
  user_id: number
  team_style: string
  team_name: string
  created_pokemon_id: number
  name: string
  pokemon_id: number
}

interface Pokemon_Type {
  type: { name: string }
}

interface Images {
  front_default: string
}

export interface Abilities {
  ability: { name: string }
}

interface Moves {
  move: { name: string }
}

export interface EvStats {
  hitpointsEv: number
  attackEv: number
  defenseEv: number
  specialAttackEv: number
  specialDefenseEv: number
  speedEv: number
}

export interface IvStats {
  hitpointsIv: number
  attackIv: number
  defenseIv: number
  specialAttackIv: number
  specialDefenseIv: number
  speedIv: number
}
