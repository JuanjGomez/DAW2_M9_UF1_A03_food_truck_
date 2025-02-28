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

//funcion de js de tabs index de los platos
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}