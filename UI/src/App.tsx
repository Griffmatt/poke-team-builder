import { Routes, Route, Outlet, Link } from 'react-router-dom'

import Home from './Pages/Home'
import TopTeams from './Pages/TopTeams'
import UsersTeams from './Pages/UsersTeams'
import Team from './Pages/Team'

import NavBar from './Components/NavBar'
import CreatePokemon from './Pages/CreatePokemon'
import { useUserContext } from './Context/userContext'
import CreatedPokemon from './Pages/CreatedPokemon/CreatedPokemon'

const CreatedPokemonLayout = () => {
  const { currentUser } = useUserContext()

  return (
    <>
      {currentUser ? (
        <div className="flex gap-4 justify-center">
          <Link to={'/pokemon'}>Top Pokemon</Link>
          <Link to={`/pokemon/${currentUser.id}`}>Your Pokemon</Link>
        </div>
      ) : null}
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <div className="xl:container mx-auto min-h-screen">
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TopTeams />} />
          <Route path="/teams/:userId" element={<UsersTeams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/created-pokemon" element={<CreatedPokemon />} />
          <Route path="/created-pokemon/:userId" element={<CreatedPokemon />} />
          <Route path="/create/:pokemonName" element={<CreatePokemon />} />
        </Routes>
      </div>
    </div>
  )
}
