import Estadistica from "../Molecule/Estadistica";


interface Props {
  items: { valor: string; etiqueta: string }[]
}

function Estadisticas({ items }: Props) {
  return (
    <section className="container-fluid bg-white py-5 border-bottom">
      <div className="row g-0 text-center">
        {items.map((item, i) => (
          <Estadistica key={item.etiqueta} {...item} ultima={i === items.length - 1} />
        ))}
      </div>
    </section>
  )
} export default Estadisticas
