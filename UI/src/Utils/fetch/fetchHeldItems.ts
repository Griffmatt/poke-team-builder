import axios from 'axios'

import { HeldItem } from '../../Typescript/interfaces'

interface Data{
  results: HeldItem[]
}

const url = import.meta.env.VITE_POKE_API_URL

export default async function fetchHeldItems() {
  const response = await axios.get<Data>(`${url}item?limit=1607`)

  return response.data.results
}