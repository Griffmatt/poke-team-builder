export interface Pokemon{
    name: string,
    types: Pokemon_Type[],
    sprites: Images,
    abilities: Abilities[],
    moves: Moves[]
}

interface Pokemon_Type{
    type: {name: string}
}

interface Images{
    front_default: string
}

interface Abilities{
    ability: string
}

interface Moves{
    move: {name: string}
}