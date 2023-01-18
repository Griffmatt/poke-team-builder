import useDeleteTeam from '../Utils/delete/useDeleteTeam'

interface Props {
  userId: number
  name: string
  showDeleteModal: boolean
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  teamId: number
  accessToken?: string
}

export default function DeleteTeamModal({
  userId,
  accessToken,
  name,
  teamId,
  showDeleteModal,
  setShowDeleteModal,
}: Props) {
  const deleteTeamMutation = useDeleteTeam(teamId, userId, accessToken)

  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 z-50 ${
        showDeleteModal ? 'grid grid-rows-3' : 'hidden'
      }`}
      onClick={() => setShowDeleteModal(false)}
    >
      <div
        className="bg-light dark:bg-dark rounded-xl p-6 grid gap-4 w-[90vw] max-w-[24rem]"
        onClick={(event) => event?.stopPropagation()}
      >
        <h2>Confirm Delete</h2>
        <h3 className="text-center">Are you sure you want to delete {name}?</h3>
        <div className="flex justify-around">
          <button
            className="rounded py-1 px-2 "
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="rounded py-1 px-2 "
            onClick={() => deleteTeamMutation.mutate()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
