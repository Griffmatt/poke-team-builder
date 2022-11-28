import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function CreateUserForm() {
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { setShowLoginModal, setCreatingUser } = useLoginModalContext()

  const handleCreateUser = (event: ClickEvent) => {
    event.preventDefault()

    if(password === passwordConfirm){
        setShowLoginModal(false)
    }
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
        placeholder="Enter Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
      />
      <button
        className="w-full text-center font-semibold underline hover:text-slate-500"
        onClick={() => setCreatingUser(false)}
      >
        Back To Login
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
          onClick={(event) => handleCreateUser(event)}
        >
          Create
        </button>
      </div>
    </>
  )
}
