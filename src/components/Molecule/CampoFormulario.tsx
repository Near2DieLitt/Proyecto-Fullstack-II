import { ReactNode } from "react";

interface Props {
    id: string
    etiqueta: string
    requerido?: boolean
    contador?: { actual:number; max: number }
    clase?: string
    claseEtiqueta?: string
    children: ReactNode
}


function CampoFormulario({
    id,
    etiqueta,
    requerido = false,
    contador,
    clase = 'grupo-input',
    claseEtiqueta = '',
    children,
}: Props) {
    return (
        <div className={clase}>
            <label htmlFor={id} className = {claseEtiqueta}>
                {etiqueta} {requerido && <span>*</span>}
            </label>
            {children}
            {contador && (
                <span className="contador">
                    {contador.actual}/{contador.max}
                </span>
            )}
        </div>
    )
} export default CampoFormulario