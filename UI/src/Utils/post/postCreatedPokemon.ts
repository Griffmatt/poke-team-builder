import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

interface Data {
  user_id: number
  pokemon_id: number
  name: string
  ability: string
  nature: string
  held_item: string
  first_move: string
  second_move: string
  third_move: string
  fourth_move: string
  attackEv: number
  defenseEv: number
  specialAttackEv: number
  specialDefenseEv: number
  speedEv: number
  hitpointsIv: number
  attackIv: number
  defenseIv: number
  specialAttackIv: number
  specialDefenseIv: number
  speedIv: number
}

export default async function postCreatedPokemon(pokemon: Data) {
  console.log(pokemon)
  const response = await axios.post<Data>(`${url}/pokemon`, pokemon, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return response.status
}
