function ingresar() {
    // Declarar variables con tus IDs exactos
    let correo = document.getElementById("Correo").value.trim();
    let clave = document.getElementById("Clave").value.trim();

    // Validar campos vacíos
    if (correo === "" || clave === "") {
        alert("Debe completar todos los campos");
        return;
    }

    // Validar formato de correo
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    // Validar largo de clave (adaptado al diseño de 4 a 10)
    if (clave.length < 4 || clave.length > 10) {
        alert("La clave debe tener entre 4 y 10 caracteres");
        return;
    }

    // Validación de Roles / Redirecciones
    if (correo === "admin@sonidovivo.cl" && clave === "admin123") {
        // Redirige al panel de productos del administrador que creaste
        window.location.href = "admin-productos.html";
    } 
    else if (correo === "juan@cliente.cl" && clave === "cli123") {
        localStorage.setItem("nombreUsuario", "Juan");
        window.location.href = "mi-perfil.html";
    } 
    else {
        // Simulación genérica para otros usuarios registrados
        localStorage.setItem("nombreUsuario", "Cliente");
        alert("Correo o clave incorrectos para cuentas de prueba. (Prueba con admin@sonidovivo.cl / admin123)");
    }
}

// Función auxiliar para rellenar datos de prueba automáticamente si lo necesitas
function fillDemo(email, password) {
    document.getElementById('Correo').value = email;
    document.getElementById('Clave').value = password;
}