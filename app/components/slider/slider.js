(() => {
    'use strict';

    var bckImages = ['../../client/assets/bg1.jpg', '../../client/assets/bg2.jpg',
                     '../../client/assets/bg3.jpg'];
    app.slider = function() {
        var slider = document.getElementById('js-first-fold'),
            i = 1;
        setInterval(function() {
            slider.style.backgroundImage = 'url(' + bckImages[i] + ')';
            if (i === 2) {
                i = 0;
            } else {
                i++;
            }
        }, 5000);
    };
})();
