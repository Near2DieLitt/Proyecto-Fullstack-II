// Arreglo de 9 productos (3 guitarras, 3 bajos, 3 baterías)
let productos = [
    { 
        id: 1,
        marca: "FENDER", 
        nombre: "Stratocaster Player", 
        precio: 649990, 
        descripcion: "Guitarra eléctrica clásica, sonido brillante y versátil.", 
        imagen: "https://static.sonovente.com/img/library/zoom/61/450/61805_12.jpg" 
    },
    { 
        id: 2,
        marca: "YAMAHA",
        nombre: "F310 Acústica",
        precio: 129990,
        descripcion: "Guitarra acústica ideal para principiantes. Excelente resonancia.",
        imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 3,
        marca: "GIBSON",
        nombre: "Les Paul Standard",
        precio: 1899900,
        descripcion: "Cuerpo de caoba y sonido potente. El icono del rock.",
        imagen: "https://guitarsonmain.com/cdn/shop/files/epiphone-les-paul-standard-60s-figured-iced-tea-burst-w-gigbag-1218883078_2048x.jpg?v=1769862127" 
    },
    { 
        id: 4,
        marca: "FENDER",
        nombre: "Jazz Bass Player",
        precio: 599990,
        descripcion: "Bajo de 4 cuerdas con tono definido y cuello cómodo.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQ-XZG1aPbq9XfgkyYAgc4_lDqo_xbRVU8TnUU-7bSflNue_Qj3lvcYE&s=10" 
    },
    { 
        id: 5, 
        marca: "IBANEZ", 
        nombre: "SR300E", 
        precio: 299990, 
        descripcion: "Bajo moderno, ultraligero y con ecualizador activo.", 
        imagen: "https://dojiw2m9tvv09.cloudfront.net/69504/product/X_01c500a16a5afded9b450f5e020121388d19b4d1444352.jpg?52&t=1787607877" 
    },
    { 
        id: 6, 
        marca: "FENDER", 
        nombre: "Precision Bass", 
        precio: 549990, 
        descripcion: "El estándar de la industria. Sonido profundo y clásico.", 
        imagen: "https://dojiw2m9tvv09.cloudfront.net/69504/product/X_01d0f6cb0821e4fe98341c1e7fd6f50d5756d336b27641.jpg?52&t=1787542570" 
    },
    { 
        id: 7, 
        marca: "PEARL", 
        nombre: "Export EXX725S", 
        precio: 899990, 
        descripcion: "Batería acústica completa. Herrajes de alta resistencia.", 
        imagen: "https://www.altomusic.com/cdn/shop/files/EXX725SC708_0_1.jpg?v=1692033388&width=1946" 
    },
    { 
        id: 8, 
        marca: "ROLAND", 
        nombre: "TD-17KVX Electrónica", 
        precio: 1299900, 
        descripcion: "Batería electrónica profesional con parches de malla.", 
        imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 9, 
        marca: "ALESIS", 
        nombre: "Nitro Mesh Kit", 
        precio: 399990, 
        descripcion: "Batería electrónica ideal para practicar en casa en silencio.", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-M8opmh0Y80zfFD7vrnDUFNpE9OI8p9KecCQjuhVCggjPqv0Yw_elfit&s=10" 
    }
];

// Buscamos el contenedor del HTML
let lista = document.getElementById("listaProductos");

// Recorremos el arreglo e inyectamos las tarjetas usando tu diseño
for (let i = 0; i < productos.length; i++) {
    lista.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="product-card">
                <div class="product-img-wrapper bg-white border">
                    <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                    <button class="btn btn-dark w-100 rounded-0 add-to-cart-btn" onclick="verDetalle(${productos[i].id})">
                        VER DETALLE
                    </button>
                </div>
                <div class="mt-3 text-center">
                    <p class="brand-text">${productos[i].marca}</p>
                    <h3 class="product-title">${productos[i].nombre}</h3>
                    <p class="product-price">$${productos[i].precio}</p>
                </div>
            </div>
        </div>
    `;
}

// Función para guardar en localStorage y redirigir
function verDetalle(id) {
    let productoSeleccionado;
    
    // Buscamos el producto exacto por su ID
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            productoSeleccionado = productos[i];
        }
    }

    // Guardamos como texto (String) en el navegador
    localStorage.setItem("producto", JSON.stringify(productoSeleccionado));

    // Redirigimos a la página de detalle
    window.location.href = "detalle.html";
}