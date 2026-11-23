import Insignia from '../Atoms/Insignia'
import type { Pedido } from '../../service/tipos'
import { formatearPrecio } from '../ts/datos'

const estados: Record<Pedido['estado'], { texto: string; clase: string }> = {
    CREADO: {texto: 'En preparacion', clase: 'badge-status bg-light text-secondary'},
    PAGADO: {texto: 'Pagado', clase: 'badge-status bg-light-blue text-blue'},
    DESPACHADO: {texto: 'Despachado', clase: 'badge-status bg-light-blue text-blue'},
    ENTREGADO: {texto: 'Entregado', clase: 'badge-status bg-light-green text-green'},
    CANCELADO: {texto: 'Cancelado', clase: 'badge-status bg-light text-secondary'},
}

interface Props {
    pedido: Pedido
}

function TarjetaPedido({ pedido }: Props) {
    const estado = estados[pedido.estado]

    return (
        <div className='order-card'>
            <div className='order-header'>
                <div className='order-id-date'>
                    <span className='text-muted fs-8 text-uppercase'>Pedido</span>
                    <h2 className='m-0 fs-5 fw-bold'>{pedido.id}</h2>
                    <span className='text-muted fs-8'>{new Date(pedido.fechaCreacion).toLocaleDateString('es-CL')}</span>
                </div>
                <div className='order-status-price'>
                    <Insignia clase={estado.clase}>{estado.texto}</Insignia>
                    <span className="order-price">{formatearPrecio(Number(pedido.total))}</span>
                </div>
            </div>

            <hr className='order-divider'/>

            {pedido.detalles.map((detalle) => (
                <div className="order-item" key={detalle.idProducto}>
                    <div>
                        <p className="m-0 fw-bold fs-6">{detalle.nombreProducto}</p>
                        <p className="m-0 text-muted fs-8">x{detalle.cantidad}</p>
                    </div>
                    <div className="fw-bold">{formatearPrecio(Number(detalle.subtotal))}</div>
                </div>
            ))}
        </div>
    )
}

export default TarjetaPedido