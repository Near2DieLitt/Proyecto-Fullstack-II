interface Props{
    nombre:string
    className?: string
}

function Icono({nombre, className = '' }: Props){
    return <i className={`fa-solid fa-${nombre} ${className}`.trim()} aria-hidden="true"></i>
}

export default Icono