import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import PokemonCard from '../Components/PokemonCard'
import fetchPokemon from '../Utils/fetch/fetchPokemon'

export default function Home() {
  const { data: pokemonArr, isLoading } = useQuery(['pokemon'], fetchPokemon)
  if (isLoading) return <div></div>
  return (
    <div className="grid place-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {pokemonArr?.slice(0, 48).map((pokemon, index) => {
        return (
          <Link
            to={`/create/${pokemon.name}`}
            key={pokemon.name}
            className="p-2"
          >
            <PokemonCard pokemonName={pokemon.name}/>
          </Link>
        )
      })}
    </div>
  )
}
