import { useLoginModalContext } from '../../Context/loginModalContext'
import CreateUserForm from './CreateUserForm'
import LoginForm from './LoginForm'

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, creatingUser } = useLoginModalContext()

  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen place-items-center ${
        showLoginModal ? 'grid' : 'hidden'
      }`}
      onClick={() => setShowLoginModal(false)}
    >
      <div
        className="bg-slate-100 rounded-xl p-4 grid gap-4"
        onClick={(event) => event?.stopPropagation()}
      >
        <h2>Login</h2>
        <form className="grid gap-2">
          {creatingUser? <CreateUserForm/>:<LoginForm />}
        </form>
      </div>
    </div>
  )
}
