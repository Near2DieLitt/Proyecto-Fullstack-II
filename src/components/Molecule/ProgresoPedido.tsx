const pasos = ['En preparacion', 'Despacho', 'Entregado']

interface Props{
    etapa: 1 | 2 | 3
}

function ProgresoPedido({etapa}: Props){
    const avance = ['progress-0', 'progress-50', 'progress-100'][etapa -1]

  return (
    <div className={`order-progress ${avance}`}>
      {pasos.map((paso, i) => {
        const numero = i + 1
        const estado = numero < etapa || etapa === 3 ? 'completed' : numero === etapa ? 'active' : 'pending'
        return (
          <div key={paso} className={`step ${estado}`}>
            <div className="step-icon">{estado === 'completed' ? '✓' : numero}</div>
            <p>{paso}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProgresoPedido