import { ReactNode } from "react"

interface Props{
    clase?: string
    children: ReactNode
}

function Insignia({ clase = 'badge bg-secondary', children}: Props){
    return <span className={clase}>{children}</span>
}

export default Insignia