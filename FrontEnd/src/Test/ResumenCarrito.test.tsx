// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ResumenCarrito from '../components/Organism/ResumenCarrito'

describe('ResumenCarrito', () => {
  it('muestra el total, cupón y botones de acción', () => {
    const onPagar = vi.fn()
    const onVaciar = vi.fn()

    render(<ResumenCarrito total={249990} onPagar={onPagar} onVaciar={onVaciar} />)

    expect(screen.getByText(/total:/i)).toBeTruthy()
    expect(screen.getByText(/\$249\.?990/)).toBeTruthy()
    expect(screen.getByLabelText(/ingrese su cupón/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /pagar/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /vaciar carrito/i })).toBeTruthy()
  })

})