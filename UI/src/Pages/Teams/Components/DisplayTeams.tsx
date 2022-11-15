import React from 'react'
import { UsersCreatedTeam } from '../../../Typescript/interfaces'
import TeamRow from './TeamRow'

interface Props {
  pokeArr: UsersCreatedTeam[]
}

export default function DisplayTeams({ pokeArr }: Props) {
  return (
    <div className="grid gap-4">
      {pokeArr.map((team) => {
        return (
          <React.Fragment key={team.team_id}>
            <TeamRow team={team} />
          </React.Fragment>
        )
      })}
    </div>
  )
}
