import { useEffect, useState } from 'react'
import PokemonCardWithStats from '../../../Components/PokemonCardWithStats'
import { CreatedPokemon } from '../../../Typescript/interfaces'

interface Props {
  selectedPokemon: CreatedPokemon | null
  setSelectedPokemon:  React.Dispatch<React.SetStateAction<CreatedPokemon | null>>
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
      className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 z-50 ${
        showModal ? 'grid' : 'hidden'
      }`}
      onClick={() => setSelectedPokemon(null)}
    >
      <div className="flex justify-center">
        {selectedPokemon && (
          <div className="text-center bg-light-secondary dark:bg-dark-secondary p-4 rounded-2xl aspect-[4/5] w-[32rem] max-w-[95vw]">
            <PokemonCardWithStats
              pokemonName={selectedPokemon.pokemon_name}
              pokemonId={selectedPokemon.id}
            />
            <button onClick={() => addPokemonToTeam(selectedPokemon)} className="w-full px-4 py-2 rounded-xl my-2">
              Add To Team
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
