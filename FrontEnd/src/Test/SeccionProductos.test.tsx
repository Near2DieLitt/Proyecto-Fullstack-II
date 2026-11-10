// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import SeccionProductos from '../components/Organism/SeccionProductos'


describe('SeccionProductos', () => {
  const productos = [
    { id: 'P1', nombre: 'Guitarra', marca: 'Yamaha', precio: 199990, imagen: 'guitarra.jpg' },
    { id: 'P2', nombre: 'Bajo', marca: 'Fender', precio: 249990, imagen: 'bajo.jpg' },
  ]

  it('renderiza los productos y el encabezado', () => {
    render(
      <MemoryRouter>
        <SeccionProductos titulo="Productos destacados" productos={productos} onAgregar={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Productos destacados')).toBeTruthy()
    expect(screen.getByText('Guitarra')).toBeTruthy()
    expect(screen.getByText('Bajo')).toBeTruthy()
  })

})