import type { ItemCarrito as Item } from '../ts/datos'
import { formatearPrecio } from '../ts/datos'
import Boton from '../Atoms/boton'

import Icono from '../Atoms/Icono'


interface Props {
  item: Item
  stockMaximo: number
  onCambiarCantidad: (id: string, cambio: number) => void
  onEliminar: (id: string) => void
}

function ItemCarrito({ item, stockMaximo, onCambiarCantidad, onEliminar }: Props) {
  return (
    <div className="d-flex align-items-center gap-4 border-bottom py-3">
      <img
        src={item.imagen}
        alt={item.nombre}
        style={{ width: 100, height: 100, objectFit: 'contain' }}
        className="border bg-white p-2"
      />
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-1">{item.nombre}</h5>
        <Boton variante="link" className="text-danger p-0 text-decoration-none fs-7" onClick={() => onEliminar(item.id)}>
          <Icono nombre="trash" /> Eliminar
        </Boton>
      </div>
      <div className="text-end">
        <h5 className="fw-bold mb-2">{formatearPrecio(item.precio)}</h5>
        <div className="d-flex align-items-center justify-content-end gap-2">
          <Boton
            variante="outline-dark"
            className="btn-sm rounded-circle px-2"
            aria-label="Disminuir cantidad"
            onClick={() => onCambiarCantidad(item.id, -1)}
          >
            <Icono nombre="minus" className="fs-8" />
          </Boton>
          <span className="fw-bold px-2">{item.cantidad}</span>
          <Boton
            variante="outline-dark"
            className="btn-sm rounded-circle px-2"
            aria-label="Aumentar cantidad"
            disabled={item.cantidad >= stockMaximo}
            onClick={() => onCambiarCantidad(item.id, 1)}
          >
            <Icono nombre="plus" className="fs-8" />
          </Boton>
        </div>
      </div>
    </div>
  )
} export default ItemCarrito
