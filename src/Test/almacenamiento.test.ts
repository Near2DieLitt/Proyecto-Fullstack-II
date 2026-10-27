// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { agregarAlCarrito, cerrarSesion, guardarSesion, obtenerCarrito, obtenerSesion } from "../components/ts/almacenamiento"


beforeEach(() => localStorage.clear())

describe('almacenamiento', () => {

  it('suma la cantidad si el producto ya está en el carrito', () => {
    const item = { id: 'GA001', nombre: 'Guitarra', precio: 1000, imagen: '' }
    agregarAlCarrito(item, 2)
    agregarAlCarrito(item, 3)
    const carrito = obtenerCarrito()
    expect(carrito).toHaveLength(1)
    expect(carrito[0].cantidad).toBe(5)
  })

  it('guarda y cierra la sesión', () => {
    guardarSesion({ nombre: 'Juan', rol: 'cliente' })
    expect(obtenerSesion()).toEqual({ nombre: 'Juan', rol: 'cliente' })
    cerrarSesion()
    expect(obtenerSesion()).toBeNull()
  })
})
