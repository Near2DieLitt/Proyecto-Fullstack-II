import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerSesion } from '../components/ts/almacenamiento'
import { misPedidos } from '../servicios/pedidosServicio'
import { crearDireccion, direccionesDeUsuario, eliminarDireccion, listarComunas, listarRegiones } from '../servicios/direccionesServicio'
import type { Direccion, Pedido } from '../servicios/tipos'

type Opcion = { id: number; nombre: string }

function MiPerfil() {
  const sesion = obtenerSesion()
  const navegar = useNavigate()
  const idUsuario = Number(localStorage.getItem('idUsuario'))
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [direcciones, setDirecciones] = useState<Direccion[]>([])
  const [regiones, setRegiones] = useState<Opcion[]>([])
  const [comunas, setComunas] = useState<Opcion[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [form, setForm] = useState({
    idRegion: '', idComuna: '', calle: '', numero: '', depto: '', referencia: '', principal: false,
  })

  useEffect(() => {
    if (!sesion) {
      navegar('/inicio-sesion', { replace: true })
      return
    }
    if (!idUsuario) return
    Promise.all([misPedidos(idUsuario), direccionesDeUsuario(idUsuario), listarRegiones()])
      .then(([pedidosApi, direccionesApi, regionesApi]) => {
        setPedidos(pedidosApi)
        setDirecciones(direccionesApi)
        setRegiones(regionesApi)
      })
      .catch(() => alert('No se pudo cargar tu perfil.'))
  }, [idUsuario, navegar, sesion])

  if (!sesion) return null

  async function cambiarRegion(idRegion: string) {
    setForm((actual) => ({ ...actual, idRegion, idComuna: '' }))
    if (idRegion) setComunas(await listarComunas(Number(idRegion)))
  }

  async function guardarDireccion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.idComuna || !form.calle.trim() || !form.numero.trim()) {
      alert('Completa región, comuna, calle y número.')
      return
    }
    try {
      const direccion = await crearDireccion({
        idUsuario,
        idComuna: Number(form.idComuna),
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        depto: form.depto.trim() || undefined,
        referencia: form.referencia.trim() || undefined,
        principal: form.principal || direcciones.length === 0,
      })
      setDirecciones((actuales) => direccion.principal
        ? [...actuales.map((item) => ({ ...item, principal: false })), direccion]
        : [...actuales, direccion])
      setForm({ idRegion: '', idComuna: '', calle: '', numero: '', depto: '', referencia: '', principal: false })
      setComunas([])
      setMostrarFormulario(false)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo guardar la dirección.')
    }
  }

  async function borrarDireccion(id: number) {
    if (!confirm('¿Eliminar esta dirección?')) return
    await eliminarDireccion(id)
    setDirecciones((actuales) => actuales.filter((item) => item.id !== id))
  }

  return (
    <main className="pedidos-wrapper">
      <div className="pedidos-header">
        <h1 className="logo">Mi Perfil</h1>
        <p className="text-muted">Hola, {sesion.nombre} · {pedidos.length} pedidos</p>
      </div>

      <section className="card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Mis direcciones</h2>
          <button className="btn btn-dark" onClick={() => setMostrarFormulario((visible) => !visible)}>
            {mostrarFormulario ? 'Cancelar' : 'Agregar dirección'}
          </button>
        </div>

        {direcciones.length === 0 && !mostrarFormulario && <p className="text-muted">No tienes direcciones guardadas.</p>}
        {direcciones.map((direccion) => (
          <div className="border rounded p-3 mb-2" key={direccion.id}>
            <strong>{direccion.calle} {direccion.numero}</strong>
            {direccion.depto && <span> · Depto. {direccion.depto}</span>}
            <div className="text-muted">{direccion.comuna}, {direccion.region}</div>
            {direccion.principal && <span className="badge text-bg-success me-2">Principal</span>}
            <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => borrarDireccion(direccion.id)}>Eliminar</button>
          </div>
        ))}

        {mostrarFormulario && (
          <form className="border-top pt-3 mt-3" onSubmit={guardarDireccion}>
            <div className="row g-2">
              <div className="col-md-6"><label className="form-label">Región</label>
                <select className="form-select" value={form.idRegion} onChange={(event) => cambiarRegion(event.target.value)} required>
                  <option value="">Selecciona una región</option>
                  {regiones.map((region) => <option value={region.id} key={region.id}>{region.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6"><label className="form-label">Comuna</label>
                <select className="form-select" value={form.idComuna} onChange={(event) => setForm({ ...form, idComuna: event.target.value })} required>
                  <option value="">Selecciona una comuna</option>
                  {comunas.map((comuna) => <option value={comuna.id} key={comuna.id}>{comuna.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-8"><label className="form-label">Calle</label><input className="form-control" value={form.calle} onChange={(event) => setForm({ ...form, calle: event.target.value })} required /></div>
              <div className="col-md-4"><label className="form-label">Número</label><input className="form-control" value={form.numero} onChange={(event) => setForm({ ...form, numero: event.target.value })} required /></div>
              <div className="col-md-6"><label className="form-label">Departamento</label><input className="form-control" value={form.depto} onChange={(event) => setForm({ ...form, depto: event.target.value })} /></div>
              <div className="col-md-6"><label className="form-label">Referencia</label><input className="form-control" value={form.referencia} onChange={(event) => setForm({ ...form, referencia: event.target.value })} /></div>
              <div className="col-12"><label><input type="checkbox" checked={form.principal} onChange={(event) => setForm({ ...form, principal: event.target.checked })} /> Usar como dirección principal</label></div>
            </div>
            <button className="btn btn-success mt-3" type="submit">Guardar dirección</button>
          </form>
        )}
      </section>

      <section>
        <h2 className="h3">Mis pedidos</h2>
        {pedidos.length === 0 && <p className="text-muted">No tienes pedidos registrados.</p>}
        {pedidos.map((pedido) => <article className="card p-3 mb-3" key={pedido.id}>
          <h3 className="h5">Pedido #{pedido.id}</h3>
          <p>Estado: <strong>{pedido.estado}</strong></p>
          <p className="mb-0">Total: ${pedido.total.toLocaleString('es-CL')}</p>
        </article>)}
      </section>
    </main>
  )
}

export default MiPerfil
