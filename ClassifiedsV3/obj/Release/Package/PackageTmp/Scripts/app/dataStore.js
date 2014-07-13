/// <reference path="constants.js" />

(function ($, my) {

    my.dataStore = function () {

        var returnObj = {}

        returnObj.ajaxRequest = function (options) {

            if (options.vm && options.vm.items && options.vm.items().length > 0) {
                options.data = undefined;
                options.callback(options);
            }
            else {
                $.ajax({
                    url: options.ajaxUrl,
                    type: options.ajaxMethod || 'GET',
                    dataType: options.dataType || 'json',
                    async: options.async || true,
                    cache: false,
                    contentType: 'application/json',
                    data: options.data || ''
                }).done(function (data) {
                    options.data = data;
                    if (options.callback)
                        options.callback(options);
                });
            }
        };

        returnObj.getNavBarItems = function () {
            return my.navBarItems;
        };

        returnObj.sendMessage = function (messageData) {
            returnObj.ajaxRequest({
                ajaxMethod: "post",
                ajaxUrl: "/api/messages",
                data: JSON.stringify(returnObj.getMessageModelFromVmData(messageData)),
                callback: function (options) {
                    toastr.success('Your message has been sent');
                }
            });
        };

        returnObj.deleteMessage = function (messageId) {
            returnObj.ajaxRequest({
                ajaxMethod: "delete",
                ajaxUrl: "/api/messages/" + messageId,
                async: false,
                callback: function (options) {
                    toastr.success('This message has been deleted');
                }
            });
        };

        returnObj.savePost = function (postData) {
            returnObj.ajaxRequest({
                ajaxMethod: "post",
                ajaxUrl: "/api/posts",
                data: JSON.stringify(returnObj.getPostModelFromVmData(postData)),
                async: false,
                callback: function (options) {
                    postData.id(options.data.id);
                    postData.date(options.data.date);
                    postData.postHref("#/viewPost/" + options.data.id);
                    toastr.success('Your Data Has Been Saved');
                }
            });
        };

        returnObj.updatePost = function (postData) {
            returnObj.ajaxRequest({
                ajaxMethod: "put",
                ajaxUrl: "/api/posts",
                data: JSON.stringify(returnObj.getPostModelFromVmData(postData)),
                async: false,
                callback: function (options) {
                    toastr.success('Your Changes Have Been Saved');
                }
            });
        };

        returnObj.disablePost = function (postId) {
            returnObj.ajaxRequest({
                ajaxMethod: "put",
                ajaxUrl: "/api/posts/DisablePost/" + postId,                
                async: false,
                callback: function (options) {
                    toastr.success('This post has been disabled');
                }
            });
        };

        returnObj.deletePost = function (postId) {
            returnObj.ajaxRequest({
                ajaxMethod: "delete",
                ajaxUrl: "/api/posts/" + postId,
                async: false,
                callback: function (options) {
                    toastr.success('Your post has been deleted');
                }
            });
        };

        returnObj.updateSubscription = function (data) {
            returnObj.ajaxRequest({
                ajaxMethod: "put",
                ajaxUrl: "/api/subscriptions",
                data: JSON.stringify({ CategoryId: data.categoryId, Action: data.action, UserId: my.loggedInUserId }),
                async: false,
                callback: function (options) {                                       
                    ko.dataFor(data.element).loadData(options.data);
                    $(data.element).removeClass("disabled");
                    toastr.success('Your Changes Have Been Saved');
                }
            });            
        };

        returnObj.getPostModelFromVmData = function (data) {
            return {
                id: data.id(),
                UserId: data.UserId(),
                category: data.category(),
                categoryId: data.categoryId(),
                title: data.title(),
                price: data.price(),
                location: data.location(),
                description: data.description()
            };
        };

        returnObj.getMessageModelFromVmData = function (data) {
            return {
                id: data.id(),
                from: data.from(),
                to: data.to(),
                subject: data.subject(),
                message: data.message(),
                postId: data.postId(),
                postTitle: data.postTitle()
            };
        };

        returnObj.getUserInfo = function (userId) {
            var _data;

            $.ajax({
                url: 'api/users/GetUserInfo/' + userId,
                async: false
            }).done(function (data) {
                _data = data;
            });

            return _data;
        };

        returnObj.lockUser = function (userId) {
            returnObj.ajaxRequest({
                ajaxMethod: "put",
                ajaxUrl: "/api/Users/LockUser/" + userId,
                async: false,
                callback: function (options) {
                    toastr.success('This user has been locked');
                }
            });
        };

        return returnObj;

    }();

})(jQuery, my);
