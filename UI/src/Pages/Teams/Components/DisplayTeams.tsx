import PokemonCard from '../../../Components/PokemonCard'
import { UsersCreatedTeam } from '../../../Typescript/interfaces'

interface Props {
  pokeArr: UsersCreatedTeam[]
}

export default function DisplayTeams({ pokeArr }: Props) {
  return (
    <div className="grid gap-4">
      {pokeArr.map((team) => {
        return (
          <div key={team.team_id} className="grid gap-2">
            <h2>{team.team_name}</h2>
            <div className="grid grid-cols-3 md:grid-cols-6">
              {team.pokemon.map((pokemon, index) => {
                return (
                  <div key={index} className="p-2">
                    <PokemonCard
                      pokemonName={pokemon.pokemon_id}
                      createdPokemonName={pokemon.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
