//@vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import PanelSesionActiva from '../components/Organism/PanelSesionActiva'

afterEach(cleanup)

describe('PanelSesionActiva', () => {
  it('muestra la sesión del cliente y el cierre', () => {
    const onCerrarSesion = vi.fn()

    render(
      <MemoryRouter>
        <PanelSesionActiva sesion={{ nombre: 'Juan', rol: 'cliente' }} onCerrarSesion={onCerrarSesion} />
      </MemoryRouter>,
    )

    expect(screen.getByText('¡Bienvenido de vuelta, Juan!')).toBeTruthy()
    expect(screen.getByText('IR A MI PANEL').getAttribute('href')).toBe('/mi-perfil')
    fireEvent.click(screen.getByText('CERRAR SESIÓN'))
    expect(onCerrarSesion).toHaveBeenCalledTimes(1)
  })

  it('usa la ruta del administrador', () => {
    render(
      <MemoryRouter>
        <PanelSesionActiva sesion={{ nombre: 'Admin', rol: 'admin' }} onCerrarSesion={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('IR A MI PANEL').getAttribute('href')).toBe('/admin-productos')
  })
})
