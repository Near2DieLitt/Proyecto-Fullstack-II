import type { ReactNode } from 'react'

interface Props {
  titulo: string
  apagada?: boolean
  children: ReactNode
}

function TarjetaInfo({ titulo, apagada = false, children }: Props) {
  return (
    <div className={`info-card ${apagada ? 'muted-card' : ''}`.trim()}>
      <h3>{titulo}</h3>
      {children}
    </div>
  )
}export default TarjetaInfo
