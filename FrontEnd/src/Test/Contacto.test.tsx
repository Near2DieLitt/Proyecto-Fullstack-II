// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Contacto from '../Page/Contacto'

describe('Contacto', () => {
  it('envia el formulario al microservicio de mensajeria', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: 1 }),
    }))

    render(<Contacto />)

    expect(screen.getByText('Contacto')).toBeTruthy()
    fireEvent.change(screen.getByPlaceholderText('Tu nombre completo'), {
      target: { value: 'Ana' },
    })
    fireEvent.change(screen.getByPlaceholderText('nombre@ejemplo.com'), {
      target: { value: 'ana@ejemplo.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('¿En qué podemos ayudarte?'), {
      target: { value: 'Quiero consultar por una guitarra.' },
    })
    fireEvent.click(screen.getByText('ENVIAR MENSAJE'))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Mensaje guardado correctamente')
    })
    vi.unstubAllGlobals()
  })
})
