// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import FormularioRegistro from '../components/Organism/FormularioRegistro'

describe('FormularioRegistro', () => {
  it('registra la cuenta usando el microservicio de usuarios', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: 8, nombre: 'Ana García', rol: 'CLIENTE' }),
    }))
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<MemoryRouter><FormularioRegistro /></MemoryRouter>)
    fireEvent.change(screen.getByLabelText('NOMBRE *'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('APELLIDOS *'), { target: { value: 'García' } })
    fireEvent.change(screen.getByLabelText('CORREO ELECTRÓNICO *'), { target: { value: 'ana@ejemplo.com' } })
    fireEvent.change(screen.getByLabelText('CONTRASEÑA *'), { target: { value: '1234' } })
    fireEvent.change(screen.getByLabelText('CONFIRMAR *'), { target: { value: '1234' } })
    fireEvent.click(screen.getByText('CREAR CUENTA'))

    await waitFor(() => expect(localStorage.getItem('idUsuario')).toBe('8'))
    vi.unstubAllGlobals()
  })
})
