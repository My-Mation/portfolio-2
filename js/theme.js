document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            root.classList.remove('theme-dark');
            root.classList.add('theme-light');
        } else {
            root.classList.remove('theme-light');
            root.classList.add('theme-dark');
        }
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    themeToggleButton.addEventListener('click', toggleTheme);

    // Initial theme setup
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
});
