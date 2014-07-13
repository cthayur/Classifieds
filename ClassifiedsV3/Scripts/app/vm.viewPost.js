/// <reference path="constants.js" />
/// <reference path="models.js" />
(function ($, ko, my) {

    my.vm.viewPosts = function () {

        var returnObj = {}

        returnObj.viewPostData = new my.model.post();

        returnObj.viewModelBound = ko.observable(false);

        returnObj.clearSelf = function () {
            returnObj.viewPostData.id(undefined);
            returnObj.viewPostData.UserId(undefined);
            returnObj.viewPostData.category(undefined);
            returnObj.viewPostData.categoryId(undefined);
            returnObj.viewPostData.title(undefined);
            returnObj.viewPostData.price(undefined);
            returnObj.viewPostData.location(undefined);
            returnObj.viewPostData.description(undefined);
            returnObj.viewPostData.gravatar(undefined);
            returnObj.viewPostData.date(undefined);
            returnObj.viewPostData.postHref(undefined);
            returnObj.viewPostData.redirectToEdit(undefined);
        };

        returnObj.updateVm = function (data) {
            returnObj.viewPostData.id(data.id());
            returnObj.viewPostData.UserId(data.UserId());
            returnObj.viewPostData.category(data.category());
            returnObj.viewPostData.categoryId(data.categoryId());
            returnObj.viewPostData.title(data.title());
            returnObj.viewPostData.price(data.price());
            returnObj.viewPostData.location(data.location());
            returnObj.viewPostData.description(data.description());
            returnObj.viewPostData.gravatar(data.gravatar());
            returnObj.viewPostData.date(data.date());
            returnObj.viewPostData.postHref(data.postHref());
            returnObj.viewPostData.redirectToEdit(data.redirectToEdit());
        };

        returnObj.disablePost = function () {
            my.dataStore.disablePost(returnObj.viewPostData.id());
        };

        returnObj.lockUser = function () {
            my.dataStore.lockUser(returnObj.viewPostData.UserId());
        };

        return returnObj;

    }();


})(jQuery, ko, my);