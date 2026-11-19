// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DetalleProducto from '../components/Organism/DetalleProducto'


describe('DetalleProducto', () => {
  const producto = {
    id: 'GA001',
    marca: 'Yamaha',
    nombre: 'Guitarra Acústica Folk',
    precio: 129990,
    descripcion: 'Buena para principiantes.',
    categoria: 'Guitarras Acústicas',
    stock: 5,
    stockCritico: 2,
    imagen: 'guitarra.jpg',
  }

  it('muestra la información principal del producto y el estado en stock', () => {
    render(<DetalleProducto producto={producto} onAgregar={vi.fn()} />)

    expect(screen.getByText('Yamaha')).toBeTruthy()
    expect(screen.getByText('Guitarra Acústica Folk')).toBeTruthy()
    expect(screen.getByText('$129.990')).toBeTruthy()
    expect(screen.getByText('Buena para principiantes.')).toBeTruthy()
    expect(screen.getByText('En stock (5 unid.)')).toBeTruthy()
  })
})