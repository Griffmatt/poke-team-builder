import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import fetchPokemon from '../Utils/fetchPokemon'

export default function Home() {
  const { data: pokemonArr, isLoading } = useQuery(['pokemon'], fetchPokemon)
  if (isLoading) return <div></div>
  return (
    <div className="grid place-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {pokemonArr?.map((pokemon, index) => {
        return (
          <Link to={`/pokemon/create/${index+1}`} key={pokemon.name} className="p-2">
            <h3>{pokemon.name}</h3>
          </Link>
        )
      })}
    </div>
  )
}
