const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Optional: Change button text/icon (e.g., to 'X')
    if (navMenu.classList.contains('open')) {
        menuButton.innerHTML = '×'; // 'X' icon
        menuButton.setAttribute('aria-expanded', 'true');
    } else {
        menuButton.innerHTML = '☰'; // Hamburger icon
        menuButton.setAttribute('aria-expanded', 'false');
    }
});
