document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE --- //
    const themeToggleButton = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', currentTheme);
    themeToggleButton.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggleButton.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- 2. SCROLL-TRIGGERED ANIMATIONS --- //
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- 3. GITHUB API INTEGRATION --- //
    const githubUsername = "My-Mation";
    fetch(`https://api.github.com/users/${githubUsername}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data.public_repos !== undefined) {
                document.getElementById("gh-repos").innerText = data.public_repos;
            }
            if (data.followers !== undefined) {
                document.getElementById("gh-followers
").innerText = data.followers;
            }
        })
        .catch(error => {
            console.error("Could not fetch GitHub data:", error);
            document.getElementById("gh-repos").innerText = "20+"; // Fallback
            document.getElementById("gh-followers").innerText = "--";
        });
});
