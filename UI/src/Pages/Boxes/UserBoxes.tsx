import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../Components/UI/LoadingSpinner'
import fetchUser from '../../Utils/fetch/Database/fetchUser'
import SideNavBar from './Components/SideNavBar'
import UsersCreatedPokemon from './Components/UsersCreatedPokemon'
import UsersTeams from './Components/UsersTeams'

export default function UserBoxes() {
  const { userId } = useParams()
  const { data: user, isLoading } = useQuery(['user', userId], () =>
    fetchUser(userId),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <>
    {user?
    <div className="flex">
      <div className="w-1/4 flex flex-col gap-2 text-center">
        <SideNavBar user={user}/>
      </div>
      <div className="w-3/4"><UsersTeams user={user}/> <UsersCreatedPokemon user={user}/></div>
    </div>: null}
    </>
  )
}
