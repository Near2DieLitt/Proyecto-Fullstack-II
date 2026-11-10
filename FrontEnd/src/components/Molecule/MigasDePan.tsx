import { Link } from 'react-router-dom'

export interface Miga {
  texto: string
  a?: string
}

interface Props {
  migas: Miga[]
}

function MigasDePan({ migas }: Props) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb fs-7">
        {migas.map((miga, i) =>
          miga.a ? (
            <li key={miga.texto} className="breadcrumb-item">
              <Link to={miga.a} className="text-decoration-none text-muted">
                {miga.texto}
              </Link>
            </li>
          ) : (
            <li key={miga.texto} className="breadcrumb-item active text-dark fw-bold" aria-current={i === migas.length - 1 ? 'page' : undefined}>
              {miga.texto}
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}export default MigasDePan
