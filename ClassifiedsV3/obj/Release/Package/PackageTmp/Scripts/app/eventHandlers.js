/// <reference path="../core/_references.js" />
/// <reference path="constants.js" />
/// <reference path="models.js" />
/// <reference path="vm.editPost.js" />
/// <reference path="vm.userPosts.js" />
/// <reference path="vm.message.js" />
/// <reference path="vm.messages.js" />
/// <reference path="vm.viewPost.js" />
(function ($, ko, my) {

    var constants = my.eventHandlerConstants;

    my.genericSideNavHandler = function (callback, sideNavClassName) {

        $(sideNavClassName).removeClass(constants.active);

        $($(sideNavClassName)[0]).addClass(constants.active);
        if (callback) {
            callback();
        }
    };

    my.sideNavHandler = function (options) {
        $(options.sideNav).click(function () {
            $(options.sideNav).removeClass(constants.active);
            $(this).addClass(constants.active);
            options.callback(ko.dataFor(this));
            my.viewPostClickHandler();
        });
    };

    my.sideNavUserHandler = function (options) {

        $(options.sideNav).click(function () {
            $(options.sideNav).removeClass(constants.active);
            $(this).addClass(constants.active);

            if ($(this).attr("id") == "userPageMessages") {
                $(options.viewNameMessage).show();
                $(options.viewNamePost).hide();
                $(options.viewNameSubscription).hide();
            }
            else if ($(this).attr("id") == "userPageSubscriptions") {
                $(options.viewNameSubscription).show();
                $(options.viewNameMessage).hide();
                $(options.viewNamePost).hide();
            }
            else {
                $(options.viewNameMessage).hide();                
                $(options.viewNameSubscription).hide();
                $(options.viewNamePost).show();
            }
        });
    };

    my.subscriptionLinkHandler = function () {
        $(".subscriptionLink").click(function () {

            $(this).addClass("disabled");

            var _categoryId = $(this).attr("id");
            var _action = $(this).text() == 'Subscribe' ? 1 : 0;

            my.dataStore.updateSubscription({ categoryId: _categoryId, action: _action, element: this });
        });
    };

    my.userMessageRowHandler = function () {
        $(".messageRow").click(function () {
            var _data = ko.dataFor(this);
            my.setupMessageModal(_data, my.viewNames.userMessageModal);
            $(my.viewNames.userMessageModal).modal('show');
        });
    };

    my.viewPostClickHandler = function () {
        $(constants.articleView).off(constants.click);

        $(constants.articleView).click(function () {
            var data = ko.dataFor(this);
            my.viewPostHandler(data);
            my.setWindowHash(data.postHref());
        });
    };

    my.editPostClickHandler = function () {
        $(constants.articleEdit).off(constants.click);

        $(constants.articleEdit).click(function () {
            var data = ko.dataFor(this);
            my.editPostHandler(data, my.vm.userPosts.posts, null, my.hashes.userpage, null, my.viewNames.editpost, true);
            my.setWindowHash(my.hashes.editPost + "/" + data.id());
        });
    };

    my.topNavHandler = function () {
        $(constants.topNav).click(function () {
            $(constants.topNav).removeClass(constants.active);
            $(this).addClass(constants.active);
        });
    };

    my.editPostHandler = function (data, currentDataArray, callingsideNav, callingHash, callback, viewNameToDisplay, userOriginal) {
        my.vm.editPosts.clearSelf();
        my.vm.editPosts.updateVm(data, currentDataArray, callingsideNav, callingHash, callback);
        my.bindvm(my.vm.editPosts, viewNameToDisplay);

        my.hideAllViews();
        $(viewNameToDisplay).show();
    };

    my.viewPostHandler = function (data) {
        var messageData = new my.model.message().to(data.UserId()).from(my.loggedInUserId).postId(data.id()).postTitle(data.title());
        my.setupMessageModal(messageData, my.viewNames.messageModal);

        my.vm.viewPosts.clearSelf();
        my.vm.viewPosts.updateVm(data);
        my.bindvm(my.vm.viewPosts, my.viewNames.viewpost);

        my.hideAllViews();
        $(my.viewNames.viewpost).show();
    };

    my.setupMessageModal = function (data, modalName) {

        my.vm.readWriteMessage.clearSelf();
        my.vm.readWriteMessage.updateVm(data);
        my.bindvm(my.vm.readWriteMessage, modalName);

    };

    $(function () {
        $(".saveButton").click(function (event) {
            //event.preventDefault();
            //event.stopImmediatePropagation();
            my.vm.editPosts.savePost();
            my.genericSideNavHandler(my.vm.editPosts.callbackForCaller(), my.vm.editPosts.callingSideNavName());
            my.redirectTo(my.vm.editPosts.callingHashValue());            
            my.viewPostClickHandler();
            
        });

        $(".deleteButton").click(function (event) {
            my.vm.editPosts.deletePost();
            my.redirectTo(my.vm.editPosts.callingHashValue());
        });

        $("#viewPostmodalSave").click(function () {
            my.dataStore.sendMessage(ko.dataFor(this).messageData);
            my.vm.readWriteMessage.clearSelf();
        });

        $("#userMessageReply").click(function () {
            var data = ko.dataFor(this).messageData;
            var messageData = new my.model.message().to(data.from()).from(data.to()).postId(data.postId()).postTitle(data.postTitle()).subject("RE: " + data.subject()).isSubjectReadoly(true);

            my.vm.readWriteMessage.viewModelBound(false);
            my.setupMessageModal(messageData, my.viewNames.messageModal);
            $(my.viewNames.messageModal).modal('show');
        });

        $('#userMessageDelete').click(function () {
            var messageId = ko.dataFor(this).messageData.id();
            my.vm.userMessages.deleteMessage(messageId);
        });

        $('#DisablePostBtn').click(function () {
            my.vm.viewPosts.disablePost();
        });

        $('#LockUserBtn').click(function () {
            my.vm.viewPosts.lockUser();
        });
        
    });

})(jQuery, ko, my);