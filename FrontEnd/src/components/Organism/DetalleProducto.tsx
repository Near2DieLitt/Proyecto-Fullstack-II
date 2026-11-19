import { useState } from 'react'

import Icono from '../Atoms/Icono'
import Insignia from '../Atoms/Insignia'
import Entrada from '../Atoms/Entrada'
import { formatearPrecio, Producto } from '../ts/datos'
import Boton from '../Atoms/boton'

interface Props {
  producto: Producto
  onAgregar: (cantidad: number) => void
}

function DetalleProducto({ producto, onAgregar }: Props) {
  const [cantidad, setCantidad] = useState('1')
  const [error, setError] = useState('')
  const hayStock = producto.stock > 0

  function agregar() {
    const numero = Number(cantidad)
    if (!/^\d+$/.test(cantidad.trim()) || numero < 1 || numero > producto.stock) {
      setError(`Ingresa una cantidad entera entre 1 y ${producto.stock}.`)
      return
    }
    setError('')
    onAgregar(numero)
  }

  return (
    <div className="row g-5">
      <div className="col-12 col-md-6">
        <div className="bg-white border p-4 mb-3 d-flex justify-content-center align-items-center" style={{ height: 450 }}>
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div className="d-flex gap-2">
          <div className="border p-2 bg-white" style={{ width: 80, height: 80 }}>
            <img src={producto.imagen} alt="" className="img-fluid w-100 h-100 object-fit-contain" />
          </div>
          {[1, 2].map((n) => (
            <div key={n} className="border p-2 bg-white opacity-50" style={{ width: 80, height: 80 }}>
              <Icono nombre="image" className="fs-3 text-muted d-flex justify-content-center align-items-center h-100" />
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-md-6">
        <p className="brand-text fs-6 mb-1">{producto.marca}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="product-title fs-2 mb-0">{producto.nombre}</h1>
          <h2 className="product-price fs-2 mb-0 text-dark">{formatearPrecio(producto.precio)}</h2>
        </div>

        <hr className="my-4" />

        <p className="text-muted lh-lg">{producto.descripcion}</p>

        <p className="fs-7 fw-bold mt-4 mb-2">DISPONIBILIDAD:</p>
        <div className="mb-4">
          {hayStock ? (
            <Insignia clase="badge bg-success px-3 py-2">En stock ({producto.stock} unid.)</Insignia>
          ) : (
            <Insignia clase="badge bg-danger px-3 py-2">Agotado</Insignia>
          )}
        </div>

        <div className="d-flex gap-3 align-items-end mt-4">
          <div style={{ width: 100 }}>
            <label htmlFor="det-cantidad" className="form-label fs-7 fw-bold text-muted mb-1">
              CANTIDAD
            </label>
            <Entrada
              id="det-cantidad"
              type="number"
              className="form-control rounded-0 text-center"
              min={1}
              max={producto.stock}
              disabled={!hayStock}
              aria-invalid={!!error}
              value={cantidad}
              onChange={(e) => {setCantidad(e.target.value)
                setError('')
              }}
              
            />
          </div>
          <Boton variante="dark" className="rounded-0 px-5 py-2 fw-bold w-100 h-100" disabled={!hayStock} onClick={agregar}>
            AÑADIR AL CARRITO
          </Boton>
        </div>
      </div>
    </div>
  )
} export default DetalleProducto
