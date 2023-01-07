import fetchUsersTeams from '../../../Utils/fetch/Database/fetchUsersTeams'
import DisplayTeams from '../../../Components/DisplayTeams'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../Components/UI/LoadingSpinner'
import { User } from '../../../Typescript/interfaces'
import TeamsEmpty from './TeamsEmpty'

interface Props {
  user: User
}

export default function UsersTeams({user}: Props) {

  const { data: pokeArr, isLoading } = useQuery(['userTeams', user.id.toString()], () =>
    fetchUsersTeams(user.id.toString()),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid gap-6">
      {pokeArr && pokeArr.length > 0 ? <DisplayTeams pokeArr={pokeArr} /> : <TeamsEmpty user={user}/>}
    </div>
  )
}
