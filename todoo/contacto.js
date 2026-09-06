document.addEventListener("DOMContentLoaded", function() {
    
    // 1. CONFIGURAR CONTADORES EN VIVO
    const inputsContact = [
        { id: "NombreContacto", max: 100 },
        { id: "MensajeContacto", max: 500 }
    ];

    inputsContact.forEach(item => {
        let input = document.getElementById(item.id);
        
        if (input) {
            // Buscamos la etiqueta <span> que está justo después del input
            let contador = input.nextElementSibling;
            
            // Cada vez que el usuario escribe, actualizamos los números
            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});

// 2. FUNCIÓN DEL BOTÓN ENVIAR MENSAJE
function enviarMensaje() {
    let nombre = document.getElementById("NombreContacto").value;
    let correo = document.getElementById("CorreoContacto").value;
    let mensaje = document.getElementById("MensajeContacto").value;

    // Validación básica: que no haya campos vacíos
    if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return; // Detiene la función aquí si falta algo
    }

    // Mensaje de éxito simulado (puedes personalizarlo)
    alert("¡Gracias por escribirnos, " + nombre + "! Hemos recibido tu mensaje y te responderemos pronto al correo " + correo + ".");
    
    // Limpiar el formulario para que quede como nuevo
    document.getElementById("NombreContacto").value = "";
    document.getElementById("CorreoContacto").value = "";
    document.getElementById("MensajeContacto").value = "";
    
    // Reiniciar los contadores a cero
    document.getElementById("cont-nombre").textContent = "0/100";
    document.getElementById("cont-mensaje").textContent = "0/500";
}