import { useState } from 'react'
import type { FormEvent } from 'react'
import { guardarCarrito, obtenerCarrito, obtenerProductos } from '../components/ts/almacenamiento'
import { Link, useNavigate } from 'react-router-dom'
import type { ItemCarrito as Item } from '../components/ts/datos'
import ItemCarrito from '../components/Molecule/ItemCArrito'
import ResumenCarrito from '../components/Organism/ResumenCarrito'
import { crearPedido, metodosDePago, pagarPedido } from '../servicios/pedidosServicio'
import { crearDireccion, direccionesDeUsuario, listarComunas, listarRegiones } from '../servicios/direccionesServicio'
import type { Direccion } from '../servicios/tipos'

type Opcion = { id: number; nombre: string }

function Carrito() {
  const [carrito, setCarrito] = useState<Item[]>(obtenerCarrito)
  const [direcciones, setDirecciones] = useState<Direccion[]>([])
  const [metodos, setMetodos] = useState<{ id: number; nombre: string }[]>([])
  const [checkout, setCheckout] = useState(false)
  const [idDireccion, setIdDireccion] = useState('')
  const [idMetodo, setIdMetodo] = useState('')
  const [regiones, setRegiones] = useState<Opcion[]>([])
  const [comunas, setComunas] = useState<Opcion[]>([])
  const [nuevaDireccion, setNuevaDireccion] = useState(false)
  const [formDireccion, setFormDireccion] = useState({ idRegion: '', idComuna: '', calle: '', numero: '', depto: '', referencia: '', principal: false })
  const navegar = useNavigate()

  function actualizar(nuevo: Item[]) { setCarrito(nuevo); guardarCarrito(nuevo) }
  function cambiarCantidad(id: string, cambio: number) {
    if (cambio > 0) {
      const producto = obtenerProductos().find((p) => p.id === id)
      const item = carrito.find((p) => p.id === id)
      if (!producto || !item || item.cantidad >= producto.stock) return
    }
    actualizar(carrito.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + cambio } : p).filter((p) => p.cantidad > 0))
  }
  function eliminar(id: string) { actualizar(carrito.filter((p) => p.id !== id)) }
  function vaciar() { if (confirm('¿Estás seguro de vaciar el carrito?')) actualizar([]) }

  async function abrirCheckout() {
    if (!carrito.length) { alert('Agrega productos al carrito primero.'); return }
    const idUsuario = Number(localStorage.getItem('idUsuario'))
    if (!idUsuario) { alert('Inicia sesión antes de comprar.'); navegar('/inicio-sesion'); return }
    try {
      const [direccionesApi, metodosApi] = await Promise.all([direccionesDeUsuario(idUsuario), metodosDePago()])
      setDirecciones(direccionesApi)
      setMetodos(metodosApi)
      setIdDireccion(String((direccionesApi.find((item) => item.principal) ?? direccionesApi[0])?.id ?? ''))
      setIdMetodo(String(metodosApi[0]?.id ?? ''))
      setRegiones(await listarRegiones())
      setCheckout(true)
    } catch (error) { alert(error instanceof Error ? error.message : 'No se pudo cargar el checkout.') }
  }

  async function cargarComunas(idRegion: string) {
    setFormDireccion({ ...formDireccion, idRegion, idComuna: '' })
    setComunas(idRegion ? await listarComunas(Number(idRegion)) : [])
  }

  async function guardarNuevaDireccion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const idUsuario = Number(localStorage.getItem('idUsuario'))
    if (!formDireccion.idComuna || !formDireccion.calle || !formDireccion.numero) return
    const direccion = await crearDireccion({
      idUsuario, idComuna: Number(formDireccion.idComuna), calle: formDireccion.calle,
      numero: formDireccion.numero, depto: formDireccion.depto || undefined,
      referencia: formDireccion.referencia || undefined,
      principal: formDireccion.principal || direcciones.length === 0,
    })
    setDirecciones((actuales) => [...actuales.map((item) => direccion.principal ? { ...item, principal: false } : item), direccion])
    setIdDireccion(String(direccion.id))
    setNuevaDireccion(false)
    setFormDireccion({ idRegion: '', idComuna: '', calle: '', numero: '', depto: '', referencia: '', principal: false })
  }

  async function confirmarCompra() {
    const idUsuario = Number(localStorage.getItem('idUsuario'))
    if (!idDireccion || !idMetodo) { alert('Selecciona una dirección y un método de pago.'); return }
    try {
      const pedido = await crearPedido(idUsuario, Number(idDireccion), carrito.map((item) => ({ idProducto: Number(item.id), cantidad: item.cantidad })))
      const pago = await pagarPedido(pedido.id, Number(idMetodo))
      actualizar([]); alert(`Pago ${pago.estado.toLowerCase()}. Pedido #${pedido.id}`); navegar('/mi-perfil')
    } catch (error) { alert(error instanceof Error ? error.message : 'No se pudo procesar el pedido.') }
  }

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  return (
    <main className="container py-5 my-4 min-vh-100">
      <h1 className="playfair-font fw-bold mb-5">Mi carrito de compras</h1>
      <div className="row g-5">
        <div className="col-12 col-lg-8">
          {carrito.length === 0 ? <div className="alert alert-light text-center py-5 border text-muted">Tu carrito está vacío. <Link to="/catalogo" className="text-dark fw-bold">Volver al catálogo</Link></div> : carrito.map((item) => <ItemCarrito key={item.id} item={item} stockMaximo={obtenerProductos().find((producto) => producto.id === item.id)?.stock ?? 999} onCambiarCantidad={cambiarCantidad} onEliminar={eliminar} />)}
        </div>
        <div className="col-12 col-lg-4"><ResumenCarrito total={total} onPagar={abrirCheckout} onVaciar={vaciar} /></div>
      </div>

      {checkout && <section className="card shadow-sm p-4 mt-5">
        <div className="d-flex justify-content-between align-items-center"><h2 className="h4 mb-0">Finalizar compra</h2><button className="btn btn-link" onClick={() => setCheckout(false)}>Cerrar</button></div>
        <div className="row g-3 mt-2">
          <div className="col-md-6"><label className="form-label">Dirección de despacho</label><select className="form-select" value={idDireccion} onChange={(e) => setIdDireccion(e.target.value)}><option value="">Selecciona una dirección</option>{direcciones.map((item) => <option key={item.id} value={item.id}>{item.calle} {item.numero} - {item.comuna}{item.principal ? ' (Principal)' : ''}</option>)}</select><button className="btn btn-outline-dark btn-sm mt-2" onClick={() => setNuevaDireccion(!nuevaDireccion)}>{nuevaDireccion ? 'Cancelar' : '+ Agregar dirección'}</button></div>
          <div className="col-md-6"><label className="form-label">Método de pago</label><select className="form-select" value={idMetodo} onChange={(e) => setIdMetodo(e.target.value)}><option value="">Selecciona un método</option>{metodos.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></div>
        </div>
        {nuevaDireccion && <form className="border-top mt-4 pt-4" onSubmit={guardarNuevaDireccion}><div className="row g-2"><div className="col-md-6"><label className="form-label">Región</label><select className="form-select" value={formDireccion.idRegion} onChange={(e) => cargarComunas(e.target.value)} required><option value="">Selecciona región</option>{regiones.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></div><div className="col-md-6"><label className="form-label">Comuna</label><select className="form-select" value={formDireccion.idComuna} onChange={(e) => setFormDireccion({ ...formDireccion, idComuna: e.target.value })} required><option value="">Selecciona comuna</option>{comunas.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></div><div className="col-md-8"><input className="form-control" placeholder="Calle" value={formDireccion.calle} onChange={(e) => setFormDireccion({ ...formDireccion, calle: e.target.value })} required /></div><div className="col-md-4"><input className="form-control" placeholder="Número" value={formDireccion.numero} onChange={(e) => setFormDireccion({ ...formDireccion, numero: e.target.value })} required /></div><div className="col-md-6"><input className="form-control" placeholder="Departamento" value={formDireccion.depto} onChange={(e) => setFormDireccion({ ...formDireccion, depto: e.target.value })} /></div><div className="col-md-6"><input className="form-control" placeholder="Referencia" value={formDireccion.referencia} onChange={(e) => setFormDireccion({ ...formDireccion, referencia: e.target.value })} /></div><div className="col-12"><label className="direccion-principal"><input className="direccion-principal__input" type="checkbox" checked={formDireccion.principal} onChange={(e) => setFormDireccion({ ...formDireccion, principal: e.target.checked })} /><span className="direccion-principal__box" /> Usar como dirección principal</label></div></div><button className="btn btn-success mt-3" type="submit">Guardar dirección</button></form>}
        <button className="btn btn-success mt-4" onClick={confirmarCompra}>Confirmar y pagar</button>
      </section>}
    </main>
  )
}

export default Carrito
