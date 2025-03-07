// Inicializar todos los tooltips
// Función para cargar el footer
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el header
    fetch('../headIfoot/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // Inicializar los eventos del login después de cargar el header
            initializeLoginEvents();
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar el footer
    fetch('../headIfoot/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            // Inicializar los tooltips después de cargar el footer
            initializeTooltips();
        })
        .catch(error => console.error('Error cargando el footer:', error));
});