import { Link } from 'react-router-dom'
import { useUserContext } from '../../../Context/userContext'
import { User } from '../../../Typescript/interfaces'

interface Props {
  user: User
}

export default function TeamsEmpty({ user }: Props) {
  const { currentUser } = useUserContext()
  return (
    <div className="rounded-2xl h-fit aspect-[2/1] bg-light-secondary dark:bg-dark-secondary flex align-middle justify-center">
      {currentUser?.id === user.id ? (
        <div className="flex flex-col justify-center text-center gap-4">
          <h2>You haven't created any teams yet!</h2>
          <Link to={`/teams/create`}>Click Here to create one</Link>
        </div>
      ) : (
        <h2>{user.user_name} has not created any teams yet!</h2>
      )}
    </div>
  )
}
