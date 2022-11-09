import { useState } from "react"

interface Stats {
  hitpointsIv: number
  attackIv: number
  defenseIv: number
  specialAttackIv: number
  specialDefenseIv: number
  speedIv: number
}

export default function useHandleEvChange() {

    const [ivs, setIvs] = useState({
      hitpointsIv: 31,
      attackIv: 31,
      defenseIv: 31,
      specialAttackIv: 31,
      specialDefenseIv: 31,
      speedIv: 31,
    })
  
  const decreaseIv = (currentStat: string) => {
      if (ivs[currentStat as keyof Stats] <= 0) return
      
      setIvs({
        ...ivs,
        [currentStat]: ivs[currentStat as keyof Stats] - 1
      })
    }
  
     const increaseIv = (currentStat: string) => {
        if (ivs[currentStat as keyof Stats] >= 31) return
      
        setIvs({
          ...ivs,
          [currentStat]: ivs[currentStat as keyof Stats] + 1
        })
    }
  
     const handleIvChange = (value: number, currentStat: string) => {
        if (value > 31){
            setIvs({
                ...ivs,
                [currentStat]: 31
              })

              return
        }

        if (value < 0){
            setIvs({
                ...ivs,
                [currentStat]: 0
              })

              return
        }

        setIvs({ ...ivs, [currentStat]: value })
    }
  
    return { ivs, decreaseIv, increaseIv, handleIvChange }
  }