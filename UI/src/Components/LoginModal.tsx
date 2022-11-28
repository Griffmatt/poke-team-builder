import { useState } from 'react'
import { useLoginModalContext } from '../Context/loginModalContext'

function LoginForm() {
const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const { setShowLoginModal} = useLoginModalContext()

  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
  }

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    setShowLoginModal(false)
    setUserName('')
    setPassword('')
  }
  return (
    <>
      <input
        type="text"
        placeholder="Enter Username"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="w-full text-center font-semibold underline hover:text-slate-500">
        Create An Account
      </button>
      <div className="flex justify-around">
        <button
          className="rounded py-1 px-2 bg-slate-200"
          onClick={(event) => handleCancel(event)}
        >
          Cancel
        </button>
        <button
          className="rounded py-1 px-2 bg-slate-200"
          onClick={(event) => handleLogin(event)}
        >
          Login
        </button>
      </div>
    </>
  )
}
export default function LoginModal() {

    const { showLoginModal, setShowLoginModal} = useLoginModalContext()
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
          <LoginForm/>
        </form>
      </div>
    </div>
  )
}
