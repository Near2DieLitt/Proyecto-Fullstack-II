import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Producto } from '../ts/datos'
import Entrada from '../Atoms/Entrada'
import Boton from '../Atoms/boton'
import Selector from '../Atoms/Selector'
import CampoFormulario from '../Molecule/CampoFormulario'
import AreaTexto from '../Atoms/AreaTexto'
const categorias = [
  'Guitarras Acústicas',
  'Guitarras Eléctricas',
  'Bajos Eléctricos',
  'Baterías',
  'Teclados y Pianos',
  'Amplificadores',
  'Micrófonos',
  'Pedales de Efectos',
  'Accesorios',
  'Estudio y Grabación',
].map((c) => ({ valor: c, texto: c }))

interface Props {

  producto: Producto | null
  onGuardar: (producto: Producto) => void
  onCerrar: () => void
}

function ProductoAdmin({ producto, onGuardar, onCerrar }: Props) {
  const [form, setForm] = useState({
    id: producto?.id ?? '',
    nombre: producto?.nombre ?? '',
    precio: producto ? String(producto.precio) : '',
    stock: producto ? String(producto.stock) : '',
    stockCritico: producto?.stockCritico ? String(producto.stockCritico) : '',
    categoria: producto?.categoria ?? '',
    descripcion: producto?.descripcion ?? '',
    imagen: producto?.imagen ?? '',
  })

  const cambiar = (campo: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [campo]: e.target.value })

  function enviar(e: FormEvent) {
    e.preventDefault()
    onGuardar({
      id: form.id,
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      stockCritico: parseInt(form.stockCritico) || 0,
      categoria: form.categoria,
      descripcion: form.descripcion,
      imagen: form.imagen,
      marca: producto?.marca ?? 'Sonido Vivo',
    })
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
                <CampoFormulario id="prodCodigo" etiqueta="Código producto" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodCodigo" className="form-control" required minLength={3} placeholder="Ej: GA001" value={form.id} onChange={cambiar('id')} />
                </CampoFormulario>
                <CampoFormulario id="prodNombre" etiqueta="Nombre" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodNombre" className="form-control" required maxLength={100} value={form.nombre} onChange={cambiar('nombre')} />
                </CampoFormulario>
                <CampoFormulario id="prodPrecio" etiqueta="Precio" requerido clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodPrecio" type="number" className="form-control" required min={0} placeholder="Sin puntos ni comas" value={form.precio} onChange={cambiar('precio')} />
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
                  <Selector id="prodCategoria" className="form-select" required placeholder="Seleccione..." opciones={categorias} value={form.categoria} onChange={cambiar('categoria')} />
                </CampoFormulario>
                <CampoFormulario id="prodDesc" etiqueta="Descripción" clase="mb-3" claseEtiqueta="form-label">
                  <AreaTexto id="prodDesc" className="form-control" maxLength={500} rows={3} value={form.descripcion} onChange={cambiar('descripcion')} />
                </CampoFormulario>
                <CampoFormulario id="prodImg" etiqueta="URL de Imagen" clase="mb-3" claseEtiqueta="form-label">
                  <Entrada id="prodImg" type="url" className="form-control" placeholder="https://..." value={form.imagen} onChange={cambiar('imagen')} />
                </CampoFormulario>
                <Boton type="submit" variante="dark" className="w-100 mt-3">
                  Guardar Producto
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
