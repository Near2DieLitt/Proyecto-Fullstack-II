import type { Producto } from '../../datos'
import { formatearPrecio } from '../../datos'
import Boton from '../Atoms/boton'

import Icono from '../Atoms/Icono'
import Insignia from '../Atoms/Insignia'


interface Props {
  producto: Producto
  onEditar: (producto: Producto) => void
  onEliminar: (producto: Producto) => void
}

function FilaProducto({ producto: p, onEditar, onEliminar }: Props) {
  const stockCritico = p.stockCritico > 0 && p.stock <= p.stockCritico

  return (
    <tr>
      <td className="fw-bold">{p.id}</td>
      <td>
        {p.imagen ? (
          <img src={p.imagen} alt={p.nombre} width={50} height={50} style={{ objectFit: 'cover' }} className="border" />
        ) : (
          <div className="bg-light border" style={{ width: 50, height: 50 }}></div>
        )}
      </td>
      <td>
        {p.nombre}
        {stockCritico && (
          <>
            <br />
            <span className="mt-1 d-inline-block">
              <Insignia clase="badge bg-danger">¡Stock Crítico!</Insignia>
            </span>
          </>
        )}
      </td>
      <td>{p.categoria || 'S/C'}</td>
      <td className="text-success fw-bold">{formatearPrecio(p.precio)}</td>
      <td>{p.stock || 0} unid.</td>
      <td>
        <Boton variante="outline-dark" className="btn-sm me-1" aria-label={`Editar ${p.nombre}`} onClick={() => onEditar(p)}>
          <Icono nombre="pen-to-square" />
        </Boton>
        <Boton variante="danger" className="btn-sm" aria-label={`Eliminar ${p.nombre}`} onClick={() => onEliminar(p)}>
          <Icono nombre="trash" />
        </Boton>
      </td>
    </tr>
  )
}export default FilaProducto
