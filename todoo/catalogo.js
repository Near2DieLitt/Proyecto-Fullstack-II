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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
        imagen: ""
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
//lo deje como comentario en caso de que se tenga q hacer
//function verDetalle(id) {
    //let productoSeleccionado = productos.find(p => p.id === id);
    //localStorage.setItem("producto", JSON.stringify(productoSeleccionado));
    //window.location.href = ""; 
//}