import FilaProducto from '../Molecule/FilaProducto'
import { Producto } from "../ts/datos"


interface Props {
  productos: Producto[]
  onEditar: (producto: Producto) => void
  onEliminar: (producto: Producto) => void
}

function TablaProductos({ productos, onEditar, onEliminar }: Props) {
  return (
    <div className="bg-white p-4 border rounded shadow-sm overflow-auto">
      <table className="table align-middle table-hover">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <FilaProducto key={p.id} producto={p} onEditar={onEditar} onEliminar={onEliminar} />
          ))}
        </tbody>
      </table>
    </div>
  )
}export default TablaProductos
