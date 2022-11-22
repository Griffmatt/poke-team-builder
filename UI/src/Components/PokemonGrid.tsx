import { ReactNode } from 'react'

export default function PokemonGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {children}
    </div>
  )
}
