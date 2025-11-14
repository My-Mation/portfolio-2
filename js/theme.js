document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Set initial theme based on saved preference or system setting
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', currentTheme);

    themeToggleButton.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
