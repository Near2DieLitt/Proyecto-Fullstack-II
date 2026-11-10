import { useState } from 'react'
import type { ReactNode } from 'react'


interface Props {
    titulo: string
    children: ReactNode
    icono?: string
    copiable?: boolean
    clase?: string
}

function DatoContacto({ titulo, children, icono, copiable = false, clase = '' }: Props) {
    const [copiado, setCopiado] = useState(false)

    async function  copiar(e: React.MouseEvent<HTMLParagraphElement>) {
        const texto = e.currentTarget.innerText
        try {
            await navigator.clipboard.writeText(texto)
            setCopiado(true)
            setTimeout(() => setCopiado(false), 1000)
        } catch (error) {
            console.error('Error al copiar: ', error)
        }
    } 

const texto = (
    <div className={`info-text ${icono ? '' : clase}`.trim()}>
      <h4>{titulo}</h4>
      <p
        className={copiable ? 'copiable' : undefined}
        title={copiable ? 'Haz clic para copiar' : undefined}
        style={copiado ? { color: '#B07820' } : undefined}
        onClick={copiable ? copiar : undefined}
      >
        {copiado ? '¡Copiado!' : children}
      </p>
    </div>
  )

   if (!icono) return texto

  return (
    <div className="info-item">
      <span className="info-icon">{icono}</span>
      {texto}
    </div>
  )
} export default DatoContacto