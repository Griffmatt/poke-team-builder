import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/Home'

import Teams from './Pages/Teams/Teams'
import Team from './Pages/Team/Team'

import NavBar from './Components/NavBar'
import CreatePokemon from './Pages/CreatePokemon/CreatePokemon'
import CreatedPokemon from './Pages/CreatedPokemon/CreatedPokemon'
import UpdatePokemon from './Pages/UpdatePokemon/UpdatePokemon'
import UserBoxes from './Pages/Boxes/UserBoxes'
import CopyPokemon from './Pages/CopyPokemon/CopyPokemon'

export default function App() {
  return (
    <div className="xl:container mx-auto min-h-screen">
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/create" element={<Teams create={true}/>} />
          <Route path="/teams/:userId/:teamId" element={<Team />} />
          <Route path="/pokemon" element={<CreatedPokemon />} />
          <Route path="/pokemon/recent" element={<CreatedPokemon recentlyCreated={true}/>} />
          <Route path="/boxes/:userId" element={<UserBoxes />} />
          <Route path="/boxes/:userId/teams" element={<UserBoxes teams={true}/>} />
          <Route
            path="/pokemon/update/:pokemonName/:pokemonId"
            element={<UpdatePokemon />}
          />
          <Route
            path="/pokemon/create/:pokemonName"
            element={<CreatePokemon />}
          />
          <Route path="/pokemon/copy/:pokemonName/:pokemonId" element={<CopyPokemon/>}/>
        </Routes>
      </div>
    </div>
  )
}
