(function (jtd, sst) {
    const ICONS = {
        'light': '<i class="fa-solid fa-sun">&nbsp;</i>',
        'dark': '<i class="fa-solid fa-moon">&nbsp;</i>',
    };
    // update version if major change is added to theme logic
    const SST_KEY = 'jtd-theme-v1';
    const DEFAULT_THEME = 'dark';

    ICONS.default = ICONS[DEFAULT_THEME];

    const THEME_A = 'default';
    const THEME_B = DEFAULT_THEME === 'dark' ? 'light' : 'dark';

    function initThemeSwitcher() {
        const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

        // do not update the theme unnecessarily
        const originalSetThem = jtd.setTheme;
        jtd.setTheme = function (theme) {
            if (jtd.getTheme() !== theme) {
                originalSetThem(theme);
            }
        }
    
        function setTheme(theme) {
            if (theme === DEFAULT_THEME) {
                theme = THEME_A;
            }
            jtd.setTheme(theme);
            sst.setItem(SST_KEY, theme);
            toggleDarkMode.innerHTML = ICONS[theme];
        }

        function toggleTheme(currentTheme) {
            setTheme(currentTheme === THEME_A ? THEME_B : THEME_A);
        }

        jtd.addEvent(toggleDarkMode, 'click', function () {
            toggleTheme(jtd.getTheme());
        });

        setTheme(sst.getItem(SST_KEY) || jtd.getTheme());
    }

    jtd.onReady(initThemeSwitcher);
})(window.jtd, window.sessionStorage);