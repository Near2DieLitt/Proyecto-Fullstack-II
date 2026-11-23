import { useEffect, useState } from 'react'
import { guardarCarrito, obtenerCarrito, obtenerProductos, obtenerSesion } from '../components/ts/almacenamiento'
import { Link, useNavigate } from 'react-router-dom'
import type { ItemCarrito as Item } from '../components/ts/datos'
import ItemCarrito from '../components/Molecule/ItemCArrito'
import ResumenCarrito from '../components/Organism/ResumenCarrito'
import { stockDeProducto } from '../service/inventarioServicio'
import { cancelarPedido, crearPedido, metodosDePago, pagarPedido } from '../service/pedidosServicio'
import { crearDireccion, direccionesDeUsuario, listarComunas, listarRegiones } from '../service/direccionesServicio'
import { mensajeDeError } from '../service/api'
import type { Direccion } from '../service/tipos'


function Carrito() {
 const [carrito, setCarrito] = useState<Item[]>(obtenerCarrito)
  const [stocks, setStocks] = useState<Record<string, number>>({})
  const [checkoutAbierto, setCheckoutAbierto] = useState(false)
  const [direcciones, setDirecciones] = useState<Direccion[]>([])
  const [regiones, setRegiones] = useState<{ id: number; nombre: string }[]>([])
  const [comunas, setComunas] = useState<{ id: number; nombre: string }[]>([])
  const [metodos, setMetodos] = useState<{ id: number; nombre: string }[]>([])
  const [idDireccion, setIdDireccion] = useState('nueva')
  const [idRegion, setIdRegion] = useState('')
  const [idComuna, setIdComuna] = useState('')
  const [idMetodoPago, setIdMetodoPago] = useState('')
  const [calle, setCalle] = useState('')
  const [numero, setNumero] = useState('')
  const [depto, setDepto] = useState('')
  const [cargandoCheckout, setCargandoCheckout] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [errorCheckout, setErrorCheckout] = useState('')
  const navegar = useNavigate()
  const sesion = obtenerSesion()

  useEffect(() => {
    let activa = true
    Promise.all(carrito.map(async (item) => {
      const idProducto = Number(item.id)
      if (!Number.isSafeInteger(idProducto) || idProducto < 1) return [item.id, -1] as const
      const resultado = await stockDeProducto(idProducto)
      return [item.id, resultado.stockTotal] as const
    }))
      .then((entradas) => { if (activa) setStocks(Object.fromEntries(entradas)) })
      .catch(() => { if (activa) setErrorCheckout('No se pudo consultar el inventario. Verifica que los servicios estén iniciados.') })
    return () => { activa = false }
  }, [carrito])

  useEffect(() => {
    if (!checkoutAbierto || !sesion?.id) return
    let activa = true
    setCargandoCheckout(true)
    Promise.all([direccionesDeUsuario(sesion.id), listarRegiones(), metodosDePago()])
      .then(([direccionesUsuario, regionesDisponibles, metodosDisponibles]) => {
        if (!activa) return
        setDirecciones(direccionesUsuario)
        setRegiones(regionesDisponibles)
        setMetodos(metodosDisponibles)
        setIdDireccion(direccionesUsuario[0] ? String(direccionesUsuario[0].id) : 'nueva')
        setIdMetodoPago(metodosDisponibles[0] ? String(metodosDisponibles[0].id) : '')
        setIdRegion(regionesDisponibles[0] ? String(regionesDisponibles[0].id) : '')
      })
      .catch((error: unknown) => { if (activa) setErrorCheckout(mensajeDeError(error, 'No se pudo preparar el checkout.')) })
      .finally(() => { if (activa) setCargandoCheckout(false) })
    return () => { activa = false }
  }, [checkoutAbierto, sesion?.id])

  useEffect(() => {
    if (!idRegion) {
      setComunas([])
      setIdComuna('')
      return
    }
    let activa = true
    listarComunas(Number(idRegion))
      .then((resultado) => {
        if (!activa) return
        setComunas(resultado)
        setIdComuna(resultado[0] ? String(resultado[0].id) : '')
      })
      .catch((error: unknown) => { if (activa) setErrorCheckout(mensajeDeError(error, 'No se pudieron cargar las comunas.')) })
    return () => { activa = false }
  }, [idRegion])

  function actualizar(nuevo: Item[]) {
    setCarrito(nuevo)
    guardarCarrito(nuevo)
  }

  function cambiarCantidad(id: string, cambio: number) {
    if (cambio > 0) {
      const producto = obtenerProductos().find((p) => p.id === id)
      const item = carrito.find((p) => p.id === id)
      const stockActual = stocks[id] ?? producto?.stock ?? 0
      if (!producto || !item || item.cantidad >= stockActual) return
    }

    actualizar(
      carrito
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + cambio } : p))
        .filter((p) => p.cantidad > 0),
    )
  }

  function eliminar(id: string) {
    actualizar(carrito.filter((p) => p.id !== id))
  }

  function vaciar() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) actualizar([])
  }

  function pagar() {
    if (carrito.length === 0) {
      alert('Agrega productos al carrito primero.')
      return
    }
    if (!sesion?.id) {
      navegar('/inicio-sesion')
      return
    }
    if (carrito.some((item) => !Number.isSafeInteger(Number(item.id)))) {
      setErrorCheckout('El carrito contiene productos antiguos que no existen en el catálogo actual. Vacía el carrito y agrega productos nuevamente.')
      return
    }
    setErrorCheckout('')
    setCheckoutAbierto(true)
  }

  async function confirmarCompra(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!sesion?.id || !idMetodoPago) return
    setProcesando(true)
    setErrorCheckout('')
    let idPedido: number | undefined
    try {
      let direccionElegida: Direccion | undefined
      if (idDireccion === 'nueva') {
        if (!idComuna || !calle.trim() || !numero.trim()) {
          setErrorCheckout('Completa calle, número y comuna para el despacho.')
          return
        }
        direccionElegida = await crearDireccion({
          idUsuario: sesion.id,
          calle: calle.trim(),
          numero: numero.trim(),
          ...(depto.trim() ? { depto: depto.trim() } : {}),
          idComuna: Number(idComuna),
          principal: direcciones.length === 0,
        })
      } else {
        direccionElegida = direcciones.find((direccion) => direccion.id === Number(idDireccion))
      }
      if (!direccionElegida) throw new Error('Selecciona una dirección válida.')

      const pedido = await crearPedido(sesion.id, direccionElegida.id, carrito.map((item) => ({
        idProducto: Number(item.id),
        cantidad: item.cantidad,
      })))
      idPedido = pedido.id
      const pago = await pagarPedido(pedido.id, Number(idMetodoPago))
      if (pago.estado !== 'APROBADO') {
        throw new Error('El pago fue rechazado. No se realizó el cobro; revisa el método de pago e inténtalo nuevamente.')
      }
      actualizar([])
      setCheckoutAbierto(false)
      alert(`Compra confirmada. Número de pedido: ${pedido.id}`)
      navegar('/mi-perfil')
    } catch (error) {
      if (idPedido !== undefined) await cancelarPedido(idPedido).catch(() => undefined)
      setErrorCheckout(mensajeDeError(error, 'No se pudo completar la compra. El carrito se conservó.'))
    } finally {
      setProcesando(false)
    }
  }

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  return (
    <main className="container py-5 my-4 min-vh-100">
      <h1 className="playfair-font fw-bold mb-5">Mi carrito de compras</h1>

      <div className="row g-5">
        <div className="col-12 col-lg-8">
          {carrito.length === 0 ? (
            <div className="alert alert-light text-center py-5 border text-muted">
              Tu carrito está vacío.{' '}
              <Link to="/catalogo" className="text-dark fw-bold">
                Volver al catálogo
              </Link>
            </div>
          ) : (
            carrito.map((item) => (
              <ItemCarrito
                key={item.id}
                item={item}
                stockMaximo={Math.max(0, stocks[item.id] ?? obtenerProductos().find((producto) => producto.id === item.id)?.stock ?? 0)}
                onCambiarCantidad={cambiarCantidad}
                onEliminar={eliminar}
              />
            ))
          )}
        </div>

        <div className="col-12 col-lg-4">
          <ResumenCarrito total={total} onPagar={pagar} onVaciar={vaciar} />
          {errorCheckout && <p role="alert" className="alert alert-danger mt-3">{errorCheckout}</p>}
          {checkoutAbierto && (
            <form className="border p-3 mt-3 bg-white" onSubmit={confirmarCompra}>
              <h2 className="h5 mb-3">Despacho y pago</h2>
              {cargandoCheckout ? <p role="status">Cargando opciones...</p> : <>
                <label className="form-label" htmlFor="direccion-checkout">Dirección de despacho</label>
                <select id="direccion-checkout" className="form-select mb-3" value={idDireccion} onChange={(e) => setIdDireccion(e.target.value)}>
                  {direcciones.map((direccion) => <option key={direccion.id} value={direccion.id}>{direccion.calle} {direccion.numero}, {direccion.comuna}</option>)}
                  <option value="nueva">Ingresar nueva dirección</option>
                </select>
                {idDireccion === 'nueva' && <>
                  <label className="form-label" htmlFor="region-checkout">Región</label>
                  <select id="region-checkout" className="form-select mb-3" required value={idRegion} onChange={(e) => setIdRegion(e.target.value)}>
                    <option value="">Seleccionar región</option>
                    {regiones.map((region) => <option key={region.id} value={region.id}>{region.nombre}</option>)}
                  </select>
                  <label className="form-label" htmlFor="comuna-checkout">Comuna</label>
                  <select id="comuna-checkout" className="form-select mb-3" required value={idComuna} onChange={(e) => setIdComuna(e.target.value)}>
                    <option value="">Seleccionar comuna</option>
                    {comunas.map((comuna) => <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>)}
                  </select>
                  <label className="form-label" htmlFor="calle-checkout">Calle</label>
                  <input id="calle-checkout" className="form-control mb-3" required maxLength={150} value={calle} onChange={(e) => setCalle(e.target.value)} />
                  <label className="form-label" htmlFor="numero-checkout">Número</label>
                  <input id="numero-checkout" className="form-control mb-3" required maxLength={20} value={numero} onChange={(e) => setNumero(e.target.value)} />
                  <label className="form-label" htmlFor="depto-checkout">Depto. (opcional)</label>
                  <input id="depto-checkout" className="form-control mb-3" maxLength={20} value={depto} onChange={(e) => setDepto(e.target.value)} />
                </>}
                <label className="form-label" htmlFor="metodo-pago">Método de pago</label>
                <select id="metodo-pago" className="form-select mb-3" required value={idMetodoPago} onChange={(e) => setIdMetodoPago(e.target.value)}>
                  <option value="">Seleccionar método</option>
                  {metodos.map((metodo) => <option key={metodo.id} value={metodo.id}>{metodo.nombre.replaceAll('_', ' ')}</option>)}
                </select>
                <button className="btn btn-success w-100" type="submit" disabled={procesando || metodos.length === 0}>
                  {procesando ? 'Procesando...' : 'Confirmar compra'}
                </button>
              </>}
            </form>
          )}
        </div>
      </div>
    </main>
  )

}export default Carrito