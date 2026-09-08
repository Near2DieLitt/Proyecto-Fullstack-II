document.addEventListener('DOMContentLoaded', () => {
    
    let rol = localStorage.getItem("rolUsuario");
    let nombre = localStorage.getItem("nombreUsuario");
    let paginaActual = window.location.pathname.split("/").pop();
    

    if (paginaActual === "admin-productos.html" && rol !== "admin") {
        alert("Acceso denegado. Solo personal autorizado.");
        window.location.href = "inicio-sesion.html";
    }

    if (rol && (paginaActual === "inicio-sesion.html" || paginaActual === "registrarse.html" || paginaActual === "")) {
        let cajaFormulario = document.querySelector('.login');
        if (cajaFormulario) {
            let linkDestino = (rol === "admin") ? "admin-productos.html" : "admin-productos.html";
            cajaFormulario.innerHTML = `
                <h1 id="logo-centro">SONIDO <span>vivo</span></h1>
                <div class="text-center mt-5 mb-5">
                    <i class="fa fa-check-circle text-success mb-3" style="font-size: 48px;"></i>
                    <h3 class="fw-bold mb-3">¡Bienvenido de vuelta, ${nombre}!</h3>
                    <p class="text-muted mb-4">Ya tienes una sesión activa en este dispositivo.</p>
                    <a href="${linkDestino}" class="btn-submit text-decoration-none d-block text-center mb-3">IR A MI PANEL</a>
                    <button onclick="cerrarSesion()" class="btn btn-outline-dark w-100" style="padding: 15px; font-weight: bold; letter-spacing: 1px;">CERRAR SESIÓN</button>
                </div>
            `;
        }
    }

    if (rol) {
        let links = document.querySelectorAll('.custom-nav-link');
        
        links.forEach(link => {

            if (link.innerHTML.includes('INGRESAR')) {
                
                if (rol === "admin") {
                    link.innerHTML = `<i class="fa fa-user-shield me-1"></i> PANEL ADMIN`;
                    link.href = "admin-productos.html";
                } else {
                    link.innerHTML = `<i class="fa fa-user me-1"></i> HOLA, ${nombre.toUpperCase()}`;
                    link.href = "mi-perfil.html";
                }
                

                if (!document.getElementById("btn-salir-global")) {
                    let btnCerrar = document.createElement('a');
                    btnCerrar.href = "#";
                    btnCerrar.id = "btn-salir-global";
                    btnCerrar.className = "custom-nav-link text-decoration-none text-danger ms-3 fw-bold";
                    btnCerrar.innerHTML = `<i class="fa fa-sign-out-alt me-1"></i> SALIR`;
                    
                    btnCerrar.onclick = function(e) {
                        e.preventDefault();
                        cerrarSesion();
                    };
                    

                    link.parentNode.insertBefore(btnCerrar, link.nextSibling);
                }
            }
        });
    }
});


function cerrarSesion() {
    localStorage.removeItem("rolUsuario");
    localStorage.removeItem("nombreUsuario");
    window.location.href = "inicio-sesion.html";
}