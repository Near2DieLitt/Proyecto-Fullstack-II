import { productosBase } from './datos'
import type { ItemCarrito, Producto, Sesion } from './datos'

const CLAVE_PRODUCTOS = 'productosCatalogo'
const CLAVE_CARRITO = 'carritoCompras'
const CLAVE_NOMBRE = 'nombreUsuario'
const CLAVE_ROL = 'rolUsuario'

function leer<T>(clave: string): T | null {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? (JSON.parse(valor) as T) : null
  } catch {
    return null
  }
}

/* Productos */
export function obtenerProductos(): Producto[] {
  const guardados = leer<Producto[]>(CLAVE_PRODUCTOS)
  if (guardados) return guardados
  guardarProductos(productosBase)
  return productosBase
}

export function guardarProductos(productos: Producto[]) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}

/* Carrito */
export function obtenerCarrito(): ItemCarrito[] {
  return leer<ItemCarrito[]>(CLAVE_CARRITO) ?? []
}

export function guardarCarrito(carrito: ItemCarrito[]) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
}

export function agregarAlCarrito(item: Omit<ItemCarrito, 'cantidad'>, cantidad = 1): boolean {
  const producto = obtenerProductos().find((p) => p.id === item.id)
  if (!producto || cantidad < 1) return false

  const carrito = obtenerCarrito()
  const existente = carrito.find((p) => p.id === item.id)
  const cantidadActual = existente?.cantidad ?? 0
  if (cantidadActual + cantidad > producto.stock) return false

  if (existente) {
    existente.cantidad += cantidad
  } else {
    carrito.push({ ...item, cantidad })
  }
  guardarCarrito(carrito)
  return true
}

/* Sesión */
export function obtenerSesion(): Sesion | null {
  const nombre = localStorage.getItem(CLAVE_NOMBRE)
  const rol = localStorage.getItem(CLAVE_ROL)
  if (!nombre || !rol) return null
  return { nombre, rol: rol === 'admin' ? 'admin' : 'cliente' }
}

export function guardarSesion(sesion: Sesion) {
  localStorage.setItem(CLAVE_NOMBRE, sesion.nombre)
  localStorage.setItem(CLAVE_ROL, sesion.rol)
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_NOMBRE)
  localStorage.removeItem(CLAVE_ROL)
}
