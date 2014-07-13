/// <reference path="constants.js" />
/// <reference path="eventHandlers.js" />
/// <reference path="models.js" />
/// <reference path="vm.editPost.js" />
(function ($, ko, my) {

    my.vm.userSubscriptions = function () {
        var returnObj = {}

        returnObj.housingSubscribed = ko.observable(false);
        returnObj.electronicsSubscribed = ko.observable(false);
        returnObj.booksSubscribed = ko.observable(false);
        returnObj.homeGoodsSubscribed = ko.observable(false);
        returnObj.miscSubscribed = ko.observable(false);

        returnObj.loadData = function (data) {
            returnObj.housingSubscribed(data.housingSubscribed);
            returnObj.electronicsSubscribed(data.electronicsSubscribed);
            returnObj.booksSubscribed(data.booksSubscribed);
            returnObj.homeGoodsSubscribed(data.homeGoodsSubscribed);
            returnObj.miscSubscribed(data.miscSubscribed);
        };

        returnObj.housingClicked = function () {

            var x;
        };

        return returnObj;

    }();

})(jQuery, ko, my);