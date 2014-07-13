/// <reference path="constants.js" />
(function (my) {

    my.housingOptions = {        
        viewName: my.viewNames.housing,
        sideNav: my.sideNavNames.housing,
        hash: my.hashes.housing,
        ajaxUrl: 'api/posts/GetPostsByCategory/1',        
        category: 'Housing',
        categoryId: my.categoryIds.housing
    }

    my.electronicsOptions = {
        viewName: my.viewNames.electronics,
        sideNav: my.sideNavNames.electronics,
        hash: my.hashes.electronics,
        ajaxUrl: 'api/posts/GetPostsByCategory/2',
        category: 'Electronics',
        categoryId: my.categoryIds.electronics
    }

    my.booksOptions = {
        viewName: my.viewNames.books,
        sideNav: my.sideNavNames.books,
        hash: my.hashes.books,
        ajaxUrl: 'api/posts/GetPostsByCategory/3',
        category: 'Books',
        categoryId: my.categoryIds.books
    }

    my.homeGoodsOptions = {
        viewName: my.viewNames.homegoods,
        sideNav: my.sideNavNames.homegoods,
        hash: my.hashes.homegoods,
        ajaxUrl: 'api/posts/GetPostsByCategory/4',
        category: 'HomeGoods',
        categoryId: my.categoryIds.homegoods
    }

    my.miscellaneousOptions = {
        viewName: my.viewNames.miscellaneous,
        sideNav: my.sideNavNames.miscellaneous,
        hash: my.hashes.miscellaneous,
        ajaxUrl: 'api/posts/GetPostsByCategory/5',
        category: 'Miscellaneous',
        categoryId: my.categoryIds.miscellaneous
    }

    my.mixedBagOptions = {
        viewName: my.viewNames.mixedbag,        
        hash: my.hashes.mixedbag,
        ajaxUrl: 'api/posts/GetMixedBagData/1'
    }

    my.userMessageDataOptions = {        
        viewNameMessage: my.viewNames.userMessage,
        viewNamePost: my.viewNames.userPost,
        viewNameSubscription: my.viewNames.userSubscriptions,
        viewName: my.viewNames.userpage,
        sideNav: '.sideNavUser',
        hash: my.hashes.userpage
    }

    my.vm.housing = new my.vm.generic(my.housingOptions);
    my.vm.electronics = new my.vm.generic(my.electronicsOptions);
    my.vm.books = new my.vm.generic(my.booksOptions);
    my.vm.homegoods = new my.vm.generic(my.homeGoodsOptions);
    my.vm.miscellaneous = new my.vm.generic(my.miscellaneousOptions);

})(my);