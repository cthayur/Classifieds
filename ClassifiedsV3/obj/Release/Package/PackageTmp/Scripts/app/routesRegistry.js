/// <reference path="constants.js" />
/// <reference path="vm.bindviewmodels.js" />
/// <reference path="dataStore.js" />
/// <reference path="setUpViewModels.js" />
(function ($, my) {

    Path.map(my.hashes.mixedbag).to(function () {
        my.hideView();
        my.mixedBagOptions.callback = my.bindViewModels.mixedBagCallBack;
        my.mixedBagOptions.vm = my.vm.mixedBag;
        my.dataStore.ajaxRequest(my.mixedBagOptions);
    });

    Path.map(my.hashes.housing).to(function () {
        my.hideView();
        my.housingOptions.callback = my.bindViewModels.bindVmCallBack;
        my.housingOptions.vm = my.vm.housing;
        my.dataStore.ajaxRequest(my.housingOptions);
    });

    Path.map(my.hashes.electronics).to(function () {
        my.hideView();
        my.electronicsOptions.callback = my.bindViewModels.bindVmCallBack;
        my.electronicsOptions.vm = my.vm.electronics;
        my.dataStore.ajaxRequest(my.electronicsOptions);
    });

    Path.map(my.hashes.books).to(function () {
        my.hideView();
        my.booksOptions.callback = my.bindViewModels.bindVmCallBack;
        my.booksOptions.vm = my.vm.books;
        my.dataStore.ajaxRequest(my.booksOptions);
    });

    Path.map(my.hashes.homegoods).to(function () {
        my.hideView();
        my.homeGoodsOptions.callback = my.bindViewModels.bindVmCallBack;
        my.homeGoodsOptions.vm = my.vm.homegoods;
        my.dataStore.ajaxRequest(my.homeGoodsOptions);
    });

    Path.map(my.hashes.miscellaneous).to(function () {
        my.hideView();
        my.miscellaneousOptions.callback = my.bindViewModels.bindVmCallBack;
        my.miscellaneousOptions.vm = my.vm.miscellaneous;
        my.dataStore.ajaxRequest(my.miscellaneousOptions);
    });

    Path.map(my.hashes.userpage).to(function () {
        my.hideView();
        my.userMessageDataOptions.callback = my.bindViewModels.userMessageDataCallBack;
        my.userMessageDataOptions.vm = my.vm.userMessages;
        my.userMessageDataOptions.ajaxUrl = 'api/Messages/' + my.loggedInUserId;
        my.dataStore.ajaxRequest(my.userMessageDataOptions);
    });

    Path.map(my.hashes.viewPost + '/:param').to(function () {
    });

    Path.map(my.hashes.editPost + '/:param').to(function () {
    });

    Path.map(my.hashes.newPost + '/:param').to(function () {
    });

    my.activateRouteListner = function () { Path.listen(); };

})(jQuery, my);

$(function () {
    Path.listen();
});