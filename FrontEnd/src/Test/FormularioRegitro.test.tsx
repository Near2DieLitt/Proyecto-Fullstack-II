//@vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import FormularioRegistro from '../components/Organism/FormularioRegistro'
import { registrar } from '../service/autenticacionServicio'

vi.mock('../service/autenticacionServicio', () => ({
  registrar: vi.fn(),
}))


describe('FormularioRegistro', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.mocked(registrar).mockResolvedValue({
      id: 7,
      nombre: 'Ana García',
      correo: 'ana@ejemplo.com',
      telefono: null,
      rol: 'CLIENTE',
      activo: true,
    })
  })

  it('registra la cuenta en el backend y guarda la sesión recibida', async () => {
    render(
      <MemoryRouter>
        <FormularioRegistro />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/NOMBRE/), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/APELLIDOS/), { target: { value: 'García' } })
    fireEvent.change(screen.getByLabelText(/CORREO ELECTRÓNICO/), { target: { value: 'ana@ejemplo.com' } })
    fireEvent.change(screen.getByLabelText(/^CONTRASEÑA/), { target: { value: '123456' } })
    fireEvent.change(screen.getByLabelText(/CONFIRMAR/), { target: { value: '123456' } })
    fireEvent.click(screen.getByText('CREAR CUENTA'))

    await waitFor(() => expect(registrar).toHaveBeenCalledWith({
      nombre: 'Ana García',
      correo: 'ana@ejemplo.com',
      password: '123456',
    }))
    expect(localStorage.getItem('nombreUsuario')).toBe('Ana García')
    expect(localStorage.getItem('rolUsuario')).toBe('cliente')
    expect(localStorage.getItem('idUsuario')).toBe('7')
  })

})
