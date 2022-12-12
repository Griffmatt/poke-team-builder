import { useQuery } from '@tanstack/react-query'
import fetchTopTeams from '../../../Utils/fetch/Database/fetchTopTeams'
import DisplayTeams from '../../../Components/DisplayTeams'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'

export default function TopTeams() {
  const { data: pokeArr, isLoading } = useQuery(['topTeams'], fetchTopTeams)

  return (
    <div className="grid gap-4">
      <h1>Top Teams</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        pokeArr && <DisplayTeams pokeArr={pokeArr} />
      )}
    </div>
  )
}
