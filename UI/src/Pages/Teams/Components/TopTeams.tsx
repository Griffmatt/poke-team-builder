import { useQuery } from '@tanstack/react-query'
import fetchTopTeams from '../../../Utils/fetch/fetchTopTeams'
import DisplayTeams from './DisplayTeams'

export default function TopTeams() {
  const { data: pokeArr, isLoading } = useQuery(['topTeams'], fetchTopTeams)

  if (isLoading) return <div></div>

  return (
    <div className="grid gap-6">
      <h1>Top Teams</h1>
      {pokeArr && <DisplayTeams pokeArr={pokeArr} />}
    </div>
  )
}
