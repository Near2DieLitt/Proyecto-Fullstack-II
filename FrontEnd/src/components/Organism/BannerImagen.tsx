import type { ReactNode } from 'react'

interface Props {
  etiqueta: string
  titulo: ReactNode
  texto: string
  imagen: string
  alt: string
  esPagina?: boolean
  children: ReactNode
}

function BannerImagen({ etiqueta, titulo, texto, imagen, alt, esPagina = false, children }: Props) {
  return (
    <section className="container-fluid px-0 my-5">
      <div className="row g-0 align-items-center bg-custom-banner">
        <div className="col-12 col-lg-5 p-5 text-dark">
          <p className="brand-text mb-2">{etiqueta}</p>
          {esPagina ? (
            <h1 className="display-3 playfair-font mb-4">{titulo}</h1>
          ) : (
            <h2 className="playfair-font display-4 fw-bold mb-3">{titulo}</h2>
          )}
          <p className="text-secondary mb-4">{texto}</p>
          <div className="d-flex gap-3 flex-wrap">{children}</div>
        </div>
        <div className="col-12 col-lg-7">
          <div className="banner-img-container">
            <img src={imagen} alt={alt} className="w-100 h-100 object-fit-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}export default BannerImagen
