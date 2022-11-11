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
    // When mutate is called:
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['teams', userId] })

      // Snapshot the previous value
      const previousTeams = queryClient.getQueryData(['teams', userId]) as UserTeam[]
        console.log(previousTeams)
      // Optimistically update to the new value
      queryClient.setQueryData(['teams', userId], previousTeams.filter(pokemon => pokemon.id === teamId))

      // Return a context object with the snapshotted value
      return { previousTeams }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, team, context) => {
      queryClient.setQueryData(['teams', userId], context?.previousTeams)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['teams', userId]})
    },
  })

  return deleteTeamMutation
}
