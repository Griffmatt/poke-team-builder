import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { queryClient } from '../../main'
import { CreatedPokemon, UserTeam } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default function useDeleteTeam(teamId: number, userId?: string) {
  const deleteTeam = async () => {
    const response = await axios.delete<CreatedPokemon[]>(
      `${url}/teams/team/${teamId}`,
      { data: { teamId } },
    )
    return response.status === 200 ? teamId : null
  }

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,

    onMutate: async () => {
      await queryClient.cancelQueries(['userTeams', userId])

      const previousTeams = queryClient.getQueryData([
        'userTeams',
        userId,
      ]) as UserTeam[]

      queryClient.setQueryData(
        ['userTeams', userId],
        previousTeams.filter((team) => team.id === teamId),
      )

      return { previousTeams }
    },
    onError: (err, team, context) => {
      queryClient.setQueryData(['userTeams', userId], context?.previousTeams)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['userTeams', userId])
    },
  })

  return deleteTeamMutation
}
