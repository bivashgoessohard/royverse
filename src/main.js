
// --- Theme Handling ---
function initTheme() {
    // Check local storage. Default to LIGHT if nothing is saved.
    const savedTheme = localStorage.theme;

    // If explicitly dark, or no save but system is dark -> Dark Mode
    // MODIFIED: We want "News Theme" (Light) to be the default even if system is dark, 
    // UNLESS the user explicitly toggled it before. 
    // Actually, let's respect system pref ONLY if they haven't visited, otherwise Light default.
    // Simplifying: Default Light unless saved as Dark.

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Toggle button logic
    // We attach this via event delegation or direct if we query all potential buttons
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#theme-toggle');
        if (toggleBtn) {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
            updateThemeIcons();
        }
    });

    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const icons = document.querySelectorAll('#theme-toggle');
    icons.forEach(btn => {
        if (isDark) {
            // Sun icon for dark mode (click to switch to light)
            btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
        } else {
            // Moon icon for light mode
            btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme(); // Run first to prevent flash
    initParticles();
    initGoogleTranslate();
    initHeaderSettings();
    initMobileMenu();
});

// --- Particles System ---
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Keep it lightweight
    const connectionDist = 150;
    const mouseDist = 200;

    let mouse = { x: null, y: null };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('touchstart', (e) => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    });
    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            // Futuristic colors: Cyan and Purple/Pink accents
            this.color = Math.random() > 0.5 ? 'rgba(34, 211, 238, ' : 'rgba(232, 121, 249, ';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseDist) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDist - distance) / mouseDist;
                    const directionX = forceDirectionX * force * this.size;
                    const directionY = forceDirectionY * force * this.size;
                    this.x -= directionX; // Move away from mouse
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.8)';
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color + (1 - distance / connectionDist) * 0.2 + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    resize();
    init();
    animate();
}

// --- Google Translate ---
function initGoogleTranslate() {
    // Prevent duplicate injection if script exists
    if (document.getElementById('google-translate-script')) return;

    // Define the global callback function
    window.googleTranslateElementInit = function () {
        // Double check if widget is already populated
        const target = document.getElementById('google_translate_element');
        if (target && target.childElementCount > 0) return;

        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,as,ta,te,mr,gu,kn,ml,pa,ur', // Indian languages + English
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // Inject the script
    const script = document.createElement('script');
    script.id = 'google-translate-script'; // Assign ID for check
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
}

// --- Header Settings (Font size/style) ---
function initHeaderSettings() {
    // These buttons will need to be added to the HTML header
    // We attach event listeners assuming the IDs exist or will exist

    // Font Size
    let currentScale = 100;
    const html = document.documentElement;

    document.addEventListener('click', (e) => {
        if (e.target.closest('#header-font-inc')) {
            if (currentScale < 130) {
                currentScale += 5;
                html.style.fontSize = `${currentScale}%`;
            }
        }
        if (e.target.closest('#header-font-dec')) {
            if (currentScale > 80) {
                currentScale -= 5;
                html.style.fontSize = `${currentScale}%`;
            }
        }
        if (e.target.closest('#header-font-toggle')) {
            document.body.classList.toggle('font-serif');
            document.body.classList.toggle('font-sans');
        }
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const mobileMenuHTML = `
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden opacity-0 transition-opacity duration-300"></div>
        <div id="mobile-menu-drawer" class="fixed top-0 right-0 w-64 h-full bg-primary border-l border-white/10 z-[70] transform translate-x-full transition-transform duration-300 shadow-2xl p-6 flex flex-col">
            <button id="close-menu-btn" class="self-end text-gray-400 hover:text-white mb-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <nav class="flex flex-col space-y-6">
                <a href="/" class="text-xl font-serif text-white hover:text-accent transition-colors">Home</a>
                <a href="/blog.html" class="text-xl font-serif text-white hover:text-accent transition-colors">Blog</a>
                <a href="/about.html" class="text-xl font-serif text-white hover:text-accent transition-colors">About</a>
                <a href="/contact.html" class="text-xl font-serif text-white hover:text-accent transition-colors">Contact</a>
                <hr class="border-white/10">
                <!-- Mobile Settings Placeholders -->
                <div class="flex items-center space-x-4">
                     <span class="text-gray-400 text-sm">Text:</span>
                     <button id="header-font-dec" class="text-white hover:text-accent font-bold text-lg">-</button>
                     <button id="header-font-inc" class="text-white hover:text-accent font-bold text-lg">+</button>
                </div>
                 <button id="header-font-toggle" class="text-left text-gray-400 hover:text-accent text-sm">Toggle Font Style</button>
            </nav>
        </div>
    `;

    // Check if not already added to avoid duplicates if re-run
    if (!document.getElementById('mobile-menu-drawer')) {
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    }

    const menuBtn = document.querySelector('button.md\\:hidden');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    function toggleMenu() {
        const isClosed = drawer.classList.contains('translate-x-full');
        if (isClosed) {
            drawer.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        } else {
            drawer.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    }
}

// --- AdSense Integration ---
function initAds() {
    // Prevent duplicate injection
    if (document.getElementById('adsense-script')) return;

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6887038408474117";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParticles();
    initGoogleTranslate();
    initHeaderSettings();
    initMobileMenu();
    initAds();
});
