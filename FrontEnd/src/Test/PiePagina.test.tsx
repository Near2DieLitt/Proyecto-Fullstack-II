//@vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import PiePagina from '../components/Organism/PiePagina'


describe('PiePagina', () => {
  it('muestra navegación y contacto', () => {
    render(
      <MemoryRouter>
        <PiePagina />
      </MemoryRouter>,
    )

    expect(screen.getByText('Navegación')).toBeTruthy()
    expect(screen.getByText('Contacto')).toBeTruthy()
    expect(screen.getByText('Catálogo').getAttribute('href')).toBe('/catalogo')
    expect(screen.getByText('Mapa y contacto').getAttribute('href')).toBe('/nuestra-tienda')
    expect(screen.getByText('Mis pedidos').getAttribute('href')).toBe('/mi-perfil')
  })
})
