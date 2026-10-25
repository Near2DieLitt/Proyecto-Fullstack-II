
import { formatearPrecio } from '../../datos'
import Boton from '../Atoms/Boton'

interface Props {
  imagen: string
  nombre: string
  marca: string
  precio: number
  textoBoton: string
  
  a?: string
  onClick?: () => void
  centrado?: boolean
}

export default function TarjetaProducto({ imagen, nombre, marca, precio, textoBoton, a, onClick, centrado = false }: Props) {
  return (
    <div className="product-card">
      <div className="product-img-wrapper bg-white border">
        <img src={imagen} alt={nombre} />
        <Boton variante="dark" a={a} onClick={onClick} className="w-100 rounded-0 add-to-cart-btn">
          {textoBoton}
        </Boton>
      </div>
      <div className={centrado ? 'mt-3 text-center' : 'mt-3'}>
        <p className="brand-text">{marca}</p>
        <h3 className="product-title">{nombre}</h3>
        <p className="product-price">{formatearPrecio(precio)}</p>
      </div>
    </div>
  )
}
