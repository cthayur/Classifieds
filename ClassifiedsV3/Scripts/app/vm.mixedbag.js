/// <reference path="constants.js" />
/// <reference path="models.js" />
/// <reference path="eventHandlers.js" />
(function ($, ko, my) {

	my.vm.mixedBag = function () {

	    var returnObj = {}

	    returnObj.mixedBagItems = ko.observableArray([]);

	    returnObj.viewModelBound = ko.observable(false);

	    returnObj.loadData = function (data) {
	        returnObj.mixedBagItems.removeAll();

	        $.each(data, function (i, p) {
	            var model = new my.model.accordion().group(p.group).id(p.id);

	            $.each(p.items, function (j, q) {
	                my.pushDataToPostModel(model.items, q, false);
	            });

	            returnObj.mixedBagItems.push(model);
	        });
	    };
	    return returnObj;
	}();


})(jQuery, ko, my);