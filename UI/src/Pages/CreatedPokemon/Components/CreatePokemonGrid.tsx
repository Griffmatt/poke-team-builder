import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'
import { Pokemon } from '../../../Typescript/interfaces'
import fetchPokemon from '../../../Utils/fetch/Poke_Api/fetchPokemon'

export default function CreatePokemonGrid() {
  let timer: number | undefined
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>()
  const { data, isLoading } = useQuery(['pokemon'], fetchPokemon)
  const pokemonArr = filteredPokemon ?? data

  const debounceFilter = (filterValue: string) => {
    clearTimeout(timer)
    timer = setTimeout(
      () =>
        setFilteredPokemon(
          data?.filter((pokemon) =>
            pokemon.name.startsWith(filterValue.toLowerCase()),
          ),
        ),
      1000,
    )
  }

  if (isLoading) return <div></div>
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row">
        <h1>Choose A Pokemon To Create</h1>
        <input
          className="md:w-[40vw] lg:w-[20vw]"
          type="text"
          placeholder="Search For a Pokemon..."
          onChange={(event) => debounceFilter(event.target.value)}
        />
      </div>
      <PokemonGrid>
        {pokemonArr?.slice(0, 48).map((pokemon) => {
          return (
            <Link
              to={`/pokemon/create/${pokemon.name}`}
              key={pokemon.name}
              className="p-2"
            >
              <PokemonCard pokemonName={pokemon.name} />
            </Link>
          )
        })}
      </PokemonGrid>
    </>
  )
}
