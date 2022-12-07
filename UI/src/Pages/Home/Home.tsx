import TopCreatedPokemon from './Components/MostUsedPokemon'
import TopTeams from '../../Components/TopTeams'

export default function Home() {
  return (
    <div className="grid gap-6">
      <TopCreatedPokemon />
      <TopTeams />
    </div>
  )
}
