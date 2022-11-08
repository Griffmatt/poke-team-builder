import axios from 'axios'



const url = import.meta.env.VITE_BASE_URL

export default async function postCreatedPokemon(pokemon: any) {
  await axios.post<any>(`${url}/pokemon`, pokemon, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })

  return null
}