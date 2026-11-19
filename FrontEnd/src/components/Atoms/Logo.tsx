interface Props{
    centrado?: boolean
}

function Logo({centrado = false}: Props){
    if(centrado){
        return(
            <h1 className="logo-centro">
                SONIDO <span>vivo</span>
            </h1>
        )
    }
    return (
        <span>
            <strong>SONIDO</strong> vivo
        </span>
    )
}

export default Logo