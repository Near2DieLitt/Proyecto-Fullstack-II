//@vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import MiPerfil from '../Page/MiPerfil'
import { guardarSesion } from '../components/ts/almacenamiento'
import { misPedidos } from '../service/pedidosServicio'

vi.mock('../service/pedidosServicio', () => ({
  misPedidos: vi.fn(),
}))

describe('MiPerfil', () => {
  beforeEach(() => {
    localStorage.clear()
    guardarSesion({ id: 12, nombre: 'Ana García', rol: 'cliente' })
    vi.mocked(misPedidos).mockResolvedValue([])
  })

  afterEach(cleanup)

  it('muestra cero compras cuando el usuario no tiene pedidos en el backend', async () => {
    render(
      <MemoryRouter>
        <MiPerfil />
      </MemoryRouter>,
    )

    await waitFor(() => expect(misPedidos).toHaveBeenCalledWith(12))
    expect(await screen.findByText(/0 pedidos/)).toBeTruthy()
    expect(screen.getByText('Aún no tienes compras.')).toBeTruthy()
  })
})