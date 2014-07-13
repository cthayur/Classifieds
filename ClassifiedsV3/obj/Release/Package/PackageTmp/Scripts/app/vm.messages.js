/// <reference path="constants.js" />
/// <reference path="models.js" />
(function ($, ko, my) {

    my.vm.userMessages = function () {

        var returnObj = {}

        returnObj.messages = ko.observableArray([]);

        returnObj.viewModelBound = ko.observable(false);

        returnObj.deleteMessage = function (messageId) {

            returnObj.messages.remove(function (item) {
                return item.id() == messageId;
            });

            my.dataStore.deleteMessage(messageId);
        };

        returnObj.loadData = function (data) {

            if (returnObj.messages().length == 0) {
                $.each(data, function (i, p) {
                    returnObj.messages.push(new my.model.message()
                                            .id(p.id)
                                            .from(p.from)
                                            .to(p.to)
                                            .date(p.date)
                                            .subject(p.subject)
                                            .message(p.message)
                                            .postId(p.postId)
                                            .postTitle(p.postTitle));

                });
            }
        };

        return returnObj;
    }();
})(jQuery, ko, my);;