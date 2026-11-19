//@vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Contacto from '../Page/Contacto'


describe('Contacto', () => {
  it('muestra la información del contacto y valida el formulario', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<Contacto />)

    expect(screen.getByText('ESCRÍBENOS')).toBeTruthy()
    expect(screen.getByText('Contacto')).toBeTruthy()
    expect(screen.getByText('Visítanos o escríbenos')).toBeTruthy()
    expect(screen.getByText('DIRECCIÓN')).toBeTruthy()

    fireEvent.change(screen.getByPlaceholderText('Tu nombre completo'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByPlaceholderText('nombre@ejemplo.com'), { target: { value: 'ana@ejemplo.com' } })
    fireEvent.change(screen.getByPlaceholderText('¿En qué podemos ayudarte?'), { target: { value: 'Quiero consultar por una guitarra.' } })
    fireEvent.click(screen.getByText('ENVIAR MENSAJE'))

    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Ana'))
  })
})