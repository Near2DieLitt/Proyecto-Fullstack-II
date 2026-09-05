function registrar() {
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

    if (run === "" || nombre === "" || apellidos === "" || correo === "" || 
        clave === "" || claveConf === "" || fechaNac === "" || 
        tipoUsuario === "" || region === "" || comuna === "" || direccion === "") {
        alert("Debe completar todos los campos obligatorios.");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    if (clave !== claveConf) {
        alert("Las contraseñas no coinciden. Intente nuevamente.");
        return;
    }

    alert("¡Cuenta creada con éxito, " + nombre + "!");
    
    window.location.href = "inicio-sesion.html";
}



document.addEventListener("DOMContentLoaded", function() {
    const inputsConContador = [
        { id: "Nombre", max: 50 },
        { id: "Apellidos", max: 100 },
        { id: "Direccion", max: 300 }
    ];

    inputsConContador.forEach(item => {
        let input = document.getElementById(item.id);
        
        if (input) {
            let contador = input.nextElementSibling; 
            
            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});

// Activar los contadores de caracteres al escribir
document.addEventListener("DOMContentLoaded", function() {
    const inputsConContador = [
        { id: "Nombre", max: 50 },
        { id: "Apellidos", max: 100 },
        { id: "Direccion", max: 300 }
    ];

    inputsConContador.forEach(item => {
        let input = document.getElementById(item.id);
        if (input) {
            let contador = input.nextElementSibling; 
            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});

function registrar() {
    let run = document.getElementById("Run").value;
    let nombre = document.getElementById("Nombre").value;
    let correo = document.getElementById("CorreoReg").value;
    let clave = document.getElementById("ClaveReg").value;
    let claveConf = document.getElementById("ClaveConf").value;
    let region = document.getElementById("Region").value;

    if (run === "" || nombre === "" || correo === "" || clave === "" || region === "") {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return;
    }

    if (clave !== claveConf) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    alert("¡Cuenta creada exitosamente para " + nombre + "!");
    window.location.href = "inicio-sesion.html";
}

function registrar() {
    let run = document.getElementById("Run").value;
    let nombre = document.getElementById("Nombre").value; // El nombre que el usuario escribió
    let correo = document.getElementById("CorreoReg").value;
    let clave = document.getElementById("ClaveReg").value;
    let claveConf = document.getElementById("ClaveConf").value;
    let region = document.getElementById("Region").value;

    if (run === "" || nombre === "" || correo === "" || clave === "" || region === "") {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return;
    }

    if (clave !== claveConf) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // 1. Guardamos el nombre dinámico en la memoria del navegador
    localStorage.setItem("nombreUsuario", nombre);

    alert("¡Cuenta creada exitosamente para " + nombre + "!");
    
    // 2. Lo mandamos directo a su nuevo perfil en vez del inicio de sesión
    window.location.href = "mi-perfil.html";
}