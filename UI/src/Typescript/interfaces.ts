
export interface HeldItem{
    name: string
}

export interface Pokemon{
    name: string,
    types: Pokemon_Type[],
    sprites: Images,
    abilities: Abilities[],
    moves: Moves[],
    id: number
}

export interface CreatedPokemon{
    id: number,
    user_id: number,
    pokemon_id: number,
    name: string,
    ability: string,
    nature: string,
    held_item: string
}

interface Pokemon_Type{
    type: {name: string}
}

interface Images{
    front_default: string
}

export interface Abilities{
    ability: {name: string}
}

interface Moves{
    move: {name: string}
}