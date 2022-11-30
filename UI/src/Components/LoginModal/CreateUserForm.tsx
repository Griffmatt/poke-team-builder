import { useState } from 'react'
import { useLoginModalContext } from '../../Context/loginModalContext'
import checkUserNameAvailable from '../../Utils/fetch/Database/checkUserNameAvailable'
import { postCreatedUser } from '../../Utils/post/postCreatedUser'

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function CreateUserForm() {
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { setShowLoginModal, setCreatingUser } = useLoginModalContext()

  const handleCreateUser = async (event: ClickEvent) => {
    event.preventDefault()

    if(password !== passwordConfirm) return
    if(password.length < 6) return
    const userNameTaken = await checkUserNameAvailable(userName)
    if(userNameTaken) return

    setName('')
    setUserName('')
    setPassword('')
    setPasswordConfirm('')
    setShowLoginModal(false)
    setCreatingUser(false)

    postCreatedUser({name: name, user_name: userName.toLowerCase(), password: password, is_admin: false})
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
        autoComplete='name'
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
        className="w-full text-center font-semibold underline"
        onClick={() => setCreatingUser(false)}
      >
        Back To Login
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
          onClick={(event) => handleCreateUser(event)}
        >
          Create
        </button>
      </div>
    </>
  )
}
