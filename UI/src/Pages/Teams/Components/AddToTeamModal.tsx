import { useEffect, useState } from 'react'
import PokemonCardWithStats from '../../../Components/PokemonCardWithStats'
import { CreatedPokemon } from '../../../Typescript/interfaces'

interface Props {
    selectedPokemon: {
        name: string
        id: number
    } | null
    addPokemonToTeam: (pokemon: CreatedPokemon) => null | undefined
  }

export default function AddPokemonToTeamModal({selectedPokemon, addPokemonToTeam}: Props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() =>{
    setShowModal(selectedPokemon ? true : false)
  }, [selectedPokemon])

  console.log(selectedPokemon)

  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 z-50 ${
        showModal ? 'grid' : 'hidden'
      }`}
      onClick={() => setShowModal(false)}
    >
      {selectedPokemon && <PokemonCardWithStats pokemonName={selectedPokemon.name} pokemonId={selectedPokemon.id}/>}
    </div>
  )
}
