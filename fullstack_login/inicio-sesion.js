function ingresar() {
    // Declaro variables con tus IDs exactos
    let correo = document.getElementById("Correo").value;
    let clave = document.getElementById("Clave").value;

    // Validar campos vacíos
    if (correo === "" || clave === "" ){
        alert("Debe completar todos los campos");
        return;
    }

    // Validar formato de correo
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    // Validar largo de clave (adaptado al diseño de 4 a 10)
    if(clave.length < 4 || clave.length > 10){
        alert("La clave debe tener entre 4 y 10 caracteres");
        return;
    }

    // Usuario Administrador
    if(correo === "admin@sonidovivo.cl" && clave === "admin123"){
        window.location.href = "admin.html";
    }
    // Usuario Vendedor
    else if(correo === "vendedor@sonidovivo.cl" && clave === "vend123"){
        window.location.href = "vendedor.html";
    }
    // Usuario Cliente
    else if(correo === "juan@cliente.cl" && clave === "cli123"){
        window.location.href = "usuario.html";
    }
    else {
        alert("Correo o clave incorrectos");
    }
}

// Función extra para que funcionen los clics en las cuentas de prueba de abajo
function fillDemo(email, password) {
    document.getElementById('Correo').value = email;
    document.getElementById('Clave').value = password;
}