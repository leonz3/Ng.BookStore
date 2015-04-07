var app = angular.module('app', ['ui.router', 'ngGrid', 'module.controllers', 'module.services','module.directives']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/sign');
    $stateProvider
        .state('sign', {
            url: '/sign',
            templateUrl: 'partials/sign.html',
            controller: 'signController'
        })
        .state('list', {
            url: '/:category',
            views: {
                '': {
                    templateUrl: 'partials/list.html'
                },
                'category@list': {
                    templateUrl: 'partials/category.html'
                },
                'table@list': {
                    templateUrl: 'partials/tab.html',
                    controller: 'listController'
                }
            }
        })
        .state('detail', {
            url: '/:category/{id:[0-9]{0,2}}',
            templateUrl: 'partials/detail.html',
            controller: 'detailController'
        })
        .state('create', {
            url: '/edit/new',
            templateUrl: 'partials/edit.html'
        })
        .state('update', {
            url: '/edit/:category/:id',
            templateUrl: 'partials/edit.html'
        });
});

