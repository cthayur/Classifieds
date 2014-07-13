/// <reference path="constants.js" />
/// <reference path="models.js" />
(function ($, ko, my) {

    my.vm.readWriteMessage = function () {

        var returnObj = {}

        returnObj.messageData = new my.model.message();

        returnObj.viewModelBound = ko.observable(false);

        returnObj.clearSelf = function () {
            returnObj.messageData.id(undefined);
            returnObj.messageData.from(undefined);
            returnObj.messageData.to(undefined);
            returnObj.messageData.date(undefined);
            returnObj.messageData.subject(undefined);
            returnObj.messageData.message(undefined);
            returnObj.messageData.postId(undefined);
            returnObj.messageData.postTitle(undefined);
            returnObj.messageData.isSubjectReadoly(undefined);
            returnObj.viewModelBound(false);
        };

        returnObj.updateVm = function (data) {
            returnObj.messageData.id(data.id());
            returnObj.messageData.from(data.from());
            returnObj.messageData.to(data.to());
            returnObj.messageData.date(data.date());
            returnObj.messageData.subject(data.subject());
            returnObj.messageData.message(data.message());
            returnObj.messageData.postId(data.postId());
            returnObj.messageData.postTitle(data.postTitle());
            returnObj.messageData.isSubjectReadoly(data.isSubjectReadoly());
        };

        return returnObj;

    }();
})(jQuery, ko, my);;