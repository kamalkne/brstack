(() => {
    var BrskHeader = document.registerElement('brsk-header');
    document.body.appendChild(new BrskHeader());
    document.getElementsByTagName('brsk-header')[0].innerHTML =
        '<div class="brsk-header">' +
        '<div class="pull-left logo" id="js-logo"></div>' +
        '<div class="pull-right header-list">' +
        '<span id="js-tab-list-1"></span>' +
        '<span id="js-tab-list-2"></span>' +
        '<span id="js-tab-list-3"></span>' +
        '<span id="js-tab-list-4"></span>' +
        '</div>' +
        '</div>';
})();
