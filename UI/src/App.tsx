import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/Home'

import Teams from './Pages/Teams/Teams'
import Team from './Pages/Team'

import NavBar from './Components/NavBar'
import CreatePokemon from './Pages/CreatePokemon/CreatePokemon'
import CreatedPokemon from './Pages/CreatedPokemon/CreatedPokemon'
import UpdatePokemon from './Pages/Profile/Components/UpdatePokemon'

export default function App() {
  return (
    <div className="xl:container mx-auto min-h-screen">
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:userId" element={<Teams />} />
          <Route path="/teams/:userId/:teamId" element={<Team />} />
          <Route path="/pokemon" element={<CreatedPokemon />} />
          <Route path="/pokemon/:userId" element={<CreatedPokemon />} />
          <Route path="/user-profile/:userId" element={<CreatedPokemon />} />
          <Route
            path="/pokemon/update/:pokemonName/:pokemonId"
            element={<UpdatePokemon />}
          />
          <Route
            path="/pokemon/create/:pokemonName"
            element={<CreatePokemon />}
          />
        </Routes>
      </div>
    </div>
  )
}
