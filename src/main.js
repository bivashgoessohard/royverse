// Basic Translations
const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.blog": "Blog",
        "hero.title": "Elevate Your Lifestyle",
        "hero.subtitle": "Your curated guide to smart shopping, premium gadgets, and insightful living. We filter the noise so you can focus on quality.",
        "hero.cta": "Explore Content",
        "hero.mission": "Our Mission",
        "footer.rights": "© 2025 Royverse. All rights reserved.",
        "widget.settings": "Settings",
        "widget.textSize": "Text Size",
        "widget.font": "Font Style",
        "widget.language": "Language",
    },
    hi: {
        "nav.home": "होम",
        "nav.about": "हमारे बारे में",
        "nav.contact": "संपर्क करें",
        "nav.blog": "ब्लॉग",
        "hero.title": "अपनी जीवनशैली को बेहतर बनाएं",
        "hero.subtitle": "स्मार्ट शॉपिंग, प्रीमियम गैजेट्स और व्यावहारिक जीवन के लिए आपकी गाइड। हम शोर को कम करते हैं ताकि आप गुणवत्ता पर ध्यान केंद्रित कर सकें।",
        "hero.cta": "सामग्री देखें",
        "hero.mission": "हमारा मिशन",
        "footer.rights": "© 2025 Royverse. सर्वाधिकार सुरक्षित।",
        "widget.settings": "सेटिंग्स",
        "widget.textSize": "टेक्स्ट आकार",
        "widget.font": "फ़ॉन्ट शैली",
        "widget.language": "भाषा",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccessibilityWidget();
    initI18n();
});

function initMobileMenu() {
    // Inject Mobile Menu Drawer
    const mobileMenuHTML = `
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden opacity-0 transition-opacity duration-300"></div>
        <div id="mobile-menu-drawer" class="fixed top-0 right-0 w-64 h-full bg-primary border-l border-white/10 z-[70] transform translate-x-full transition-transform duration-300 shadow-2xl p-6 flex flex-col">
            <button id="close-menu-btn" class="self-end text-gray-400 hover:text-white mb-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <nav class="flex flex-col space-y-6">
                <a href="/" class="text-xl font-serif text-white hover:text-accent transition-colors" data-i18n="nav.home">Home</a>
                <a href="/blog.html" class="text-xl font-serif text-white hover:text-accent transition-colors" data-i18n="nav.blog">Blog</a>
                <a href="/about.html" class="text-xl font-serif text-white hover:text-accent transition-colors" data-i18n="nav.about">About</a>
                <a href="/contact.html" class="text-xl font-serif text-white hover:text-accent transition-colors" data-i18n="nav.contact">Contact</a>
            </nav>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

    const menuBtn = document.querySelector('button.md\\:hidden'); // Existing hamburger in HTML
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

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

function initAccessibilityWidget() {
    const widgetHTML = `
        <div class="fixed bottom-6 right-6 z-40 group">
            <div id="widget-panel" class="absolute bottom-16 right-0 w-64 glass p-6 rounded-2xl hidden opacity-0 transition-opacity duration-300 transform scale-95 origin-bottom-right">
                <h3 class="text-accent font-bold mb-4 uppercase text-xs tracking-widest" data-i18n="widget.settings">Settings</h3>
                
                <div class="mb-4">
                    <label class="block text-white text-sm mb-2" data-i18n="widget.textSize">Text Size</label>
                    <div class="flex items-center space-x-2">
                        <button id="font-dec" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">-</button>
                        <span id="font-val" class="text-gray-300 text-sm">100%</span>
                        <button id="font-inc" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">+</button>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-white text-sm mb-2" data-i18n="widget.font">Font Style</label>
                    <button id="font-toggle" class="px-3 py-1 text-xs rounded-full bg-accent text-primary font-bold hover:bg-accent-hover transition-colors">Toggle Serif/Sans</button>
                </div>

                <div>
                    <label class="block text-white text-sm mb-2" data-i18n="widget.language">Language</label>
                    <select id="lang-select" class="w-full bg-primary/50 text-white border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-accent">
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                    </select>
                </div>
            </div>
            
            <button id="widget-btn" class="w-12 h-12 bg-accent hover:bg-accent-hover text-primary rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] flex items-center justify-center transition-all transform hover:scale-110">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    const btn = document.getElementById('widget-btn');
    const panel = document.getElementById('widget-panel');
    let isOpen = false;

    btn.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            panel.classList.remove('hidden');
            setTimeout(() => {
                panel.classList.remove('opacity-0', 'scale-95');
                panel.classList.add('opacity-100', 'scale-100');
            }, 10);
        } else {
            panel.classList.remove('opacity-100', 'scale-100');
            panel.classList.add('opacity-0', 'scale-95');
            setTimeout(() => panel.classList.add('hidden'), 300);
        }
    });

    // Font Size
    let currentScale = 100;
    const html = document.documentElement;
    document.getElementById('font-inc').addEventListener('click', () => {
        if (currentScale < 130) {
            currentScale += 5;
            updateScale();
        }
    });
    document.getElementById('font-dec').addEventListener('click', () => {
        if (currentScale > 80) {
            currentScale -= 5;
            updateScale();
        }
    });

    function updateScale() {
        document.getElementById('font-val').innerText = `${currentScale}%`;
        html.style.fontSize = `${currentScale}%`; // 100% = 16px usually
    }

    // Font Toggle
    let isSerif = false;
    document.getElementById('font-toggle').addEventListener('click', () => {
        isSerif = !isSerif;
        if (isSerif) {
            document.body.classList.remove('font-sans');
            document.body.classList.add('font-serif');
        } else {
            document.body.classList.remove('font-serif');
            document.body.classList.add('font-sans');
        }
    });

    // Language
    const langSelect = document.getElementById('lang-select');
    // Check localStorage
    const savedLang = localStorage.getItem('royverse_lang') || 'en';
    langSelect.value = savedLang;
    applyLanguage(savedLang);

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('royverse_lang', lang);
        applyLanguage(lang);
    });
}

function initI18n() {
    // Already handled in initAccessibilityWidget largely, but can be separated.
    // Ensure initial load applies language
    const savedLang = localStorage.getItem('royverse_lang') || 'en';
    applyLanguage(savedLang);
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}
