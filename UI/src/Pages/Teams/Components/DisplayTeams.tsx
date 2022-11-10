import { UsersCreatedTeam } from '../../../Typescript/interfaces'
import TeamRow from './TeamRow'

interface Props {
  pokeArr: UsersCreatedTeam[]
}

export default function DisplayTeams({ pokeArr }: Props) {
  return (
    <div className="grid gap-4">
      {pokeArr.map((team) => {
        return <TeamRow team={team} />
      })}
    </div>
  )
}
