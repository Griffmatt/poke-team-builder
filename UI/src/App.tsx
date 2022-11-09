import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import TopTeams from './Pages/TopTeams'
import UsersTeams from './Pages/UsersTeams'
import Team from './Pages/Team'

import NavBar from './Components/NavBar'
import CreatePokemon from './Pages/CreatePokemon'
import CreatedPokemon from './Pages/CreatedPokemon/CreatedPokemon'

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
