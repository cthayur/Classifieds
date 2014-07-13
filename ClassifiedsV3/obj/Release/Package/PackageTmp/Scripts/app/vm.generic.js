/// <reference path="../core/_references.js" />
(function ($, ko) {

    my = {};

    my.vm = {};

    my.vm.generic = function (options) {
        var returnObj = {}

        returnObj.options = options;

        returnObj.items = ko.observableArray([]);

        returnObj.viewModelBound = ko.observable(false);

        returnObj.filterText = ko.observable();

        returnObj.filterPrice = ko.observable();

        returnObj.filteredItems = ko.observableArray([]);

        returnObj.uniqueDates = ko.observableArray([]);

        returnObj.filterDate = ko.observable();        

        returnObj.filterDateCallBack = function (date) {
            returnObj.filterDate(date);
        };

        returnObj.filterFunction = ko.computed(function () {

            var text = returnObj.filterText() == "" ? null : returnObj.filterText();
            var myDate = returnObj.filterDate != undefined ? returnObj.filterDate() : undefined;
            var price = returnObj.filterPrice() == "" ? null : returnObj.filterPrice();

            if (text != undefined || price != undefined) {
                $(returnObj.options.sideNav).hide();
            }
            else {
                $(returnObj.options.sideNav).show();
            }

            if (text || price) {
                returnObj.filterItems(undefined, text, price);
            }
            else if (myDate) {
                returnObj.filterItems(myDate);
            }
        }).extend({ throttle: 250 });

        returnObj.filterItems = function (filterDate, text, price) {

            returnObj.filteredItems.removeAll();

            var results = undefined;
            var textFiltered = false;

            if (text || price) {

                results = ko.utils.arrayFilter(returnObj.items(), function (item) {
                    return ((text == undefined) || (item.title().toLowerCase().search(text) != -1
                                || item.location().toLowerCase().search(text) != -1
                                || item.description().toLowerCase().search(text) != -1))
                        && ((price == undefined) || (item.price() < parseFloat(price)))
                });
            }
            else if (filterDate) {
                results = ko.utils.arrayFilter(returnObj.items(), function (item) {
                    return item.date() == filterDate;
                });
            }

            ko.utils.arrayForEach(results, function (item) {
                returnObj.filteredItems.push(item);
            });

            my.viewPostClickHandler();
        };

        returnObj.clearFilter = function () {
            returnObj.filterText(undefined);
            returnObj.filterPrice(undefined);
            my.viewPostClickHandler();
            $(returnObj.options.sideNav).show();
        };

        returnObj.savePostCallBack = function () {
            if (returnObj.uniqueDates().length == 0 && returnObj.items().length == 1) {
                returnObj.uniqueDates.push(returnObj.items()[0].date());
            }

            returnObj.filterDate(returnObj.uniqueDates()[0]);
        };

        returnObj.loadData = function (data) {

            if (data == undefined || data == null)
                return;

            returnObj.items.removeAll();

            $.each(data, function (i, p) {
                my.pushDataToPostModel(returnObj.items, p, false);

                if (returnObj.uniqueDates.indexOf(p.date) < 0) {
                    returnObj.uniqueDates.push(p.date);
                }
            });

            if (returnObj.items().length > 0)
                returnObj.filterDate(returnObj.uniqueDates()[0]);
            else
                returnObj.uniqueDates.removeAll();
        };

        returnObj.createPost = function () {
            my.setWindowHash("#/newPost/" + options.category);

            my.editPostHandler(new my.model.post()
                            .category(returnObj.options.category)
                            .categoryId(returnObj.options.categoryId)
                            .date(new Date().toDateString())
                            .UserId(my.loggedInUserId)
                            .gravatar(my.loggedInGravatarUrl)
                            .redirectToEdit(false)
                , returnObj.items,
                  returnObj.options.sideNav,
                  returnObj.options.hash,
                  returnObj.savePostCallBack,
                  my.viewNames.editpost);
        };

        return returnObj;
    };       
})(jQuery, ko);