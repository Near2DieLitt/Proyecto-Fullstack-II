import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { obtenerSesion } from "../components/ts/almacenamiento"
import { pedidos } from "../components/ts/datos"
import TarjetaPedido from "../components/Organism/TarjetaPedido"

function MiPerfil(){
    const sesion = obtenerSesion()
    const navegar = useNavigate()

    useEffect(() => {
        if (!sesion) navegar('/inicio-sesion', { replace: true })
    }, [sesion, navegar])

    if(!sesion) return null

    return(
        <main className="pedidos-wrapper">
            <div className="pedidos-header">
                <h1 className="logo">Mis Pedidos</h1>
                <p className="text-muted">
                    Hola, {sesion.nombre} {pedidos.length} pedidos
                </p>
            </div>
            {pedidos.map((pedido) => (
                <TarjetaPedido key={pedido.id} pedido={pedido}/>
            ))}

        </main>
    )

}

export default MiPerfil