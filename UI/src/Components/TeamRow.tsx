import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PokemonCard from './PokemonCard'
import { useUserContext } from '../Context/userContext'
import { UsersCreatedTeam } from '../Typescript/interfaces'
import useDeleteTeam from '../Utils/delete/useDeleteTeam'
import fetchUser from '../Utils/fetch/Database/fetchUser'
import { useState } from 'react'

interface Props {
  team: UsersCreatedTeam
}

export default function TeamRow({ team }: Props) {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  const [showDeleteModal, setShowDeleteModal]= useState(false)

  const { data: teamsUser, isLoading } = useQuery(['user', team.user_id], () =>
    fetchUser(team.user_id),
  )
  const deleteTeamMutation = useDeleteTeam(team.id, userId)

  const DeleteTeamModal = ({name}: {name: string}) => {
    return (
      <div className={`fixed top-0 left-0  w-screen h-screen place-items-center ${showDeleteModal? "grid": "hidden"}`} onClick={() => setShowDeleteModal(false)}>
        <div className="bg-slate-500 rounded-xl p-4 grid gap-4" onClick={(event) => event?.stopPropagation()}>
        <h2>Are you sure you want <br/> to delete {name}?</h2>
        <div className="flex justify-around">
          <button className="rounded py-1 px-2 bg-slate-400" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          <button className="rounded py-1 px-2 bg-slate-400" onClick={() => deleteTeamMutation.mutate()}>Confirm</button>
        </div>
        </div>
      </div>
    )
  }

  if (isLoading) return <div></div>

  return (
    <>
      {teamsUser && (
        <div className="grid gap-4">
          <div className="flex justify-between align-middle">
            <div className="flex gap-3">
              <h2>{team.team_name}</h2>
              <h2>{teamsUser.name}</h2>
            </div>
            {Number(userId) === currentUser.id ? (
              <button
                className="bg-slate-200 dark:bg-slate-600 py-2 px-4 rounded-2xl"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Team
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6">
            {team.pokemon.map((pokemon, index) => {
              return (
                <div key={index} className="p-2">
                  <PokemonCard
                    pokemonName={pokemon.pokemon_name}
                    createdPokemonName={pokemon.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      <DeleteTeamModal name={team.team_name}/>
    </>
  )
}
