import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'

export default function LoginForm() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
  
    const { setShowLoginModal, setCreatingUser} = useLoginModalContext()
  
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
        <button className="w-full text-center font-semibold underline hover:text-slate-500" onClick={() => setCreatingUser(true)}>
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