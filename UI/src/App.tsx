import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'

import Teams from './Pages/Teams/Teams'
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
          <Route path="/teams" element={<Teams currentMenu="top-teams"/>} />
          <Route path="/teams/:userId" element={<Teams currentMenu="your-teams"/>} />
          <Route path="/teams/create/:userId" element={<Teams currentMenu="create-team"/>} />
          <Route path="/teams/:userId/:teamId" element={<Team />} />
          <Route path="/created-pokemon" element={<CreatedPokemon />} />
          <Route path="/created-pokemon/:userId" element={<CreatedPokemon />} />
          <Route path="/create/:pokemonName" element={<CreatePokemon />} />
        </Routes>
      </div>
    </div>
  )
}
