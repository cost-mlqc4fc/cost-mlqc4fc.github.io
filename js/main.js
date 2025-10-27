(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.fixed-top .container').addClass('shadow-sm').css('max-width', '100%');
        } else {
            $('.fixed-top .container').removeClass('shadow-sm').css('max-width', '85%');
        }
    });


    // Donation
    $('.progress').waypoint(function () {
        $('.progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


    // Event carousel
    $(".event-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Theme toggle
    var initThemeToggle = function () {
        var themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        var storageKey = 'ml-theme';
        var docBody = document.body;
        var icon = themeToggle.querySelector('i');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        var getStoredTheme = function () {
            try {
                return localStorage.getItem(storageKey);
            } catch (e) {
                return null;
            }
        };

        var storeTheme = function (theme) {
            try {
                localStorage.setItem(storageKey, theme);
            } catch (e) {
                /* ignore storage issues */
            }
        };

        var applyTheme = function (theme, persist) {
            var isDark = theme === 'dark';
            docBody.classList.toggle('dark-mode', isDark);
            if (icon) {
                icon.classList.remove('fa-moon', 'fa-sun');
                icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            }
            themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            if (persist) {
                storeTheme(theme);
            }
        };

        var storedTheme = getStoredTheme();
        var initialTheme = storedTheme ? storedTheme : (prefersDark.matches ? 'dark' : 'light');
        applyTheme(initialTheme, false);

        themeToggle.addEventListener('click', function () {
            var nextTheme = docBody.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });

        var handleSystemChange = function (event) {
            if (getStoredTheme()) return;
            applyTheme(event.matches ? 'dark' : 'light', false);
        };

        if (prefersDark.addEventListener) {
            prefersDark.addEventListener('change', handleSystemChange);
        } else if (prefersDark.addListener) {
            prefersDark.addListener(handleSystemChange);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
    

})(jQuery);
