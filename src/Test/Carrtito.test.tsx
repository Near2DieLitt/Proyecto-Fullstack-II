// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Carrito from '../Page/Carrito'
import { agregarAlCarrito, obtenerCarrito } from '../components/ts/almacenamiento'

const mostrar = () =>
  render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>,
  )

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('Carrito', () => {
  it('muestra el mensaje de carrito vacío', () => {
    mostrar()
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })

  it('calcula el total y cambia cantidades', () => {
    agregarAlCarrito({ id: 'GA001', nombre: 'Guitarra Folk', precio: 100000, imagen: 'guitarra.png' }, 1)
    mostrar()
    expect(screen.getAllByText('$100.000').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByLabelText('Aumentar cantidad'))
    expect(screen.getByText('$200.000')).toBeTruthy()
    expect(obtenerCarrito()[0].cantidad).toBe(2)

    fireEvent.click(screen.getByLabelText('Disminuir cantidad'))
    fireEvent.click(screen.getByLabelText('Disminuir cantidad'))
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })
})
