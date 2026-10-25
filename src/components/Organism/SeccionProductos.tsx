import type { Producto } from '../ts/datos'
import TarjetaProducto from '../Molecule/TarjetaProducto'
import EncabezadoSeccion from '../Molecule/EncabezadoSeccion'

export type ProductoDestacado = Pick<Producto, 'id' | 'nombre' | 'marca' | 'precio' | 'imagen'>

interface Props {
  titulo: string
  productos: ProductoDestacado[]
  onAgregar: (producto: ProductoDestacado) => void
}

function SeccionProductos({ titulo, productos, onAgregar }: Props) {
  return (
    <section className="container py-5 my-5">
      <EncabezadoSeccion titulo={titulo} />
      <div className="row g-4">
        {productos.map((p) => (
          <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
            <TarjetaProducto {...p} textoBoton="AGREGAR AL CARRITO" onClick={() => onAgregar(p)} />
          </div>
        ))}
      </div>
    </section>
  )
} export default SeccionProductos
