var app = angular.module('app', ['ui.router', 'ngGrid', 'module.controllers']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/sign');
    $stateProvider
        .state('sign', {
            url: '/sign',
            templateUrl: 'partials/sign.html',
            controller: 'signController'
        })
        .state('list', {
            url: '/{category:[a-z]+}',
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
            url: '/:category/:id',
            templateUrl: 'partials/detail.html',
            controller: 'detailController'
        })
        .state('edit.new', {
            url: '/new',
            templateUrl:'partials/edit.html'
        })
        .state('edit.update',{
            url:'/:category/:id',
            tempalteUrl:'partials/detai.html'
        });
});

