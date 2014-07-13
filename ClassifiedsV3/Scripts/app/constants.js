/// <reference path="../core/_references.js" />
/// <reference path="vm.generic.js" />
(function ($, my) {

    my = my || {};

    my.hashes = {
        mixedbag: '#/mixedbag',
        housing: '#/housing',
        electronics: '#/electronics',
        books: '#/books',
        homegoods: '#/homegoods',
        miscellaneous: '#/Miscellaneous',
        userpage: '#/userpage',
        newPost: '#/newPost',
        viewPost: '#/viewPost',
        editPost: '#/EditPost'
    };

    my.navBarItems =
            [{ name: 'Mixed Bag', hash: my.hashes.mixedbag },
             { name: 'Housing', hash: my.hashes.housing },
             { name: 'Electronics', hash: my.hashes.electronics },
             { name: 'Books', hash: my.hashes.books },
             { name: 'Home Goods', hash: my.hashes.homegoods },
             { name: 'Miscellaneous', hash: my.hashes.miscellaneous },
             { name: 'User Page', hash: my.hashes.userpage }
            ];

    my.viewNames = {
        mixedbag: '#mixedbag-view',
        housing: '#housing-view',
        electronics: '#electronics-view',
        books: '#books-view',
        homegoods: '#homegoods-view',
        miscellaneous: '#miscellaneous-view',
        userpage: '#userpage-view',
        navBar: '#ul-navbar',
        editpost: '#editpost-view',
        viewpost: '#viewpost-view',
        messageModal: '#messageModal',
        userMessageModal: '#userMessageModal',
        userMessage: '#userMessage-view',
        userPost: '#userPost-view',
        userSubscriptions: '#userSubscriptions-view'
    };

    my.sideNavNames = {
        housing: '.sideNavHousing',
        electronics: '.sideNavElectronics',
        books: '.sideNavBooks',
        homegoods: '.sideNavHomeGoods',
        miscellaneous: '.sideNavBooksMiscellaneous'
    };

    my.categoryIds = {
        housing: 1,
        electronics: 2,
        books: 3,
        homegoods: 4,
        miscellaneous: 5
    };

    my.eventHandlerConstants = {
        active: 'active',
        click: 'click',
        topNav: '.topNavBar',
        articleEdit: '.article_container.editPost',
        articleView: '.article_container.viewPost'
    }

    my.redirectTo = function (hash) {
        window.location.replace(window.location.origin + window.location.pathname + hash)
    };

    my.setWindowHash = function (hash) {
        window.location.assign(hash);
    };

    my.hideView = function () {
        my.hideAllViews();
        $('#busyindicator').activity(true);
    };

    my.displayView = function (viewName) {
        //my.hideAllViews();
        //$('#busyindicator').activity(true);
        $(viewName).show('drop', { direction: 'left', easing: 'linear' }, 400);
        $('#busyindicator').activity(false);
    };

    my.hideAllViews = function () {
        $('.view').hide();
    };

    //my.vm = {};    
    my.dataStore = {};    

    $(function () {

        my.loggedInUserId = $('#userId').val();
        my.logggedInEmailId = $('#userName').val();

        var _userInfo = my.dataStore.getUserInfo(my.loggedInUserId);

        my.loggedInGravatarUrl = _userInfo.gravatarUrl;
        my.isUserAdmin = _userInfo.isUserAdmin;

        

    });

})(jQuery, my);