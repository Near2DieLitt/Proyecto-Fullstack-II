// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import Boton from '../components/Atoms/boton'


let contenedor: HTMLDivElement
let raiz: ReturnType<typeof createRoot>

afterEach(() => {
	act(() => raiz.unmount())
	contenedor.remove()
})

describe('Boton de catálogo', () => {
	it('al presionarlo abre la página del catálogo', () => {
		Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { configurable: true, value: true })
		contenedor = document.createElement('div')
		document.body.append(contenedor)
		raiz = createRoot(contenedor)

		act(() => {
			raiz.render(
				<MemoryRouter>
					<Boton a="/catalogo">Catálogo</Boton>
					<Routes>
						<Route path="/catalogo" element={<p>Catálogo abierto</p>} />
					</Routes>
				</MemoryRouter>,
			)
		})
		act(() => contenedor.querySelector('a')?.click())
		expect(contenedor.textContent).toContain('Catálogo abierto')
	})
})