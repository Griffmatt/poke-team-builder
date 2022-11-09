import { useState } from "react"

interface Stats {
  hitpointsEv: number
  attackEv: number
  defenseEv: number
  specialAttackEv: number
  specialDefenseEv: number
  speedEv: number
}

export default function useHandleEvChange() {

  const [evs, setEvs] = useState({
    hitpointsEv: 0,
    attackEv: 0,
    defenseEv: 0,
    specialAttackEv: 0,
    specialDefenseEv: 0,
    speedEv: 0,
  })

const decreaseEv = (currentStat: string) => {
    if (evs[currentStat as keyof Stats] <= 0) return
    
    setEvs({
      ...evs,
      [currentStat]:
        evs[currentStat as keyof Stats] -
        ((evs[currentStat as keyof Stats] % 4) || 4),
    })
  }

   const increaseEv = (currentStat: string) => {
    let total = 4
    for (const stat in evs) {
      total += evs[stat as keyof Stats]
    }
    if (total > 510 || evs[currentStat as keyof Stats] + 4 > 252) return
    setEvs({
      ...evs,
      [currentStat]:
        evs[currentStat as keyof Stats] +
        (4 - (evs[currentStat as keyof Stats] % 4)),
    })
  }

   const handleEvChange = (value: number, currentStat: string) => {
    let total = 510
    if(value < 0) {
      setEvs({ ...evs, [currentStat]: 0 }) 
      return
    }
    for (const stat in evs) {
      if (stat === currentStat) continue
      total -= evs[stat as keyof Stats]
    }

    if (value > total || value > 252) {
      setEvs({ ...evs, [currentStat]: Math.min(252, total) })
      return
    }

    setEvs({ ...evs, [currentStat]: value })
  }

  return { evs, decreaseEv, increaseEv, handleEvChange }
}