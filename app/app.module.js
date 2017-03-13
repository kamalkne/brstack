(() => {
    'use strict';

    app.slider();

    app.loadContent();

    document.addEventListener('scroll', app.flip);
})();
