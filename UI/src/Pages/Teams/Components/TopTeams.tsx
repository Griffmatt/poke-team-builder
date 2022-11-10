import { useParams } from 'react-router-dom'

import { useFetchTeams } from '../../../Hooks/useFetchTeams'
import fetchTeams from '../../../Utils/fetch/fetchTeams'
import DisplayTeams from './DisplayTeams'

export default function TopTeams() {
  const { userId } = useParams()

  const { pokeArr, isLoading } = useFetchTeams(fetchTeams, userId)

  if (isLoading) return <div></div>

  return (
    <div className="grid gap-6">
      <h1>Top Teams</h1>
      {pokeArr && <DisplayTeams pokeArr={pokeArr} />}
    </div>
  )
}
