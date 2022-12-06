import { CreatedPokemon } from "../Typescript/interfaces"

export const formatPokemonData = (pokemonArr: CreatedPokemon[]) => {
    const pokemonNameMap = new Map<string, number>()
    let pokemonCounted = [] as { name: string, amount: number}[]

    pokemonArr?.forEach((pokemon) => {
      const pokemonValue = pokemonNameMap.get(pokemon.pokemon_name)
      pokemonNameMap.set(pokemon.pokemon_name, (pokemonValue ?? 0) + 1)
    })

    pokemonNameMap.forEach((value, key) =>{
      pokemonCounted = [...pokemonCounted, { name: key, amount: value}]
    })

    const totalPokemon = pokemonCounted.reduce((a, b) => a + b.amount, 0) 
    const pokemonData = pokemonCounted.sort((a, b) => b.amount - a.amount)
    return {pokemonData, totalPokemon}
  }