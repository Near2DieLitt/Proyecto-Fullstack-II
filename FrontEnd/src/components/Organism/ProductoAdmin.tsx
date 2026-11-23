import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Producto } from '../ts/datos'
import Entrada from '../Atoms/Entrada'
import Boton from '../Atoms/boton'
import Selector from '../Atoms/Selector'
import CampoFormulario from '../Molecule/CampoFormulario'
import AreaTexto from '../Atoms/AreaTexto'

interface OpcionCatalogo {
  id: number
  nombre: string
}

interface Props {
  producto: Producto | null
  categorias: OpcionCatalogo[]
  onGuardar: (producto: Producto) => Promise<void>
  onCerrar: () => void
}

function ProductoAdmin({ producto, categorias, onGuardar, onCerrar }: Props) {
  const [guardando, setGuardando] = useState(false)
  const [form, setForm] = useState({
    id: producto?.id ?? '',
    nombre: producto?.nombre ?? '',
    precio: producto ? String(producto.precio) : '',
    stock: producto ? String(producto.stock) : '',
    stockCritico: String(producto?.stockCritico ?? 2),
    idCategoria: producto?.idCategoria
      ? String(producto.idCategoria)
      : String(categorias.find((opcion) => opcion.nombre === producto?.categoria)?.id ?? ''),
    marca: producto?.marca ?? '',
    descripcion: producto?.descripcion ?? '',
    imagen: producto?.imagen ?? '',
  })

  const cambiar = (campo: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [campo]: e.target.value })

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const idCategoria = Number(form.idCategoria)
    if (!Number.isSafeInteger(idCategoria) || idCategoria < 1) {
      alert('Selecciona una categoría válida antes de guardar.')
      return
    }
    if (!form.marca.trim()) {
      alert('Escribe una marca antes de guardar.')
      return
    }

    setGuardando(true)
    try {
      await onGuardar({
        id: form.id,
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        stockCritico: parseInt(form.stockCritico) || 0,
        categoria: categorias.find((opcion) => opcion.id === idCategoria)?.nombre ?? '',
        descripcion: form.descripcion,
        imagen: form.imagen,
        marca: form.marca.trim(),
        idCategoria,
        idMarca: producto?.idMarca,
      })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" onClick={onCerrar}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content auth-card">
            <div className="modal-header auth-header-bar text-white">
              <h5 className="modal-title fw-bold">{producto ? 'Editar Producto' : 'Nuevo Producto'}</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={enviar}>
                {producto && <p className="text-muted mb-3">ID del producto: {producto.id}</p>}
                <CampoFormulario id="prodNombre" etiqueta="Nombre" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodNombre" className="form-control" required maxLength={100} value={form.nombre} onChange={cambiar('nombre')} />
                </CampoFormulario>
                <CampoFormulario id="prodPrecio" etiqueta="Precio" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodPrecio" type="number" className="form-control" required min={0.01} step="0.01" placeholder="Sin puntos ni comas" value={form.precio} onChange={cambiar('precio')} />
                </CampoFormulario>
                <div className="row">
                  <CampoFormulario id="prodStock" etiqueta="Stock" requerido clase="col-6 mb-3" claseEtiqueta="form-label">
                    <Entrada id="prodStock" type="number" className="form-control" required min={0} value={form.stock} onChange={cambiar('stock')} />
                  </CampoFormulario>
                  <CampoFormulario id="prodStockCritico" etiqueta="Stock Crítico" clase="col-6 mb-3" claseEtiqueta="form-label">
                    <Entrada id="prodStockCritico" type="number" className="form-control" min={0} placeholder="Ej: 2" value={form.stockCritico} onChange={cambiar('stockCritico')} />
                  </CampoFormulario>
                </div>
                <CampoFormulario id="prodCategoria" etiqueta="Categoría" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Selector id="prodCategoria" name="prodCategoria" className="form-select" required placeholder="Seleccione..." opciones={categorias.map((opcion) => ({ valor: String(opcion.id), texto: opcion.nombre }))} value={form.idCategoria} onChange={cambiar('idCategoria')} />
                </CampoFormulario>
                <CampoFormulario id="prodMarca" etiqueta="Marca" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodMarca" className="form-control" required maxLength={100} placeholder="Ej: Yamaha" value={form.marca} onChange={cambiar('marca')} />
                </CampoFormulario>
                <CampoFormulario id="prodDesc" etiqueta="Descripción" clase="mb-3" claseEtiqueta="form-label">
                  <AreaTexto id="prodDesc" className="form-control" maxLength={500} rows={3} value={form.descripcion} onChange={cambiar('descripcion')} />
                </CampoFormulario>
                <CampoFormulario id="prodImg" etiqueta="URL de Imagen" clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodImg" type="url" className="form-control" placeholder="https://..." value={form.imagen} onChange={cambiar('imagen')} />
                </CampoFormulario>
                <Boton type="submit" variante="dark" className="w-100 mt-3" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar Producto'}
                </Boton>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
} export default ProductoAdmin
