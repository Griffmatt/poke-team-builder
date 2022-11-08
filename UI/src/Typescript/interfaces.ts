
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