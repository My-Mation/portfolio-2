document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE --- //
    const themeToggleButton = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Set initial theme based on saved preference or system setting
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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll(':scope > *');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 120}ms`;
        });
        observer.observe(container); // Observe container to trigger children
        container.classList.add('in-view'); // Special class to trigger staggered animation
    });
    

    // --- 3. PROJECT CARD MOUSE-MOVE EFFECT --- //
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set mouse position for the radial gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D Tilt Effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25; // Slower rotation
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset all transformations
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

});

// Add a specific class to body when an element is in view to trigger animations
// This is an alternative way to handle animations if direct class adding isn't enough
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('start-animation');
        }
    });
});

document.querySelectorAll('.project-grid').forEach(grid => {
    if(grid) animationObserver.observe(grid);
});
