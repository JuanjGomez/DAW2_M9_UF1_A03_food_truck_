// Funciones de manejo de sesión
function initializeSession() {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
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
            updateSessionStartTime();
            
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
            localStorage.removeItem('sessionStartTime');
            
            // Actualizar la UI
            updateUIForLoggedOutUser();
        });
    }
}

// Función para cargar componentes HTML
async function loadComponent(path, containerId) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error cargando ${path}:`, error);
        return false;
    }
}

// Cuando el documento se carga
document.addEventListener('DOMContentLoaded', async function() {
    // Determinar si estamos en la carpeta view
    const isInView = window.location.pathname.includes('/view/');
    
    try {
        // Cargar el header correspondiente
        const headerPath = isInView ? '../headIfoot/headerView.html' : 'headIfoot/header.html';
        await loadComponent(headerPath, 'header-container');
        
        // Inicializar eventos de login y sesión después de cargar el header
        initializeLoginEvents();
        initializeSession();
        
        // Cargar el footer
        const footerPath = isInView ? '../headIfoot/footer.html' : 'headIfoot/footer.html';
        await loadComponent(footerPath, 'footer-container');
        
        // Inicializar tooltips después de cargar el footer
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
        
    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});

// Funciones de manejo de la expiración de sesión
function checkSessionExpiration() {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    const currentTime = new Date().getTime();
    const sessionDuration = 3600000; // 1 hora

    if (sessionStartTime && (currentTime - parseInt(sessionStartTime) > sessionDuration)) {
        localStorage.clear();
        updateUIForLoggedOutUser();
        alert('La seva sessió ha expirat. Si us plau, torni a iniciar sessió.');
    }
}

function updateSessionStartTime() {
    localStorage.setItem('sessionStartTime', new Date().getTime().toString());
}

// Verificar la expiración de la sesión cada minuto
setInterval(checkSessionExpiration, 60000);

document.addEventListener('DOMContentLoaded', function() {
    const cookiesContainer = document.getElementById('cookies-container');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    function hideCookiesBanner() {
        cookiesContainer.style.opacity = '0';
        setTimeout(() => {
            cookiesContainer.style.display = 'none';
        }, 300);
    }

    acceptButton.addEventListener('click', hideCookiesBanner);
    rejectButton.addEventListener('click', hideCookiesBanner);
});

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.product-page');
    const pageItems = document.querySelectorAll('.pagination .page-item[data-page]');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    let currentPage = 1;
    const totalPages = pages.length;

    // Función para mostrar una página específica
    function showPage(pageNumber) {
        // Ocultar todas las páginas
        pages.forEach(page => page.style.display = 'none');
        
        // Mostrar la página seleccionada
        document.querySelector(`.product-page[data-page="${pageNumber}"]`).style.display = 'block';
        
        // Actualizar estado de los botones de paginación
        pageItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page == pageNumber) {
                item.classList.add('active');
            }
        });

        // Actualizar estado de los botones prev/next
        prevButton.classList.toggle('disabled', pageNumber === 1);
        nextButton.classList.toggle('disabled', pageNumber === totalPages);
        
        currentPage = pageNumber;
    }

    // Event listeners para los botones de paginación
    pageItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(parseInt(item.dataset.page));
        });
    });

    // Event listener para el botón anterior
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    // Event listener para el botón siguiente
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    // Mostrar la primera página al cargar
    showPage(1);
});