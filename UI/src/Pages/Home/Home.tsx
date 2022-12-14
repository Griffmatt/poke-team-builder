import CommonTeamMates from './Components/CommonTeamMates'
import TopCreatedPokemon from './Components/MostUsedPokemon'

export default function Home() {
  return (
    <div className="grid gap-6">
      <TopCreatedPokemon />
      <CommonTeamMates />
    </div>
  )
}
