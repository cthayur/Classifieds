/// <reference path="constants.js" />
(function ($, ko, my) {

    my.model = {};

    my.model.post = function () {
        this.id = ko.observable();
        this.UserId = ko.observable();
        this.category = ko.observable();
        this.categoryId = ko.observable();
        this.title = ko.observable();
        this.price = ko.observable();
        this.location = ko.observable();
        this.description = ko.observable();
        this.gravatar = ko.observable();
        this.date = ko.observable();
        this.postHref = ko.observable();
        this.redirectToEdit = ko.observable(false);
    };

    my.model.accordion = function () {
        this.group = ko.observable();
        this.id = ko.observable();
        this.items = ko.observableArray([]);
    };

    my.model.message = function () {
        this.id = ko.observable();
        this.from = ko.observable();
        this.to = ko.observable();
        this.date = ko.observable();
        this.subject = ko.observable();
        this.message = ko.observable();
        this.postId = ko.observable();
        this.postTitle = ko.observable(false);
        this.isSubjectReadoly = ko.observable();
    };

    my.pushDataToPostModel = function (model, data, redirectToEdit) {
        model.push(new my.model.post()
                                .id(data.id)
                                .category(data.category)
                                .categoryId(data.categoryId)
                                .UserId(data.userId)
                                .title(data.title)
                                .price(data.price)
                                .location(data.location)
                                .description(data.description)
                                .gravatar(data.gravatar)
                                .date(data.date)
                                .postHref("#/viewPost/" + data.id)
                                .redirectToEdit(redirectToEdit));
                                
    };

})(jQuery, ko, my);