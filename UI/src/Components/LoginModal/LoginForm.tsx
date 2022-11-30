import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'
import { useUserContext } from '../../Context/userContext'
import { loginUser } from '../../Utils/post/loginUser'

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function LoginForm() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const { setShowLoginModal, setCreatingUser } = useLoginModalContext()
  const { setCurrentUser } = useUserContext()

  const handleLogin = async(event: ClickEvent) => {
    event.preventDefault()
    const user = await loginUser({ user_name: userName.toLowerCase(), password: password})
    if(!user) return

    setShowLoginModal(false)
    setCurrentUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const handleCancel = (event: ClickEvent) => {
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
        autoComplete="name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        className="w-full text-center font-semibold underline hover:text-slate-500"
        onClick={() => setCreatingUser(true)}
      >
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
