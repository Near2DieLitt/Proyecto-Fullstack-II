function registrar() {
    // 1. Declaro todas las variables capturando los IDs del HTML
    let run = document.getElementById("Run").value;
    let nombre = document.getElementById("Nombre").value;
    let apellidos = document.getElementById("Apellidos").value;
    let correo = document.getElementById("CorreoReg").value;
    let clave = document.getElementById("ClaveReg").value;
    let claveConf = document.getElementById("ClaveConf").value;
    let fechaNac = document.getElementById("FechaNac").value;
    let tipoUsuario = document.getElementById("TipoUsuario").value;
    let region = document.getElementById("Region").value;
    let comuna = document.getElementById("Comuna").value;
    let direccion = document.getElementById("Direccion").value;

    // 2. Validar campos vacíos
    if (run === "" || nombre === "" || apellidos === "" || correo === "" || 
        clave === "" || claveConf === "" || fechaNac === "" || 
        tipoUsuario === "" || region === "" || comuna === "" || direccion === "") {
        alert("Debe completar todos los campos obligatorios.");
        return;
    }

    // 3. Validar formato de correo
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
    }

    // 4. Validar largo de clave
    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    // 5. Validar que las contraseñas coincidan
    if (clave !== claveConf) {
        alert("Las contraseñas no coinciden. Intente nuevamente.");
        return;
    }

    // 6. Si pasa todas las validaciones (Éxito)
    alert("¡Cuenta creada con éxito, " + nombre + "!");
    
    // Redirigir al inicio de sesión
    window.location.href = "inicio-sesion.html";
}


/* ========================================================
   CÓDIGO EXTRA: Hace funcionar los contadores de caracteres
   ======================================================== */
document.addEventListener("DOMContentLoaded", function() {
    // Lista de inputs que tienen contador y su límite máximo
    const inputsConContador = [
        { id: "Nombre", max: 50 },
        { id: "Apellidos", max: 100 },
        { id: "Direccion", max: 300 }
    ];

    inputsConContador.forEach(item => {
        let input = document.getElementById(item.id);
        
        // Si el input existe en la página, le agregamos el evento
        if (input) {
            // Captura el <span> que está justo después del input
            let contador = input.nextElementSibling; 
            
            // Cada vez que se escribe, actualiza el número
            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});