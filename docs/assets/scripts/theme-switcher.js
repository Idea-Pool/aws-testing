(function (jtd, sst) {
    const ICONS = {
        'light': '<i class="fa-solid fa-moon">&nbsp;</i>',
        'dark': '<i class="fa-solid fa-sun">&nbsp;</i>',
    };
    const SST_KEY = 'jtd-theme';

    function initThemeSwitcher() {
        const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

        function setTheme(theme) {
            jtd.setTheme(theme);
            sst.setItem(SST_KEY, theme);
            toggleDarkMode.innerHTML = ICONS[theme];
        }

        function toggleTheme(currentTheme) {
            setTheme(currentTheme == 'dark' ? 'light' : 'dark');
        }

        jtd.addEvent(toggleDarkMode, 'click', function () {
            toggleTheme(jtd.getTheme());
        });

        setTheme(sst.getItem(SST_KEY) || jtd.getTheme());
    }

    jtd.onReady(initThemeSwitcher);
})(window.jtd, window.sessionStorage);