(() => {
    'use strict';

    app.flip = function() {
        var jsFlipSection = document.getElementById('js-flip-section');
        if (jsFlipSection.offsetTop + 300 < document.body.scrollTop) {
            var rotableImages = document.getElementsByClassName('feature-img');
            for (let i = 0, j = rotableImages.length; i < j; i++) {
                rotableImages[i].style.transform = 'rotate(360deg)';
                rotableImages[i].style.transition = 'transform .8s ease-in-out';
            }
            document.removeEventListener('scroll', app.flip);
        }
    };
})();
