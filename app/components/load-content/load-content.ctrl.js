(() => {
    app.loadContent = function() {
        var tabText1 = document.getElementById('js-tab-text-1'),
            tabText2 = document.getElementById('js-tab-text-2'),
            getStarted1 = document.getElementById('js-get-started-heading'),
            getStarted2 = document.getElementById('js-get-started-tag'),
            getStarted3 = document.getElementById('js-get-started-btn'),
            features1 = document.getElementById('js-features-heading'),
            feature1h = document.getElementById('js-feature-heading-0'),
            feature1c = document.getElementById('js-feature-content-0'),
            feature2h = document.getElementById('js-feature-heading-1'),
            feature2c = document.getElementById('js-feature-content-1'),
            feature3h = document.getElementById('js-feature-heading-2'),
            feature3c = document.getElementById('js-feature-content-2'),
            signup1 = document.getElementById('js-free-signup'),
            signup1btn = document.getElementById('js-free-sign-up-btn'),
            signup1btn1 = document.getElementById('js-sign-up-btn'),
            brwsrstk = document.getElementById('js-brsrstk'),
            tos = document.getElementById('js-tos'),
            privacy = document.getElementById('js-privacy'),
            support = document.getElementById('js-support'),
            logo = document.getElementById('js-logo'),
            tabList1 = document.getElementById('js-tab-list-1'),
            tabList2 = document.getElementById('js-tab-list-2'),
            tabList3 = document.getElementById('js-tab-list-3'),
            tabList4 = document.getElementById('js-tab-list-4'),
            tabText1O = app.observable('');

        // Note: PUB-SUB pattern for 2 way data bindng
        tabText1.innerHTML = tabText1O();
        tabText1O.subscribe(function(_tabText1) {
            tabText1.innerHTML = _tabText1;
        });

        tabText1O(app.constants._tag1);

        // Note: Regular data insertion
        tabText2.innerHTML = app.constants._tag2;
        getStarted1.innerHTML = app.constants._tag3;
        getStarted2.innerHTML = app.constants._tag4;
        getStarted3.value = app.constants._getStarted;
        signup1btn.value = app.constants._signUp;
        signup1btn1.value = app.constants._signUp;
        features1.innerHTML = app.constants._features;
        feature1h.innerHTML = app.constants._feature1;
        feature1c.innerHTML = app.constants._feature1Tag;
        feature2h.innerHTML = app.constants._feature2;
        feature2c.innerHTML = app.constants._feature2Tag;
        feature3h.innerHTML = app.constants._feature3;
        feature3c.innerHTML = app.constants._feature3Tag;
        signup1.innerHTML = app.constants._signUpFree;
        tos.innerHTML = app.constants._tos;
        privacy.innerHTML = app.constants._privacy;
        support.innerHTML = app.constants._support;
        brwsrstk.innerHTML = app.constants._browserstack;
        logo.innerHTML = app.constants._browserstack;
        tabList1.innerHTML = app.constants._live;
        tabList2.innerHTML = app.constants._automate;
        tabList3.innerHTML = app.constants._screenshots;
        tabList4.innerHTML = app.constants._help;
    };
})();
