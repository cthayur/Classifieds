/// <reference path="constants.js" />
/// <reference path="routesRegistry.js" />
/// <reference path="vm.bindviewmodels.js" />
$(function () {
    my.bindViewModels.navBar();

    var hash = window.location.hash;

    if (hash == undefined || hash == null || hash == '') {
        my.activateRouteListner();
        my.redirectTo(my.hashes.mixedbag);
        $($(".topNavBar")[0]).addClass("active");
    }

    my.viewPostClickHandler();  
});