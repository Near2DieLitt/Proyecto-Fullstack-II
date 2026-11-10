import type { InputHTMLAttributes } from 'react'

function Entrada({ className = '', ...resto }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={className} {...resto} />
}

export default Entrada