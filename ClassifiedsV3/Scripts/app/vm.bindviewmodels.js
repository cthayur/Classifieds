/// <reference path="constants.js" />
/// <reference path="vm.navbar.js" />
/// <reference path="vm.mixedbag.js" />
/// <reference path="vm.housing.js" />
/// <reference path="vm.messages.js" />
/// <reference path="dataStore.js" />
/// <reference path="vm.userPosts.js" />
/// <reference path="vm.generic.js" />

(function ($, ko, my) {

    my.bindViewModels = function () {

        var returnObj = {};

        returnObj.navBar = function () {
            var _navBarData = my.dataStore.getNavBarItems();
            my.vm.navBar.loadNavBarItems(_navBarData);
            my.bindvm(my.vm.navBar, my.viewNames.navBar);
            my.topNavHandler();
        };

        returnObj.mixedBagCallBack = function (options) {
            my.vm.mixedBag.loadData(options.data);
            my.bindvm(options.vm, options.viewName);
            my.viewPostClickHandler();
            my.displayView(options.viewName);
        };

        returnObj.bindVmCallBack = function (options) {
            options.vm.loadData(options.data);
            my.bindvm(options.vm, options.viewName);
            my.sideNavHandler({ sideNav: options.sideNav, callback: options.vm.filterDateCallBack });
            options.vm.clearFilter();
            $($(options.sideNav)[0]).addClass("active");
            my.displayView(options.viewName);
        };

        returnObj.userMessageDataCallBack = function (options) {
            options.vm.loadData(options.data);
            my.bindvm(options.vm, options.viewNameMessage);

            options.ajaxUrl = 'api/posts/GetPostForUser/' + my.loggedInUserId;
            options.callback = returnObj.userPostsCallback;
            options.vm = my.vm.userPosts;
            my.dataStore.ajaxRequest(options);
        };

        returnObj.userPostsCallback = function (options) {
            my.vm.userPosts.loadData(options.data);
            my.bindvm(options.vm, options.viewNamePost);            

            options.ajaxUrl = 'api/subscriptions/' + my.loggedInUserId;
            options.callback = returnObj.userSubscriptionCallback;
            options.vm = my.vm.userSubscriptions;
            my.dataStore.ajaxRequest(options);
            
        };

        returnObj.userSubscriptionCallback = function (options) {
            options.vm.loadData(options.data);
            my.bindvm(options.vm, options.viewNameSubscription);
            
            my.subscriptionLinkHandler();
            my.sideNavUserHandler(options);
            my.userMessageRowHandler();
            my.editPostClickHandler();
            my.displayView(options.viewName);

        };


        return returnObj;
    }();

    my.bindvm = function (vm, elem) {

        if (vm.viewModelBound) {
            if (!vm.viewModelBound()) {
                ko.applyBindings(vm, $(elem).get(0));
                vm.viewModelBound(true);
            }
        }
        else {
            ko.applyBindings(vm, $(elem).get(0));
        }
    };

})(jQuery, ko, my);