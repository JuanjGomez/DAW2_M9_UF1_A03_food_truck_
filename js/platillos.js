// Inicializar todos los tooltips
// Función para cargar el footer
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el footer
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            
            // Inicializar los tooltips después de cargar el footer
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            });
        });
});