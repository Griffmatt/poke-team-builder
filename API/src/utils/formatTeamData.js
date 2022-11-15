const formatTeamData = (teams) => {
  const pokemonMap = new Map()
  const pokeArr = []
  teams.forEach((team) => {
    const key = pokemonMap.get(team.id) ?? []
    pokemonMap.set(team.id, {
      user_id: team.user_id,
      team_name: team.team_name,
      team_style: team.team_style,
      team_id: team.id,
      pokemon: [
        ...(key.pokemon ?? []),
        {
          name: team.name,
          pokemon_id: team.pokemon_id,
          created_pokemon_id: team.created_pokemon_id
        }
      ]
    })
  })

  pokemonMap.forEach((pokemon) => {
    pokeArr.push(pokemon)
  })

  return pokeArr
}

module.exports = { formatTeamData }
