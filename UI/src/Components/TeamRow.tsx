import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PokemonCard from './PokemonCard'
import { useUserContext } from '../Context/userContext'
import { UsersCreatedTeam } from '../Typescript/interfaces'
import fetchUser from '../Utils/fetch/Database/fetchUser'
import { useState } from 'react'
import LoadingSpinner from './UI/LoadingSpinner'
import DeleteTeamModal from './DeleteTeamModal'

interface Props {
  team: UsersCreatedTeam
}

export default function TeamRow({ team }: Props) {
  const { userId } = useParams()
  const { currentUser } = useUserContext()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: teamsUser, isLoading } = useQuery(['user', team.user_id], () =>
    fetchUser(team.user_id),
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      {teamsUser && (
        <div className="grid gap-4">
          <div className="flex justify-between align-middle">
            <div className="flex gap-3">
              <h2>{team.team_name}</h2>
              <h2>{teamsUser.name}</h2>
            </div>
            {Number(userId) === currentUser?.id ? (
              <button
                className="py-2 px-4 rounded-2xl"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Team
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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
      <DeleteTeamModal
        name={team.team_name}
        teamId={team.id}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </>
  )
}
