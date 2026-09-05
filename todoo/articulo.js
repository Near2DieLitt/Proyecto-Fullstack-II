document.addEventListener('DOMContentLoaded', () => {
    // Busca el botón negro del final del artículo
    const btnCatalogo = document.querySelector('.btn-catalog');
    
    // Si el botón existe en la página, le agrega el evento del clic
    if (btnCatalogo) {
        btnCatalogo.addEventListener('click', () => {
            // Te redirige a la página del catálogo (asegúrate de que se llame así)
            window.location.href = 'catalogo.html';
        });
    }
});