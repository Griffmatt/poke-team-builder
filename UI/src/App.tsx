import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Teams from './Pages/Teams'
import Team from './Pages/Team'
import Pokemon from './Pages/Pokemon'
import CreatedPokemon from './Pages/CreatedPokemon'

import NavBar from './Components/NavBar'
import CreatePokemon from './Pages/CreatePokemon'

export default function App() {
  return (
    <div className="xl:container mx-auto min-h-screen">
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:userId" element={<Teams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemon/:userId" element={<CreatedPokemon />} />
          <Route path="/pokemon/create/:pokemonName" element={<CreatePokemon />} />
        </Routes>
      </div>
    </div>
  )
}
