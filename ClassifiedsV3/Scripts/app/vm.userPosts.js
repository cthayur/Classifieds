/// <reference path="constants.js" />
/// <reference path="eventHandlers.js" />
/// <reference path="models.js" />
/// <reference path="vm.editPost.js" />
(function ($, ko, my) {

    my.vm.userPosts = function () {
        var returnObj = {}

        returnObj.posts = ko.observableArray([]);

        returnObj.viewModelBound = ko.observable(false);

        returnObj.updatePost = function (post) {

            var postToUpdate = ko.utils.arrayFirst(returnObj.posts(), function (item) {
                return item.id() == post.id();
            });

            postToUpdate.id(post.id())
                            .UserId(post.UserId())
                            .title(post.title())
                            .price(post.price())
                            .location(post.location())
                            .description(post.description());
        };

        returnObj.deletePost = function (id) {
            returnObj.posts.remove(function (item) {
                return item.id() == id;
            });
        };

        returnObj.loadData = function (data) {
            if (returnObj.posts().length == 0) {
                $.each(data, function (i, p) {
                    my.pushDataToPostModel(returnObj.posts, p, true);
                });
            }
        };

        return returnObj;
    }();
    
})(jQuery, ko, my);