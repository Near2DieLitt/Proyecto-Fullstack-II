import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerSesion } from "../components/ts/almacenamiento"
import TarjetaPedido from "../components/Organism/TarjetaPedido"
import { misPedidos } from "../service/pedidosServicio"
import { mensajeDeError } from "../service/api"
import type { Pedido } from "../service/tipos"

function MiPerfil(){
    const sesion = obtenerSesion()
    const idUsuario = sesion?.id
    const navegar = useNavigate()
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!idUsuario) {
            cerrarSesion()
            navegar('/inicio-sesion', { replace: true })
            return
        }

        let activa = true
        misPedidos(idUsuario)
            .then((resultado) => {
                if (activa) setPedidos(resultado)
            })
            .catch((errorCarga: unknown) => {
                if (activa) setError(mensajeDeError(errorCarga, 'No se pudieron cargar tus pedidos.'))
            })
            .finally(() => {
                if (activa) setCargando(false)
            })

        return () => { activa = false }
    }, [idUsuario, navegar])

    if(!sesion || !idUsuario) return null

    return(
        <main className="pedidos-wrapper">
            <div className="pedidos-header">
                <h1 className="logo">Mis Pedidos</h1>
                <p className="text-muted">
                    Hola, {sesion.nombre} · {pedidos.length} pedidos
                </p>
            </div>
            {cargando && <p role="status">Cargando pedidos...</p>}
            {error && <p role="alert">{error}</p>}
            {!cargando && !error && pedidos.length === 0 && <p>Aún no tienes compras.</p>}
            {!error && pedidos.map((pedido) => <TarjetaPedido key={pedido.id} pedido={pedido} />)}

        </main>
    )

}

export default MiPerfil