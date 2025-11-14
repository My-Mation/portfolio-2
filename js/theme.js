const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('theme-dark')) {
        html.classList.remove('theme-dark');
        html.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('theme-light');
        html.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
    }
});

// On page load
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme === 'dark') {
    html.classList.add('theme-dark');
} else {
    html.classList.add('theme-light');
}