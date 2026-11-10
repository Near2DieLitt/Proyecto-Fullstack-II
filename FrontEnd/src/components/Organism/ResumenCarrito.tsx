
import Entrada from '../Atoms/Entrada'
import Boton from '../Atoms/boton'
import { formatearPrecio } from '../ts/datos'

interface Props {
  total: number
  onPagar: () => void
  onVaciar: () => void
}

function ResumenCarrito({ total, onPagar, onVaciar }: Props) {
  return (
    <div className="bg-white p-4 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h4 className="fw-bold mb-0">TOTAL:</h4>
        <h3 className="fw-bold mb-0 text-dark">{formatearPrecio(total)}</h3>
      </div>

      <div className="mb-4">
        <label htmlFor="cupon" className="form-label fs-7 text-muted">
          Ingrese su cupón de descuento
        </label>
        <div className="d-flex gap-2">
          <Entrada id="cupon" className="form-control rounded-0" placeholder="Ej: SONIDO20" />
          <Boton variante="outline-secondary" className="rounded-0">
            APLICAR
          </Boton>
        </div>
      </div>

      <Boton variante="success" className="w-100 rounded-0 py-3 fw-bold fs-6" onClick={onPagar}>
        PAGAR
      </Boton>
      <Boton variante="outline-danger" className="w-100 rounded-0 py-2 mt-2 fs-7 fw-bold" onClick={onVaciar}>
        VACIAR CARRITO
      </Boton>
    </div>
  )
}export default ResumenCarrito
