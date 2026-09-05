document.addEventListener("DOMContentLoaded", function() {
    // 1. Leemos el dato guardado en el inicio de sesión
    let nombreGuardado = localStorage.getItem("nombreUsuario");

    // 2. Si el dato existe, actualizamos el texto del HTML
    if (nombreGuardado) {
        document.getElementById("saludo-usuario").innerText = "Hola, " + nombreGuardado;
    } else {
        // Si alguien intenta entrar a mi-perfil.html sin iniciar sesión, lo devolvemos al login
        window.location.href = "inicio-sesion.html";
    }
});

function cerrarSesion() {
    // Borramos el dato de la memoria
    localStorage.removeItem("nombreUsuario");
    
    // Lo mandamos de vuelta al inicio
    window.location.href = "inicio-sesion.html";
}