var app = angular.module('app',['ui.router','ngGrid','module.controllers']);

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/sign');
    $stateProvider
        .state('sign',{
            url: '/sign',
            templateUrl: 'partials/sign.html',
            controller: 'signController'
        })
        .state('list',{
            url: '/list',
            templateUrl: 'partials/list.html',
            controller:'listController'
        });
});

