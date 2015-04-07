var Directive = angular.module('module.directives',['module.controllers']);

Directive
    .directive('typemenu',function(){
        return {
            restrict:'E',
            transclude:true,
            template:'<div><button class="btn btn-default dropdown-toggle" type="button" ng-click="toggleMenu()">{{book.type}} '
                    + '<span class="caret"></span></button>'
                    + '<ul class="dropdown-menu" ng-show="isShow" style="display: block">'
                    + '<li ng-repeat="c in category"><a ng-click="changeMenu($index)">{{c}}</a></li>'
                    + '</ul></div>',
            scope:true,
            link:function(scope,element,attrs){
                scope.isShow = false;
                scope.category = ['node','angular','react','native']
                scope.toggleMenu = function(){
                    scope.isShow = !scope.isShow;
                }
                scope.changeMenu = function(index){
                    scope.book.type = scope.category[index];
                    this.toggleMenu();
                }
            }
        }
    });