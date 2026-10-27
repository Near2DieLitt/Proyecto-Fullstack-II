// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import BannerVisita from '../components/Organism/BannerVisita'


describe('BannerVisita', () => {
  it('muestra el texto del banner y el enlace', () => {
    render(
      <MemoryRouter>
        <BannerVisita />
      </MemoryRouter>,
    )

    expect(screen.getByText('VISÍTANOS')).toBeTruthy()
    expect(screen.getByText('Estamos en Viña del Mar')).toBeTruthy()
    expect(screen.getByText('VER EN EL MAPA').getAttribute('href')).toBe('/nuestra-tienda')
  })
})