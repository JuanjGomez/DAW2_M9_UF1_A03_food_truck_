document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    document.querySelector('.navbar-brand').innerText = `Benvingut ${username}`;
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('loginButton').style.display = 'none';
    $('#loginModal').modal('hide');
});

document.getElementById('logoutButton').addEventListener('click', function() {
    document.querySelector('.navbar-brand').innerText = 'Food Truck';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('loginButton').style.display = 'block';
});

// Inicializar todos los tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    
}); 