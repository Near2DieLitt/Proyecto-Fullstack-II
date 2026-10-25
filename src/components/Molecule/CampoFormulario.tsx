import { ReactNode } from "react";

interface Props {
    id: string
    etiqueta: string
    requerido?: boolean
    contador?: { actual:number; max: number }
    error?: string
    clase?: string
    claseEtiqueta?: string
    children: ReactNode
}


function CampoFormulario({
    id,
    etiqueta,
    requerido = false,
    contador,
    error,
    clase = 'grupo-input',
    claseEtiqueta = '',
    children,
}: Props) {
  return (
    <div className={clase}>
      <label htmlFor={id} className={claseEtiqueta}>
        {etiqueta} {requerido && <span>*</span>}
      </label>
      {children}
      {error && (
        <span className="error-campo" role="alert">
          {error}
        </span>
      )}
      {contador && (
        <span className="contador">
          {contador.actual}/{contador.max}
        </span>
      )}
    </div>
  )
}
 export default CampoFormulario