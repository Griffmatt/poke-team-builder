import { useParams } from 'react-router-dom'
import fetchUsersTeams from '../../../Utils/fetch/Database/fetchUsersTeams'
import DisplayTeams from '../../../Components/DisplayTeams'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'
import { User } from '../../../Typescript/interfaces'

interface Props {
  user: User
}

export default function UsersTeams({user}: Props) {
  const { userId } = useParams()

  const { data: pokeArr, isLoading } = useQuery(['userTeams', userId], () =>
    fetchUsersTeams(userId),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid gap-6">
      <h1>{user?.name}'s Teams</h1>
      {pokeArr && <DisplayTeams pokeArr={pokeArr} />}
    </div>
  )
}
