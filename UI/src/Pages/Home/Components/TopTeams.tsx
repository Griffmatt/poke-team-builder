import { useQuery } from '@tanstack/react-query'
import fetchTopTeams from '../../../Utils/fetch/Database/fetchTopTeams'
import DisplayTeams from '../../../Components/DisplayTeams'

export default function TopTeams() {
  const { data: pokeArr, isLoading } = useQuery(['topTeams'], fetchTopTeams)

  if (isLoading) return <div></div>

  return (
    <div className="grid gap-4">
      <h1>Top Teams</h1>
      {pokeArr && <DisplayTeams pokeArr={pokeArr} />}
    </div>
  )
}
