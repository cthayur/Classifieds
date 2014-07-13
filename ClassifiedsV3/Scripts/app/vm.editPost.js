/// <reference path="constants.js" />
/// <reference path="models.js" />
/// <reference path="vm.mixedbag.js" />
(function ($, ko, my) {

    my.vm.editPosts = function () {

        var returnObj = {}

        returnObj.editPostData = new my.model.post();

        returnObj.viewModelBound = ko.observable(false),

        returnObj.callingDataArray = undefined,

        returnObj.callingSideNavName = ko.observable(),

        returnObj.callingHashValue = ko.observable(),

        returnObj.callbackForCaller = ko.observable(),

        returnObj.clearSelf = function () {
            returnObj.editPostData.id(undefined);
            returnObj.editPostData.UserId(undefined);
            returnObj.editPostData.category(undefined);
            returnObj.editPostData.categoryId(undefined);
            returnObj.editPostData.title(undefined);
            returnObj.editPostData.price(undefined);
            returnObj.editPostData.location(undefined);
            returnObj.editPostData.description(undefined);
            returnObj.editPostData.gravatar(undefined);
            returnObj.editPostData.date(undefined);
            returnObj.editPostData.postHref(undefined);
            returnObj.editPostData.redirectToEdit(undefined);
        },

        returnObj.updateVm = function (data,  dataArray, callingSideNav, callingHash, callback) {
            returnObj.editPostData.id(data.id());
            returnObj.editPostData.UserId(data.UserId());
            returnObj.editPostData.category(data.category());
            returnObj.editPostData.categoryId(data.categoryId());
            returnObj.editPostData.title(data.title());
            returnObj.editPostData.price(data.price());
            returnObj.editPostData.location(data.location());
            returnObj.editPostData.description(data.description());
            returnObj.editPostData.gravatar(data.gravatar());
            returnObj.editPostData.date(data.date());
            returnObj.editPostData.postHref(data.postHref());
            returnObj.editPostData.redirectToEdit(data.redirectToEdit());

            returnObj.callingDataArray = dataArray;
            returnObj.callingSideNavName(callingSideNav);
            returnObj.callbackForCaller(callback);
            returnObj.callingHashValue(callingHash);
        },

        returnObj.savePost = function () {

            var newPost = returnObj.editPostData.id() == undefined;
            
            if (newPost) {
                my.dataStore.savePost(returnObj.editPostData);
                returnObj.callingDataArray.push(returnObj.editPostData);
            }
            else {
                my.dataStore.updatePost(returnObj.editPostData);
                my.vm.userPosts.updatePost(returnObj.editPostData);
            }
        },

        returnObj.deletePost = function () {
            var newPost = returnObj.editPostData.id() == undefined;

            if (newPost) {
                returnObj.clearSelf();
            }
            else {
                my.dataStore.deletePost(returnObj.editPostData.id());
                my.vm.userPosts.deletePost(returnObj.editPostData.id());
            }
        }

        return returnObj;

    }();


})(jQuery, ko, my);