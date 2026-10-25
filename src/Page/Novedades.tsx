import { Link } from "react-router-dom"
import Insignia from "../components/Atoms/Insignia"
import { articulos } from "../components/ts/datos"
import TarjetaArticulo from "../components/Molecule/TarjetaArticulo"

function Novedades(){
    const [destacado, ...otros] =articulos

    return(
        <main className="blog-container">
            <div className="blog-header">
                <span className="blog-kicker">CONSEJOS Y GUÍAS</span>
                <h1 className="blog-main-title">Novedades</h1>
            </div>

            <hr className="blog-divider" />


      <div className="featured-article">
        <div className="featured-img-container">
          <img src={destacado.imagen} alt={destacado.alt} />
        </div>
        <div className="featured-content">
          <div className="article-meta">
            <Insignia clase="badge-outline">{destacado.categoria}</Insignia>
            <span>{destacado.fecha}</span>
          </div>
          <h2 className="featured-title">{destacado.titulo}</h2>
          <p className="article-excerpt">{destacado.extracto}</p>
          <Link to={`/novedades/${destacado.id}`} className="read-more-link">
            LEER ARTÍCULO →
          </Link>
        </div>
      </div>

      <hr className="blog-divider" />

      <div className="more-articles-section">
        <h2 className="section-title">Más artículos</h2>
        <div className="articles-grid">
          {otros.map((a) => (
            <TarjetaArticulo key={a.id} articulo={a} />
          ))}
        </div>
      </div>
    </main>
  )
}


export default Novedades