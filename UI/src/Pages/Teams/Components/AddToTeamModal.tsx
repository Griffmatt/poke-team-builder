import { useEffect, useState } from 'react'
import PokemonCardWithStats from '../../../Components/PokemonCardWithStats'
import { CreatedPokemon } from '../../../Typescript/interfaces'

interface Props {
  selectedPokemon: CreatedPokemon | null
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<CreatedPokemon | null>
  >
  addPokemonToTeam: (pokemon: CreatedPokemon) => null | undefined
}

export default function AddPokemonToTeamModal({
  selectedPokemon,
  setSelectedPokemon,
  addPokemonToTeam,
}: Props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(selectedPokemon ? true : false)
  }, [selectedPokemon])

  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 z-40 ${
        showModal ? 'grid' : 'hidden'
      }`}
      onClick={() => setSelectedPokemon(null)}
    >
      <div
        className="flex justify-center z-50"
        onClick={(event) => event?.stopPropagation()}
      >
        {selectedPokemon && (
          <div className="text-center bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl w-[32rem] max-w-[95vw] ">
            <PokemonCardWithStats
              pokemonName={selectedPokemon.pokemon_name}
              pokemonId={selectedPokemon.id}
            />
            <button
              onClick={() => {
                addPokemonToTeam(selectedPokemon)
                setSelectedPokemon(null)
              }}
              className="w-full px-4 py-2 rounded-xl mt-6"
            >
              Add To Team
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
