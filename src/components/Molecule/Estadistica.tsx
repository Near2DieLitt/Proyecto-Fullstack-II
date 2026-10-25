interface Props {
  valor: string
  etiqueta: string
  ultima?: boolean
}

function Estadistica({ valor, etiqueta, ultima = false }: Props) {
  return (
    <div className={`col-6 col-md-3 py-4 ${ultima ? '' : 'border-end-md'}`}>
      <h2 className="playfair-font fw-bold mb-2">{valor}</h2>
      <p className="text-secondary fw-bold fs-8 mb-0">{etiqueta}</p>
    </div>
  )
} export default Estadistica
