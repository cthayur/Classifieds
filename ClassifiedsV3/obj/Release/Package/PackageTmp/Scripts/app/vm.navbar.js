/// <reference path="constants.js" />
(function ($, ko, my) {
        
    my.vm.navBar = function () {
        var returnObj = {}

        returnObj.navBarItems = ko.observableArray([]);

        returnObj.loadNavBarItems = function (data) {
            if (returnObj.navBarItems().length == 0) {
                $.each(data, function (i, p) {
                    returnObj.navBarItems.push({ name: p.name, hash: p.hash });
                });
            }
        };

        return returnObj;
    }();

})(jQuery, ko, my);