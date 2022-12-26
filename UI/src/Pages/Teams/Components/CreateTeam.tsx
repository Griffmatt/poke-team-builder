import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'
import PokemonCard from '../../../Components/PokemonCard'
import PokemonGrid from '../../../Components/PokemonGrid'
import { useUserContext } from '../../../Context/userContext'
import { useCreateTeam } from '../../../Hooks/useCreateTeam'
import fetchUsersCreatedPokemon from '../../../Utils/fetch/Database/fetchUsersCreatedPokemon'

export default function CreateTeam() {
  const { currentUser } = useUserContext()
  const { data: pokemonArr, isLoading } = useQuery(
    ['usersPokemon', currentUser?.id],
    () => fetchUsersCreatedPokemon(currentUser?.id.toString()),
  )

  const {
    addPokemonToTeam,
    removePokemonFromTeam,
    createTeam,
    selectedPokemon,
    teamName,
    setTeamName,
  } = useCreateTeam(currentUser?.id)
  const filteredPokemonArr = pokemonArr?.filter(
    (pokemon) =>
      !selectedPokemon.some((pokemonOnTeam) => pokemon.id === pokemonOnTeam.id),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid gap-4">
      <h1>Creating New Team</h1>
      <div className="grid gap-3">
        <input
          className="md:w-[40vw] lg:w-[25vw]"
          value={teamName}
          onChange={(event) => setTeamName(event?.target.value)}
        />
        {pokemonArr && (
          <PokemonGrid>
            {selectedPokemon.length === 0 ? (
              <div className="w-full aspect-[4/5]"></div>
            ) : (
              selectedPokemon.map((pokemon) => {
                return (
                  <div
                    key={pokemon.id}
                    className="p-2"
                    onClick={() => removePokemonFromTeam(pokemon.id)}
                  >
                    <PokemonCard
                      pokemonName={pokemon.pokemon_name}
                      createdPokemon={pokemon}
                    />
                  </div>
                )
              })
            )}
          </PokemonGrid>
        )}
        <button className="p-3 rounded-2xl" onClick={createTeam}>
          Create Team
        </button>
      </div>
      <h1>{currentUser?.name}'s Pokemon</h1>
      {pokemonArr && (
        <PokemonGrid>
          {filteredPokemonArr?.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="p-2"
                onClick={() => addPokemonToTeam(pokemon)}
              >
                <PokemonCard
                  pokemonName={pokemon.pokemon_name}
                  createdPokemon={pokemon}
                />
              </div>
            )
          })}
        </PokemonGrid>
      )}
    </div>
  )
}
