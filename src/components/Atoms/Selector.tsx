import type { SelectHTMLAttributes } from "react"

export interface Opcion{
    valor: string
    texto: string
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement>{
    opciones: Opcion[]
    placeholder: string
}

function Selector({ opciones, placeholder, className = '', ...resto }:Props){
    return(
        <select className={className}{...resto}>
            <option value="" disabled>
                {placeholder}
            </option>
            {opciones.map((o) => (
                <option key={o.valor} value={o.valor}>
                    {o.texto}
                </option>
            ))}
        </select>
    )
}

export default Selector