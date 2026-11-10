import Insignia from '../Atoms/Insignia'
import type { Pedido } from '../ts/datos'
import { formatearPrecio } from '../ts/datos'
import ProgresoPedido from '../Molecule/ProgresoPedido'

const estados = {
    1: {texto: 'En preparacion', clase: 'badge-status bg-light text-secondary'},
    2: {texto: 'Despachado', clase: 'badge-status bg-light-blue text-blue'},
    3: {texto: 'Entregado', clase: 'badge-status bg-light-green text-green'},
}
interface Props{
    pedido: Pedido
}

function TarjetaPedido({pedido}: Props){
    const { producto } = pedido
    const estado = estados[pedido.etapa]

    return(
        <div className='order-card'>
            <div className='order-header'>
                <div className='order-id-date'>
                    <span className='text-muted fs-8 text-uppercase'>Pedido</span>
                    <h2 className='m-0 fs-5 fw-bold'>{pedido.id}</h2>
                    <span className='text-muted fs-8'>{pedido.fecha}</span>
                </div>
                <div className='order-status-price'>
                    <Insignia clase={estado.clase}>{estado.texto}</Insignia>
                    <span className="order-price">{formatearPrecio(pedido.total)}</span>
                </div>
            </div>

            <ProgresoPedido etapa={pedido.etapa}/>
            <hr className='order-divider'/>

            <div className="order-item">
                <div className="d-flex align-items-center gap-3">
                <div className="item-img-placeholder">
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div>
                    <p className="m-0 fw-bold fs-6">{producto.nombre}</p>
                    <p className="m-0 text-muted fs-8">
                    {producto.marca} · x{producto.cantidad}
                    </p>
                </div>
                </div>
                <div className="fw-bold">{formatearPrecio(producto.precio)}</div>
            </div>


            {pedido.seguimiento && (
                <div className="order-footer">
                    <span className="fs-8 text-muted">🚚 Código de seguimiento:</span>
                    <span className="tracking-code">{pedido.seguimiento}</span>
                </div>
            )}
        </div>
    )
}

export default TarjetaPedido