import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'
import { useUserContext } from '../../Context/userContext'
import { loginUser } from '../../Utils/post/loginUser'

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

interface Props {
  error: boolean
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm({ error, setError }: Props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const { setShowLoginModal, setCreatingUser } = useLoginModalContext()
  const { setCurrentUser } = useUserContext()

  const handleLogin = async (event: ClickEvent) => {
    event.preventDefault()
    const user = await loginUser({
      user_name: userName.toLowerCase(),
      password: password,
    })
    if (!user) {
      setError(true)
      return null
    }
    setError(false)
    setShowLoginModal(false)
    setCurrentUser(user)
  }

  const handleCancel = (event: ClickEvent) => {
    event.preventDefault()
    setShowLoginModal(false)
    setUserName('')
    setPassword('')
  }
  return (
    <>
      <h3 className={`${error ? null : 'text-opacity-0'} text-error`}>
        Username or Password is incorrect!
      </h3>
      <input
        type="text"
        placeholder="Enter Username"
        autoComplete="name"
        value={userName}
        className={`${error ? 'outline-error outline outline-[.1rem]' : null}`}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        autoComplete="current-password"
        value={password}
        className={`${error ? 'outline-error outline outline-[.1rem]' : null}`}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        className="w-full text-center font-semibold underline bg-transparent text-dark dark:text-light hover:text-dark-secondary/75 dark:hover:text-light-secondary/75"
        onClick={() => setCreatingUser(true)}
      >
        Create An Account
      </button>
      <div className="flex justify-around">
        <button
          className="rounded py-1 px-2"
          onClick={(event) => handleCancel(event)}
        >
          Cancel
        </button>
        <button
          className="rounded py-1 px-2"
          onClick={(event) => handleLogin(event)}
        >
          Login
        </button>
      </div>
    </>
  )
}
