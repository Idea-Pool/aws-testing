(function (jtd, sst) {
    const ICONS = {
        'light': '<i class="fa-solid fa-sun">&nbsp;</i>',
        'dark': '<i class="fa-solid fa-moon">&nbsp;</i>',
        'default': '<i class="fa-solid fa-moon">&nbsp;</i>',
    };
    const SST_KEY = 'jtd-theme';

    function initThemeSwitcher() {
        const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

        const originalSetThem = jtd.setTheme;
        jtd.setTheme = function (theme) {
            if (jtd.getTheme() !== theme) {
                originalSetThem(theme);
            }
        }
    
        function setTheme(theme) {
            jtd.setTheme(theme);
            sst.setItem(SST_KEY, theme);
            toggleDarkMode.innerHTML = ICONS[theme];
        }

        function toggleTheme(currentTheme) {
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        }

        jtd.addEvent(toggleDarkMode, 'click', function () {
            toggleTheme(jtd.getTheme());
        });

        setTheme(sst.getItem(SST_KEY) || jtd.getTheme() || 'dark');
    }

    jtd.onReady(initThemeSwitcher);
})(window.jtd, window.sessionStorage);