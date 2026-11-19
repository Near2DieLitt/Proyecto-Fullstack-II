//@vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import FormularioRegistro from '../components/Organism/FormularioRegistro'


describe('FormularioRegistro', () => {


  it('crea la cuenta cuando los datos son válidos', () => {
    render(
      <MemoryRouter>
        <FormularioRegistro />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/RUN/), { target: { value: '12345678K' } })
    fireEvent.change(screen.getByLabelText(/NOMBRE/), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/APELLIDOS/), { target: { value: 'García' } })
    fireEvent.change(screen.getByLabelText(/CORREO ELECTRÓNICO/), { target: { value: 'ana@ejemplo.com' } })
    fireEvent.change(screen.getByLabelText(/^CONTRASEÑA/), { target: { value: '1234' } })
    fireEvent.change(screen.getByLabelText(/CONFIRMAR/), { target: { value: '1234' } })
    fireEvent.change(screen.getByLabelText(/TIPO DE USUARIO/), { target: { value: 'cliente' } })
    fireEvent.change(screen.getByLabelText(/REGIÓN/), { target: { value: 'Valparaíso' } })
    fireEvent.change(screen.getByLabelText(/COMUNA/), { target: { value: 'vina' } })
    fireEvent.change(screen.getByLabelText(/DIRECCIÓN/), { target: { value: 'Calle Falsa 123' } })

    fireEvent.click(screen.getByText('CREAR CUENTA'))

    expect(localStorage.getItem('nombreUsuario')).toBe('Ana')
    expect(localStorage.getItem('rolUsuario')).toBe('cliente')
  })

})
