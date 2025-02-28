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