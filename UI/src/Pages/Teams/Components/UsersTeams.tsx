import { useUserContext } from '../../../Context/userContext'

export default function UsersTeams() {
  const { currentUser } = useUserContext()

  return (
    <div>
      <h1>{currentUser.name}'s Teams</h1>
    </div>
  )
}
