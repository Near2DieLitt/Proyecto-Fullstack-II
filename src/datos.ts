export interface Producto {
  id: string
  marca: string
  nombre: string
  precio: number
  descripcion: string
  categoria: string
  stock: number
  stockCritico: number
  imagen: string
}

export interface ItemCarrito {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidad: number
}

export interface Sesion {
  nombre: string
  rol: 'admin' | 'cliente'
}

export interface Parrafo {
  titulo?: string
  enLinea?: boolean
  texto: string
}

export interface Articulo {
  id: string
  categoria: string
  fecha: string
  titulo: string
  extracto: string
  imagen: string
  banner: string
  alt: string
  parrafos: Parrafo[]
}

export const formatearPrecio = (valor: number) =>
  '$' + new Intl.NumberFormat('es-CL').format(valor)

export const productosBase: Producto[] = [
  {
    id: "GA001",
    marca: "Yamaha",
    nombre: "Guitarra Acústica Folk",
    precio: 129990,
    descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
    categoria: "Guitarras Acústicas",
    stock: 8,
    stockCritico: 2,
    imagen: "https://i5.walmartimages.cl/asr/a1774d9f-e686-4dec-b03b-5d30e6736a1f.33ddf2d8b210f44efdbf39ea93665da8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
  },
  {
    id: "GA002",
    marca: "Fender",
    nombre: "Guitarra Acústica Dreadnought",
    precio: 189990,
    descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.",
    categoria: "Guitarras Acústicas",
    stock: 5,
    stockCritico: 2,
    imagen: "https://www.fender.cl/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/g/a/ga089_0971210532v4.jpg",
  },
  {
    id: "GA003",
    marca: "Yamaha",
    nombre: "Guitarra Acústica Clásica 4/4",
    precio: 89990,
    descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco.",
    categoria: "Guitarras Acústicas",
    stock: 10,
    stockCritico: 2,
    imagen: "https://r2.gear4music.com/media/101/1018345/600/preview.jpg",
  },
  {
    id: "GA004",
    marca: "Takamine",
    nombre: "Guitarra Electroacústica",
    precio: 349990,
    descripcion: "Pickup integrado, afinador incorporado.",
    categoria: "Guitarras Acústicas",
    stock: 3,
    stockCritico: 2,
    imagen: "https://rdmusico.cl/cdn/shop/files/205524-1200-auto.webp?v=1777046763",
  },
  {
    id: "GA005",
    marca: "Yamaha",
    nombre: "Guitarra 3/4 Niños",
    precio: 79990,
    descripcion: "Tamaño reducido para niños de 6 a 10 años.",
    categoria: "Guitarras Acústicas",
    stock: 6,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWgPXuTsBwskU-qvmJ9uX1rdPua27LXhAYFm4NPGlIA&s=10",
  },
  {
    id: "GE001",
    marca: "Squier",
    nombre: "Guitarra Eléctrica Stratocaster",
    precio: 249990,
    descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS.",
    categoria: "Guitarras Eléctricas",
    stock: 5,
    stockCritico: 2,
    imagen: "https://audiomusicacl.vtexassets.com/arquivos/ids/191443/1-guitarra-electrica-fender-squier-sonic-stratocaster-hss-tahitian-coral-1113313.jpg?v=638525238954070000",
  },
  {
    id: "GE002",
    marca: "Epiphone",
    nombre: "Guitarra Eléctrica Les Paul",
    precio: 329990,
    descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker.",
    categoria: "Guitarras Eléctricas",
    stock: 4,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTubsjf8qokkMzVFzrqkJl2E3lD-wSvD_5fL43yHjBHg&s=10",
  },
  {
    id: "GE003",
    marca: "Epiphone",
    nombre: "Guitarra Eléctrica SG",
    precio: 319990,
    descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers.",
    categoria: "Guitarras Eléctricas",
    stock: 3,
    stockCritico: 2,
    imagen: "https://musicworks.cl/wp-content/uploads/2025/11/2-15-600x720-1.jpg",
  },
  {
    id: "GE004",
    marca: "Squier",
    nombre: "Guitarra Eléctrica Telecaster",
    precio: 239990,
    descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single.",
    categoria: "Guitarras Eléctricas",
    stock: 4,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_731411-CBT91855368498_092025-O.webp",
  },
  {
    id: "GE005",
    marca: "Epiphone",
    nombre: "Guitarra Eléctrica Semi-hollow",
    precio: 549990,
    descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues.",
    categoria: "Guitarras Eléctricas",
    stock: 2,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-S_mZor8L6gi2F1fTGfujgUY34HiLV3f20zzeSjPr2A&s=10",
  },
  {
    id: "BA001",
    marca: "Squier",
    nombre: "Bajo Eléctrico 4 Cuerdas",
    precio: 299990,
    descripcion: "Pickup PJ, cuerpo álamo, mástil arce.",
    categoria: "Bajos Eléctricos",
    stock: 5,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCzMd4uq75RU3iMZmVeILQai3fibbYBnHfjjaQKPIABXVafzTTq9rf-aV&s=10",
  },
  {
    id: "BA002",
    marca: "Fender",
    nombre: "Bajo Eléctrico Jazz Bass",
    precio: 699990,
    descripcion: "Alder body, 2 Alnico V Jazz single-coil.",
    categoria: "Bajos Eléctricos",
    stock: 2,
    stockCritico: 2,
    imagen: "https://www.picclickimg.com/a8QAAeSwKRRqCHhU/Bajo-el%C3%A9ctrico-Fender-Japan-JAZZ-BASS-JB-62-01.webp",
  },
  {
    id: "BA003",
    marca: "Yamaha",
    nombre: "Bajo Acústico 4 Cuerdas",
    precio: 429990,
    descripcion: "Electroacústico, afinador incorporado.",
    categoria: "Bajos Eléctricos",
    stock: 2,
    stockCritico: 2,
    imagen: "https://eljuri.store/16284-medium_default/bajo-electro-acustico-stlb-232ceq-4.jpg",
  },
  {
    id: "BT001",
    marca: "Pearl",
    nombre: "Batería Acústica 5 piezas",
    precio: 599990,
    descripcion: "Incluye stands, platillos y pedal de bombo.",
    categoria: "Baterías",
    stock: 2,
    stockCritico: 2,
    imagen: "https://biomusic.cl/wp-content/uploads/2022/11/Pearl-C703AB.jpeg",
  },
  {
    id: "BT002",
    marca: "Roland",
    nombre: "Batería Electrónica 8 pads",
    precio: 799990,
    descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat.",
    categoria: "Baterías",
    stock: 2,
    stockCritico: 2,
    imagen: "https://musicbox.com.co/wp-content/uploads/2022/06/6033467-1-768x743.jpg",
  },
  {
    id: "BT003",
    marca: "Pearl",
    nombre: "Caja Snare 14\"",
    precio: 89990,
    descripcion: "Acero, 14x5\", 10 tensores.",
    categoria: "Baterías",
    stock: 4,
    stockCritico: 2,
    imagen: "https://latinmusic.pe/wp-content/uploads/Pearl-EXX725SPNC.jpg",
  },
  {
    id: "BT004",
    marca: "Zildjian",
    nombre: "Platillo Hi-Hat 14\"",
    precio: 149990,
    descripcion: "Latón B20, sonido brillante y claro.",
    categoria: "Baterías",
    stock: 3,
    stockCritico: 2,
    imagen: "https://static.sonovente.com/img/library/zoom/64/450/64508_1.jpg",
  },
  {
    id: "BT005",
    marca: "Zildjian",
    nombre: "Platillo Crash 16\"",
    precio: 129990,
    descripcion: "Latón B20, ataque rápido.",
    categoria: "Baterías",
    stock: 3,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_Q_NP_843273-MLU72999116028_112023-O.webp",
  },
  {
    id: "TC001",
    marca: "Yamaha",
    nombre: "Teclado Digital 61 teclas",
    precio: 249990,
    descripcion: "61 teclas sensibles al tacto, 622 voces.",
    categoria: "Teclados y Pianos",
    stock: 4,
    stockCritico: 2,
    imagen: "https://es.yamaha.com/es/files/PSR_E463_tcm121-1687045.jpg?impolicy=resize&imwid=735&imhei=735",
  },
  {
    id: "TC002",
    marca: "Yamaha",
    nombre: "Piano Digital 88 teclas",
    precio: 499990,
    descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido.",
    categoria: "Teclados y Pianos",
    stock: 2,
    stockCritico: 2,
    imagen: "https://m.media-amazon.com/images/I/71ZOoJTDLRL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "TC003",
    marca: "Arturia",
    nombre: "Sintetizador 49 teclas",
    precio: 129990,
    descripcion: "MIDI controller, 49 mini teclas.",
    categoria: "Teclados y Pianos",
    stock: 5,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_846412-MLM92391989243_092025-P.webp",
  },
  {
    id: "TC004",
    marca: "M-Audio",
    nombre: "Teclado MIDI 88 teclas",
    precio: 399990,
    descripcion: "88 teclas martillo, sin sonidos propios.",
    categoria: "Teclados y Pianos",
    stock: 2,
    stockCritico: 2,
    imagen: "https://www.audioproperu.com/wp-content/uploads/2021/03/Arturia-KeyLab-88-MkII.jpg",
  },
  {
    id: "AM001",
    marca: "Fender",
    nombre: "Amplificador Guitarra 15W",
    precio: 99990,
    descripcion: "15W, distorsión incorporada, entrada auxiliar.",
    categoria: "Amplificadores",
    stock: 5,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShXs2Z2JVgKY0KZ4uD-tkg5umbrGX4hGBa6_qTxgZTbBLORUZ9udKiZJI&s=10",
  },
  {
    id: "AM002",
    marca: "Marshall",
    nombre: "Amplificador Guitarra 40W",
    precio: 299990,
    descripcion: "40W, 4 canales, efectos digitales integrados.",
    categoria: "Amplificadores",
    stock: 3,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_917893-MLM92124184646_092025-C.jpg",
  },
  {
    id: "AM003",
    marca: "Hartke",
    nombre: "Amplificador Bajo 100W",
    precio: 449990,
    descripcion: "100W, tweeter integrado, ecualizador de 4 bandas.",
    categoria: "Amplificadores",
    stock: 2,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStCohH-KVMFaEFZTPbJoJoUC_zX23pf9sCPaSgdV4U9hcHqepKgNT6fc&s=10",
  },
  {
    id: "AM004",
    marca: "Fishman",
    nombre: "Amplificador Acústico 40W",
    precio: 499990,
    descripcion: "60W, 2 canales, reverb y chorus incorporados.",
    categoria: "Amplificadores",
    stock: 2,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_770191-MCO108018204231_032026-O.webp",
  },
  {
    id: "MI001",
    marca: "Shure",
    nombre: "Micrófono Dinámico Cardioide",
    precio: 149990,
    descripcion: "Estándar industria para voz en vivo.",
    categoria: "Micrófonos",
    stock: 8,
    stockCritico: 2,
    imagen: "https://www.blupointmusic.cl/wp-content/uploads/2026/04/Shure-MV7X-Microfono-Dinamico-3.webp",
  },
  {
    id: "MI002",
    marca: "Shure",
    nombre: "Micrófono Dinámico Instrumento",
    precio: 139990,
    descripcion: "Ideal para captura de instrumentos y amplificadores.",
    categoria: "Micrófonos",
    stock: 6,
    stockCritico: 2,
    imagen: "https://www.tiendavisionbroadcast.co/wp-content/uploads/2022/10/shure-super-55.webp",
  },
  {
    id: "MI003",
    marca: "Audio-Tech.",
    nombre: "Micrófono Condensador",
    precio: 199990,
    descripcion: "Cardioide, XLR, ideal para grabación en estudio.",
    categoria: "Micrófonos",
    stock: 4,
    stockCritico: 2,
    imagen: "https://m.media-amazon.com/images/I/61VSkBVGMDL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "MI004",
    marca: "Blue",
    nombre: "Micrófono USB de Condensador",
    precio: 299990,
    descripcion: "USB, 4 patrones polares, ideal para streaming y podcast.",
    categoria: "Micrófonos",
    stock: 5,
    stockCritico: 2,
    imagen: "https://m.media-amazon.com/images/I/71upyux89ZL.jpg",
  },
  {
    id: "PE001",
    marca: "Boss",
    nombre: "Pedal Distorsión",
    precio: 79990,
    descripcion: "Clásico pedal de distorsión, 3 controles.",
    categoria: "Pedales de Efectos",
    stock: 7,
    stockCritico: 2,
    imagen: "https://f.fcdn.app/imgs/5d8f5e/www.palaciodelamusica.com.uy/pmusuy/1f2e/original/catalogo/DS1-DS1_1/1920-1200/pedal-de-efectos-boss-ds1-distortion-pedal-de-efectos-boss-ds1-distortion.jpg",
  },
  {
    id: "PE002",
    marca: "Boss",
    nombre: "Pedal Reverb",
    precio: 179990,
    descripcion: "8 modos de reverb, control de shimmer.",
    categoria: "Pedales de Efectos",
    stock: 4,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyxSiiu55bDT6eDUehFaU_7gXlAiPFF3oFCbeo6kjQTaLjiiCe6qs1fjJ&s=10",
  },
  {
    id: "PE003",
    marca: "Boss",
    nombre: "Pedal Multi-efectos",
    precio: 349990,
    descripcion: "Diseño tipo pedalboard, 8 efectos simultáneos.",
    categoria: "Pedales de Efectos",
    stock: 2,
    stockCritico: 2,
    imagen: "https://r2.gear4music.com/media/14/142394/600/preview.jpg",
  },
  {
    id: "PE004",
    marca: "Boss",
    nombre: "Pedal Tuner Cromático",
    precio: 89990,
    descripcion: "Afinador cromático, indicador de tono.",
    categoria: "Pedales de Efectos",
    stock: 8,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJdTLQ3LUXcNg6YbsqwiKipq3VHFvO7AevNq1HGrS-6OMayu98CRcCE483&s=10",
  },
  {
    id: "PE005",
    marca: "MXR",
    nombre: "Pedal Delay",
    precio: 179990,
    descripcion: "Delay analógico cálido, tiempo 600ms.",
    categoria: "Pedales de Efectos",
    stock: 4,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_667731-MLA107910475211_032026-O.webp",
  },
  {
    id: "PE006",
    marca: "Ibanez",
    nombre: "Pedal Overdrive",
    precio: 99990,
    descripcion: "Tube Screamer clásico, sonido suave y orgánico.",
    categoria: "Pedales de Efectos",
    stock: 6,
    stockCritico: 2,
    imagen: "https://www.blupointmusic.cl/wp-content/uploads/2023/06/Ibanez-TS9DX-Turbo-Tube-Screamer-1.jpg",
  },
  {
    id: "AC001",
    marca: "Ernie Ball",
    nombre: "Cuerdas Guitarra Eléctrica 09-42",
    precio: 8990,
    descripcion: "Juego 6 cuerdas, calibre ligero.",
    categoria: "Accesorios",
    stock: 25,
    stockCritico: 2,
    imagen: "https://rockbox.es/40287-home_default/ernie-ball-eb2006-earthwood-bronze-extra-light-2006-1050.jpg",
  },
  {
    id: "AC002",
    marca: "Ernie Ball",
    nombre: "Cuerdas Guitarra Acústica 12-53",
    precio: 10990,
    descripcion: "Bronce fósforo, sonido cálido.",
    categoria: "Accesorios",
    stock: 20,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_814462-MLA100062300021_122025-P.webp",
  },
  {
    id: "AC003",
    marca: "Ernie Ball",
    nombre: "Cuerdas Bajo 45-105",
    precio: 14990,
    descripcion: "Cuerdas de níquel enrollado, set 4 cuerdas.",
    categoria: "Accesorios",
    stock: 12,
    stockCritico: 2,
    imagen: "https://f.fcdn.app/imgs/7c3fc6/www.palaciodelamusica.com.uy/pmusuy/95a0/original/catalogo/P02802-P02802_1/460x460/encordado-bajo-ernie-ball-bass-flat-group-i-055-encordado-bajo-ernie-ball-bass-flat-group-i-055.jpg",
  },
  {
    id: "AC004",
    marca: "Fender",
    nombre: "Púas de Guitarra x10 (0.73mm)",
    precio: 3990,
    descripcion: "Celulosa, grosor medio.",
    categoria: "Accesorios",
    stock: 50,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_664252-MLA100769878270_122025-O.webp",
  },
  {
    id: "AC005",
    marca: "Dunlop",
    nombre: "Capotraste Guitarra",
    precio: 12990,
    descripcion: "Capotraste de resorte, compatible 6 cuerdas.",
    categoria: "Accesorios",
    stock: 15,
    stockCritico: 2,
    imagen: "https://chilimusic.cl/wp-content/uploads/2026/03/D_776010-MLC41573888669_042020-F.jpg",
  },
  {
    id: "AC006",
    marca: "Snark",
    nombre: "Afinador de Clip",
    precio: 8990,
    descripcion: "Afinador cromático de clip, pantalla giratoria.",
    categoria: "Accesorios",
    stock: 20,
    stockCritico: 2,
    imagen: "https://r2.gear4music.com/media/27/273063/600/preview_1.jpg",
  },
  {
    id: "AC007",
    marca: "Monster",
    nombre: "Cable Instrumento 3m",
    precio: 12990,
    descripcion: "Cable trenzado, conectores dorados, 3 metros.",
    categoria: "Accesorios",
    stock: 15,
    stockCritico: 2,
    imagen: "https://aymaraperu.com.pe/wp-content/uploads/2024/02/ERNIE-BALL-6415-CABLE-INSTRUMENTO-3M-600x600.webp",
  },
  {
    id: "AC008",
    marca: "Monster",
    nombre: "Cable Instrumento 6m",
    precio: 17990,
    descripcion: "Cable trenzado, conectores dorados, 6 metros.",
    categoria: "Accesorios",
    stock: 10,
    stockCritico: 2,
    imagen: "https://cdnx.jumpseller.com/musicchile/image/57527546/thumb/960/960?1755733429",
  },
  {
    id: "AC009",
    marca: "Hercules",
    nombre: "Soporte Guitarra de Piso",
    precio: 22990,
    descripcion: "Soporte plegable con enganche automático.",
    categoria: "Accesorios",
    stock: 12,
    stockCritico: 2,
    imagen: "https://media.audiomusica.com/DATA/imagenes/Hercules-GS414B-PLUS.jpg",
  },
  {
    id: "AC010",
    marca: "Hercules",
    nombre: "Soporte Guitarra de Pared",
    precio: 18990,
    descripcion: "Montaje a pared, enganche automático.",
    categoria: "Accesorios",
    stock: 10,
    stockCritico: 2,
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_832859-MLA107816777649_022026-P.webp",
  },
  {
    id: "ES001",
    marca: "Focusrite",
    nombre: "Interfaz de Audio 2x2 USB",
    precio: 149990,
    descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.",
    categoria: "Estudio y Grabación",
    stock: 4,
    stockCritico: 2,
    imagen: "https://www.altec.pe/6210-large_default/focusrite-scarlett-solo-studio-3gen-paquete-de-grabacion-con-interfaz-de-audio-2x2-usb.jpg",
  },
  {
    id: "ES002",
    marca: "Audio-Tech.",
    nombre: "Auriculares de Estudio",
    precio: 79990,
    descripcion: "Circumaurales, respuesta 15Hz-20kHz.",
    categoria: "Estudio y Grabación",
    stock: 6,
    stockCritico: 2,
    imagen: "https://www.audioproperu.com/wp-content/uploads/2020/05/Audio-Technica-ATH-M50x-Audifonos-Cerrados-para-Monitoreo-de-Estudio-03.jpg",
  },
  {
    id: "ES003",
    marca: "Audio-Tech.",
    nombre: "Auriculares de Estudio Pro",
    precio: 219990,
    descripcion: "Referencia de industria, sonido neutro y detallado.",
    categoria: "Estudio y Grabación",
    stock: 4,
    stockCritico: 2,
    imagen: "https://www.audioproperu.com/wp-content/uploads/2021/01/Audio-Technica-ATH-M50xPB.jpg",
  },
  {
    id: "ES004",
    marca: "Yamaha",
    nombre: "Monitor de Estudio 5\"",
    precio: 349990,
    descripcion: "Altavoz activo, respuesta plana, ideal mezcla.",
    categoria: "Estudio y Grabación",
    stock: 2,
    stockCritico: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNICQyuVLejzqDsMNbiW4mMOZVOTs03QyILDShlWfaNBL_nmXRFUfuA7R&s=10",
  },
  {
    id: "ES005",
    marca: "Sennheiser",
    nombre: "Pop Filter para Micrófono",
    precio: 14990,
    descripcion: "Doble malla, brazo flexible con clip.",
    categoria: "Estudio y Grabación",
    stock: 8,
    stockCritico: 2,
    imagen: "https://sonotecperu.com/wp-content/uploads/2021/01/Sennheiser-E-614-2-600x600.jpg",
  },
]

// En los textos, *palabra* se muestra en cursiva y \n es un salto de línea.
export const articulos: Articulo[] = [
  {
    id: 'guitarra',
    categoria: 'GUÍAS',
    fecha: '2024-11-10',
    titulo: 'Cómo elegir tu primera guitarra eléctrica',
    extracto:
      'Elegir la primera guitarra eléctrica puede ser abrumador. Te guiamos por los factores clave: cuerpo, pastillas, mástil y presupuesto para que tomes la mejor decisión.',
    imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200',
    alt: 'Tocando guitarra',
    parrafos: [
      {
        texto:
          'Elegir la primera guitarra eléctrica puede ser abrumador. Entras a una tienda (o a nuestro catálogo) y te encuentras con decenas de formas, colores y configuraciones distintas. Para tomar la mejor decisión, debes enfocarte en cuatro factores clave: el cuerpo, las pastillas, el mástil y tu presupuesto.',
      },
      {
        titulo: '1. La forma del cuerpo (Comodidad vs. Estética)',
        texto:
          'Las dos formas más icónicas son la *Stratocaster* y la *Les Paul*. La Stratocaster es más ligera y tiene rebajes que se adaptan al cuerpo, haciéndola muy cómoda para tocar sentado. La Les Paul suele ser más pesada y robusta, pero ofrece un sustain (duración de la nota) increíble. Prueba ambas para ver cuál se siente mejor en tus manos.',
      },
      {
        titulo: '2. Las pastillas (El motor del sonido)',
        texto:
          'Las pastillas *Single-Coil* (bobina simple) te darán un sonido brillante y cristalino, ideal para funk, pop, indie o blues clásico (piensa en John Frusciante o Jimi Hendrix). Las pastillas *Humbucker* (doble bobina) tienen un sonido más grueso, cálido y sin ruido de fondo, perfectas para rock pesado, metal o jazz (piensa en Slash).',
      },
      {
        titulo: '3. El mástil (Tu zona de trabajo)',
        texto:
          'Si tienes manos pequeñas, busca perfiles de mástil en forma de "C" moderna, que son más delgados y rápidos. Un mástil grueso (forma de "U" o "V") llena más la mano y es excelente para acordes, pero puede cansar a un principiante. ¡Asegúrate de llegar cómodamente a todos los trastes!',
      },
      {
        titulo: '4. Presupuesto (No gastes de más)',
        texto:
          'Para empezar, no necesitas invertir en un instrumento de gama alta. Marcas como Squier (respaldada por Fender) o Epiphone (respaldada por Gibson) ofrecen instrumentos de excelente calidad para principiantes por una fracción del precio. Recuerda que también deberás dejar presupuesto para el amplificador y el cable.',
      },
      {
        texto:
          'Si aún tienes dudas, nuestro equipo en Sonido Vivo está listo para asesorarte. ¡Lo importante es elegir una guitarra que te inspire a practicar todos los días!',
      },
    ],
  },
  {
    id: 'amplificadores',
    categoria: 'GUÍAS',
    fecha: '2024-11-18',
    titulo: 'Los mejores amplificadores para tocar en casa',
    extracto:
      'No necesitas un stack de 100W para sonar bien en casa. Descubre los amplificadores más recomendados para practicar en departamento o pieza sin molestar a los vecinos.',
    imagen: 'https://guitarriff.es/wp-content/uploads/2019/04/alternativas-al-ampli-de-guitarra-guitar-riff-1024x682.jpg',
    banner: 'https://blog.musicopolix.com/wp-content/uploads/2020/06/tumblr_os5ogesrtl1qc3g8bo1_1280.jpg',
    alt: 'Amplificadores',
    parrafos: [
      {
        texto:
          'Uno de los errores más comunes de los músicos principiantes es creer que necesitan un amplificador potente para sonar bien. La realidad es que para tocar en casa, la potencia es lo de menos. Lo que importa es la calidad del tono y la comodidad de uso.',
      },
      {
        titulo: '¿Cuántos watts necesito en casa?',
        enLinea: true,
        texto:
          'Para un dormitorio o estudio en casa, entre 5W y 20W es más que suficiente. A mayor potencia, necesitas subir más el volumen para que el amplificador "cante", y eso puede ser problemático en un departamento.',
      },
      {
        titulo: 'Amplificadores valvulares vs. transistores:',
        enLinea: true,
        texto:
          'Los amplificadores valvulares (tubes) tienen un sonido orgánico y cálido muy apreciado por músicos de rock y blues. El Fender Blues Junior (15W) es un clásico para casa: sonido increíble a volumen moderado. Los transistores son más económicos y consistentes, ideales para empezar.',
      },
      {
        titulo: 'Amplificadores de modelado digital:',
        enLinea: true,
        texto:
          'Si vives en departamento, considera un amplificador de modelado como el Fender Mustang GTX o el Boss Katana. Estos equipos simulan decenas de amplificadores clásicos y tienen salida de auriculares, lo que te permite tocar en silencio a cualquier hora.',
      },
      {
        titulo: 'Nuestra recomendación para cada caso:',
        texto:
          '- Principiante con presupuesto ajustado: Fender Frontman 10G o Blackstar Debut 10E.\n- Intermedio buscando tono valvular: Fender Blues Junior IV.\n- Avanzado que quiere versatilidad: Boss Katana-50 MkII o Line 6 Catalyst 60.',
      },
      {
        texto:
          'Pasa por Sonido Vivo y prueba nuestros amplificadores en sala. Tenemos opciones para todos los presupuestos y estilos musicales.',
      },
    ],
  },
  {
    id: 'cuerdas',
    categoria: 'CONSEJOS',
    fecha: '2024-11-25',
    titulo: 'Guía de cuerdas: ¿qué calibre elegir?',
    extracto:
      'El calibre de las cuerdas afecta directamente el tono, la comodidad y la facilidad de tocar. Aprende a elegir el calibre correcto según tu estilo y nivel.',
    imagen: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600',
    banner: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200',
    alt: 'Concierto de rock',
    parrafos: [
      {
        texto:
          'El calibre de las cuerdas afecta directamente el tono de tu instrumento, la comodidad en tus dedos y la facilidad para ejecutar técnicas como los bends (estirar la cuerda). Si alguna vez has sentido que tu guitarra es "muy dura" de tocar, es probable que estés usando el calibre incorrecto.',
      },
      {
        titulo: 'Calibre .009 - .042 (Super Light)',
        texto:
          'Este es el calibre con el que vienen la mayoría de las guitarras eléctricas de fábrica, especialmente las tipo Stratocaster. Son excelentes para principiantes porque requieren muy poca fuerza para presionar los trastes. Si tocas estilos que exigen mucha agilidad o solos rápidos, las "nueves" son tus mejores amigas.',
      },
      {
        titulo: 'Calibre .010 - .046 (Regular Light)',
        texto:
          'El estándar dorado de la industria, especialmente en guitarras tipo Les Paul (que tienen una escala más corta). Las "dieces" ofrecen un equilibrio perfecto: tienen un poco más de cuerpo y volumen que las .009, pero siguen siendo lo suficientemente cómodas para hacer bends de un tono completo sin destrozarte los dedos.',
      },
      {
        titulo: 'Calibre .011 - .049 (Medium/Heavy)',
        texto:
          'Aquí entramos en territorio de músicos experimentados. Estas cuerdas son más gruesas y duras de tocar, pero la recompensa es un tono gigante y lleno de sustain. Son la opción obligatoria si te gusta tocar en afinaciones bajas (Drop D, Drop C) para estilos como el metal o el hard rock, ya que evitan que la cuerda quede "suelta" o trastee.',
      },
      {
        titulo: '¿Cuándo debes cambiar tus cuerdas?',
        texto:
          'No esperes a que se rompan. Si las cuerdas se ven oxidadas, se sienten ásperas al tacto, o si la guitarra empieza a tener problemas para mantenerse afinada, es momento de un cambio (generalmente cada 2 a 3 meses si tocas regularmente).',
      },
      {
        texto:
          "¡Pasa por nuestra tienda! Tenemos sets Ernie Ball, D'Addario y Elixir en todos los calibres para que encuentres tu sonido ideal.",
      },
    ],
  },
]

export interface Pedido {
  id: string
  fecha: string
  /** 1 = en preparación, 2 = despachado, 3 = entregado */
  etapa: 1 | 2 | 3
  total: number
  producto: { nombre: string; marca: string; imagen: string; cantidad: number; precio: number }
  seguimiento?: string
}

export const pedidos: Pedido[] = [
  {
    id: 'SV-2024-001',
    fecha: '2024-11-15',
    etapa: 2,
    total: 649990,
    producto: {
      nombre: 'Stratocaster Player Series',
      marca: 'Fender',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg4zRggiZDeMqzhtNfOIxjjelNAuzFMJHosGvD4s0IOOuLTn9m2-Zh4gsI&s=10',
      cantidad: 1,
      precio: 649990,
    },
    seguimiento: 'SK-845921034',
  },
  {
    id: 'SV-2024-002',
    fecha: '2024-11-10',
    etapa: 3,
    total: 274970,
    producto: {
      nombre: 'Teclado MIDI Akai MPK Mini',
      marca: 'Akai',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThA2dj0VjUqs2M4tHGMGBymcJosDP4p4wrvBcoPgKj-Q&s=10',
      cantidad: 1,
      precio: 274970,
    },
  },
]
