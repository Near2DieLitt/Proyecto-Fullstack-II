import { Fragment } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Boton from '../components/Atoms/boton'
import Insignia from '../components/Atoms/Insignia'
import MigasDePan from '../components/Molecule/MigasDePan'
import { articulos } from '../components/ts/datos'


function formatear(texto: string) {
  return texto.split('\n').map((linea, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {linea.split('*').map((parte, j) => (j % 2 === 1 ? <em key={j}>{parte}</em> : parte))}
    </Fragment>
  ))
}

function Articulo() {
  const { id } = useParams()
  const articulo = articulos.find((a) => a.id === id)

  if (!articulo) return <Navigate to="/novedades" replace />

  return (
    <>
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <MigasDePan migas={[{ texto: 'Inicio', a: '/' }, { texto: 'Novedades', a: '/novedades' }, { texto: articulo.titulo }]} />
        </div>
      </div>

      <main className="article-detail-container">
        <div className="article-meta mb-4">
          <Insignia clase="badge-outline">{articulo.categoria}</Insignia>
          <span>{articulo.fecha}</span>
        </div>

        <h1 className="article-huge-title">{articulo.titulo}</h1>

        <div className="article-banner">
          <img src={articulo.banner} alt={articulo.alt} />
        </div>

        <div className="article-body">
          {articulo.parrafos.map((p, i) => (
            <p key={i}>
              {p.titulo && (
                <>
                  <strong>{p.titulo}</strong>
                  {p.enLinea ? ' ' : <br />}
                </>
              )}
              {formatear(p.texto)}
            </p>
          ))}
        </div>

        <hr className="blog-divider mt-5" />

        <div className="article-footer">
          <Link to="/novedades" className="back-link">
            ← VOLVER A NOVEDADES
          </Link>
          <Boton a="/catalogo" variante="catalogo">
            VER CATÁLOGO
          </Boton>
        </div>
      </main>
    </>
  )
}
export default Articulo