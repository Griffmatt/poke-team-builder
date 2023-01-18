import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'
import CreateUserForm from './CreateUserForm'
import LoginForm from './LoginForm'

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, creatingUser } = useLoginModalContext()
  const [error, setError] = useState(false)

  const handleClose = () => {
    setShowLoginModal(false)
    setError(false)
  }

  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen place-items-center bg-dark/50 z-50 ${
        showLoginModal ? 'grid grid-rows-3' : 'hidden'
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-light dark:bg-dark  rounded-xl p-4 grid gap-4"
        onClick={(event) => event?.stopPropagation()}
      >
        <h2>Login</h2>
        <form className="grid gap-4">
          {creatingUser? <CreateUserForm/>:<LoginForm error={error} setError={setError}/>}
        </form>
      </div>
    </div>
  )
}
