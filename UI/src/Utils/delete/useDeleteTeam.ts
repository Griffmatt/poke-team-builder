import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { queryClient } from '../../main'
import { CreatedPokemon } from '../../Typescript/interfaces'

const url = import.meta.env.VITE_BASE_URL

export default function useDeleteTeam(teamId: number, userId: number) {
  const deleteTeam = async () => {
    const response = await axios.delete<CreatedPokemon[]>(
      `${url}/teams/team/${teamId}`,
      { data: { userId, teamId }, withCredentials: true  },
    )
    return response.status === 200 ? teamId : null
  }

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,

    onMutate: async () => {
      await queryClient.cancelQueries(['userTeams', userId])
      await queryClient.cancelQueries(['topTeams'])

      const previousTeams = queryClient.getQueryData([
        'userTeams',
        userId,
      ]) as CreatedPokemon[]
      const topTeams = queryClient.getQueryData(['topTeams'])
      if(topTeams){
        console.log(topTeams)
        queryClient.setQueryData(
          ['topTeams'],
          previousTeams.filter((team) => team.id === teamId),
        )
        const topTeams2 = queryClient.getQueryData(['topTeams'])
        console.log(topTeams2)
      }
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
