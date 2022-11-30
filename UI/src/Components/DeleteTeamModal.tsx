import { useParams } from "react-router-dom"
import useDeleteTeam from "../Utils/delete/useDeleteTeam"

interface Props{
    name: string
    showDeleteModal: boolean
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    teamId: number
}

export default function DeleteTeamModal({ name, teamId, showDeleteModal, setShowDeleteModal }: Props) {

    const { userId } = useParams()
    const deleteTeamMutation = useDeleteTeam(teamId, userId)
    
    return (
      <div
        className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 dark:bg-dark/25  ${
          showDeleteModal ? 'grid' : 'hidden'
        }`}
        onClick={() => setShowDeleteModal(false)}
      >
        <div
          className="bg-light dark:bg-dark rounded-xl p-4 grid gap-4"
          onClick={(event) => event?.stopPropagation()}
        >
          <h2>
            Are you sure you want <br /> to delete {name}?
          </h2>
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