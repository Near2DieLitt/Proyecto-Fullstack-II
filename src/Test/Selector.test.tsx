// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import Selector from '../components/Atoms/Selector'
import { describe, expect, it } from 'vitest'


describe('Selector', () => {
  it('muestra el placeholder y las opciones disponibles', () => {
    render(
      <Selector
        aria-label="Categoría"
        defaultValue="guitarra"
        placeholder="Selecciona una categoría"
        opciones={[
          { valor: 'guitarra', texto: 'Guitarra' },
          { valor: 'bajo', texto: 'Bajo' },
        ]}
      />,
    )

    const selector = screen.getByLabelText('Categoría') as HTMLSelectElement

    expect(selector).toBeTruthy()
    expect(screen.getByRole('option', { name: 'Selecciona una categoría' })).toBeTruthy()
    expect(screen.getByRole('option', { name: 'Guitarra' })).toBeTruthy()
    expect(screen.getByRole('option', { name: 'Bajo' })).toBeTruthy()
    expect(selector.value).toBe('guitarra')
  })
})