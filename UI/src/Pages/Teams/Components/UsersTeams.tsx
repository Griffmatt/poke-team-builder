import { useParams } from 'react-router-dom'
import { useUserContext } from '../../../Context/userContext'
import fetchUsersTeams from '../../../Utils/fetch/fetchUsersTeams'

import { useFetchTeams } from '../../../Hooks/useFetchTeams'
import DisplayTeams from './DisplayTeams'

export default function UsersTeams() {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  const { pokeArr, isLoading } = useFetchTeams(
    () => fetchUsersTeams(userId),
    userId,
  )


  if (isLoading) return <div></div>

  return (
    <div className="grid gap-6">
      <h1>{currentUser.name}'s Teams</h1>
      {pokeArr && (
        <DisplayTeams pokeArr={pokeArr}/>
      )}
    </div>
  )
}
