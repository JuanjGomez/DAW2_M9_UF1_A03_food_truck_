// Funciones de manejo de sesión
function iniciarSesion() {
    // Comprobar si hay una sesión activa
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
        // Si hay sesión activa, actualizar la UI
        updateUIForLoggedUser(activeUser);
    }
}

function updateUIForLoggedUser(username) {
    const brandText = document.querySelector('.navbar-brand span');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (brandText) brandText.innerText = `Benvingut ${username}`;
    if (loginButton) loginButton.style.display = 'none';
    if (logoutButton) logoutButton.style.display = 'block';
}

function updateUIForLoggedOutUser() {
    const brandText = document.querySelector('.navbar-brand span');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (brandText) brandText.innerText = 'Food Truck';
    if (loginButton) loginButton.style.display = 'block';
    if (logoutButton) logoutButton.style.display = 'none';
}

function initializeLoginEvents() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            
            // Guardar la sesión
            localStorage.setItem('activeUser', username);
            
            // Actualizar la UI
            updateUIForLoggedUser(username);
            
            // Cerrar el modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (loginModal) loginModal.hide();
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Eliminar la sesión
            localStorage.removeItem('activeUser');
            
            // Actualizar la UI
            updateUIForLoggedOutUser();
        });
    }
}

// Cuando el documento se carga
document.addEventListener('DOMContentLoaded', function() {
    // Determinar si estamos en la raíz o en una vista
    const isInView = window.location.pathname.includes('/view/');
    
    // Cargar el header correspondiente
    fetch(isInView ? '../headIfoot/headerView.html' : 'headIfoot/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeLoginEvents();
            // Inicializar la sesión después de cargar el header
            initializeSession();
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar el footer
    fetch(isInView ? '../headIfoot/footer.html' : 'headIfoot/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            // Inicializar tooltips después de cargar el footer
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        })
        .catch(error => console.error('Error cargando el footer:', error));
});

// Opcional: Añadir tiempo de expiración de la sesión (por ejemplo, 1 hora)
function checkSessionExpiration() {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    const currentTime = new Date().getTime();
    const sessionDuration = 3600000; // 1 hora en milisegundos

    if (sessionStartTime && (currentTime - sessionStartTime > sessionDuration)) {
        // La sesión ha expirado
        localStorage.clear();
        updateUIForLoggedOutUser();
        alert('La seva sessió ha expirat. Si us plau, torni a iniciar sessió.');
    }
}

// Actualizar el tiempo de inicio de sesión cuando el usuario inicia sesión
function updateSessionStartTime() {
    localStorage.setItem('sessionStartTime', new Date().getTime());
}

// Verificar la expiración de la sesión cada minuto
setInterval(checkSessionExpiration, 60000);