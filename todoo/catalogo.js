//localStorage.removeItem("productosCatalogo");

// 1. Intentamos leer los productos creados en el administrador
let productosMemoria = JSON.parse(localStorage.getItem("productosCatalogo"));

let productosBase = [
    {
        id: "GA001",
        marca: "Yamaha",
        nombre: "Guitarra Acústica Folk",
        precio: 129990,
        descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
        categoria: "Guitarras Acústicas",
        stock: 8,
        stockCritico: 2,
        imagen: "https://i5.walmartimages.cl/asr/a1774d9f-e686-4dec-b03b-5d30e6736a1f.33ddf2d8b210f44efdbf39ea93665da8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff"
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
        imagen: "https://www.fender.cl/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/g/a/ga089_0971210532v4.jpg"
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
        imagen: "https://r2.gear4music.com/media/101/1018345/600/preview.jpg"
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
        imagen: "https://rdmusico.cl/cdn/shop/files/205524-1200-auto.webp?v=1777046763"
    },
    {
        id: "GA005",
        marca: "Yamaha",
        nombre: "Guitarra 3/4 Niños",
        precio : 79990,
        descripcion: "Tamaño reducido para niños de 6 a 10 años.",
        categoria: "Guitarras Acústicas",
        stock: 6,
        stockCritico: 2,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWgPXuTsBwskU-qvmJ9uX1rdPua27LXhAYFm4NPGlIA&s=10"
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
        imagen: "https://audiomusicacl.vtexassets.com/arquivos/ids/191443/1-guitarra-electrica-fender-squier-sonic-stratocaster-hss-tahitian-coral-1113313.jpg?v=638525238954070000"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTubsjf8qokkMzVFzrqkJl2E3lD-wSvD_5fL43yHjBHg&s=10"
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
        imagen: "https://musicworks.cl/wp-content/uploads/2025/11/2-15-600x720-1.jpg"
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_731411-CBT91855368498_092025-O.webp"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-S_mZor8L6gi2F1fTGfujgUY34HiLV3f20zzeSjPr2A&s=10"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCzMd4uq75RU3iMZmVeILQai3fibbYBnHfjjaQKPIABXVafzTTq9rf-aV&s=10"
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
        imagen: "https://www.picclickimg.com/a8QAAeSwKRRqCHhU/Bajo-el%C3%A9ctrico-Fender-Japan-JAZZ-BASS-JB-62-01.webp"
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
        imagen: "https://eljuri.store/16284-medium_default/bajo-electro-acustico-stlb-232ceq-4.jpg"
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
        imagen: "https://biomusic.cl/wp-content/uploads/2022/11/Pearl-C703AB.jpeg"
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
        imagen: "https://musicbox.com.co/wp-content/uploads/2022/06/6033467-1-768x743.jpg"
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
        imagen: "https://latinmusic.pe/wp-content/uploads/Pearl-EXX725SPNC.jpg"
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
        imagen: "https://static.sonovente.com/img/library/zoom/64/450/64508_1.jpg"
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
        imagen: "https://http2.mlstatic.com/D_Q_NP_843273-MLU72999116028_112023-O.webp"
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
        imagen: "https://es.yamaha.com/es/files/PSR_E463_tcm121-1687045.jpg?impolicy=resize&imwid=735&imhei=735"
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
        imagen: "https://m.media-amazon.com/images/I/71ZOoJTDLRL._AC_UF894,1000_QL80_.jpg"
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
        imagen: "https://http2.mlstatic.com/D_Q_NP_2X_846412-MLM92391989243_092025-P.webp"
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
        imagen: "https://www.audioproperu.com/wp-content/uploads/2021/03/Arturia-KeyLab-88-MkII.jpg"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShXs2Z2JVgKY0KZ4uD-tkg5umbrGX4hGBa6_qTxgZTbBLORUZ9udKiZJI&s=10"
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
        imagen: "https://http2.mlstatic.com/D_917893-MLM92124184646_092025-C.jpg"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStCohH-KVMFaEFZTPbJoJoUC_zX23pf9sCPaSgdV4U9hcHqepKgNT6fc&s=10"
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_770191-MCO108018204231_032026-O.webp"
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
        imagen: "https://www.blupointmusic.cl/wp-content/uploads/2026/04/Shure-MV7X-Microfono-Dinamico-3.webp"
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
        imagen: "https://www.tiendavisionbroadcast.co/wp-content/uploads/2022/10/shure-super-55.webp"
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
        imagen: "https://m.media-amazon.com/images/I/61VSkBVGMDL._AC_UF894,1000_QL80_.jpg"
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
        imagen: "https://m.media-amazon.com/images/I/71upyux89ZL.jpg"
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
        imagen: "https://f.fcdn.app/imgs/5d8f5e/www.palaciodelamusica.com.uy/pmusuy/1f2e/original/catalogo/DS1-DS1_1/1920-1200/pedal-de-efectos-boss-ds1-distortion-pedal-de-efectos-boss-ds1-distortion.jpg"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyxSiiu55bDT6eDUehFaU_7gXlAiPFF3oFCbeo6kjQTaLjiiCe6qs1fjJ&s=10"
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
        imagen: "https://r2.gear4music.com/media/14/142394/600/preview.jpg"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJdTLQ3LUXcNg6YbsqwiKipq3VHFvO7AevNq1HGrS-6OMayu98CRcCE483&s=10"
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_667731-MLA107910475211_032026-O.webp"
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
        imagen: "https://www.blupointmusic.cl/wp-content/uploads/2023/06/Ibanez-TS9DX-Turbo-Tube-Screamer-1.jpg"
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
        imagen: "https://rockbox.es/40287-home_default/ernie-ball-eb2006-earthwood-bronze-extra-light-2006-1050.jpg"
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
        imagen: "https://http2.mlstatic.com/D_Q_NP_2X_814462-MLA100062300021_122025-P.webp"
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
        imagen: "https://f.fcdn.app/imgs/7c3fc6/www.palaciodelamusica.com.uy/pmusuy/95a0/original/catalogo/P02802-P02802_1/460x460/encordado-bajo-ernie-ball-bass-flat-group-i-055-encordado-bajo-ernie-ball-bass-flat-group-i-055.jpg"
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_664252-MLA100769878270_122025-O.webp"
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
        imagen: "https://chilimusic.cl/wp-content/uploads/2026/03/D_776010-MLC41573888669_042020-F.jpg"
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
        imagen: "https://r2.gear4music.com/media/27/273063/600/preview_1.jpg"
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
        imagen: "https://aymaraperu.com.pe/wp-content/uploads/2024/02/ERNIE-BALL-6415-CABLE-INSTRUMENTO-3M-600x600.webp"
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
        imagen: "https://cdnx.jumpseller.com/musicchile/image/57527546/thumb/960/960?1755733429"
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
        imagen: "https://media.audiomusica.com/DATA/imagenes/Hercules-GS414B-PLUS.jpg"
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
        imagen: "https://http2.mlstatic.com/D_Q_NP_2X_832859-MLA107816777649_022026-P.webp"
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
        imagen: "https://www.altec.pe/6210-large_default/focusrite-scarlett-solo-studio-3gen-paquete-de-grabacion-con-interfaz-de-audio-2x2-usb.jpg"
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
        imagen: "https://www.audioproperu.com/wp-content/uploads/2020/05/Audio-Technica-ATH-M50x-Audifonos-Cerrados-para-Monitoreo-de-Estudio-03.jpg"
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
        imagen: "https://www.audioproperu.com/wp-content/uploads/2021/01/Audio-Technica-ATH-M50xPB.jpg"
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
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNICQyuVLejzqDsMNbiW4mMOZVOTs03QyILDShlWfaNBL_nmXRFUfuA7R&s=10"
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
        imagen: "https://sonotecperu.com/wp-content/uploads/2021/01/Sennheiser-E-614-2-600x600.jpg"
    }
];

// 3. Cargamos los datos guardados en memoria o inicializamos con la base del Excel
let productos = productosMemoria ? productosMemoria : productosBase;

// Si es la primera vez que entramos, guardamos el arreglo completo en localStorage
if (!productosMemoria) {
    localStorage.setItem("productosCatalogo", JSON.stringify(productosBase));
}

// 4. Inyectamos los productos en el HTML
let lista = document.getElementById("listaProductos");

// Limpiamos la lista por seguridad antes de llenarla
lista.innerHTML = "";

for (let i = 0; i < productos.length; i++) {
    // Le damos formato al precio para que se vea como $129.990 en lugar de $129990
    let precioFormateado = new Intl.NumberFormat('es-CL').format(productos[i].precio);

    lista.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="product-card">
                <div class="product-img-wrapper bg-white border">
                    <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                    <button class="btn btn-dark w-100 rounded-0 add-to-cart-btn" onclick="verDetalle('${productos[i].id}')">
                        VER DETALLE
                    </button>
                </div>
                <div class="mt-3 text-center">
                    <p class="brand-text">${productos[i].marca}</p>
                    <h3 class="product-title">${productos[i].nombre}</h3>
                    <p class="product-price">$${precioFormateado}</p>
                </div>
            </div>
        </div>
    `;
}

// 5. Función para guardar el producto seleccionado y llevar a la vista de detalle pero no se si se vera asi realmente
function verDetalle(id) {
    let productoSeleccionado = productos.find(p => p.id === id);
    localStorage.setItem("producto", JSON.stringify(productoSeleccionado));
    window.location.href = "detalle.html"; 
}