var Services = angular.module('module.services',[]);

Services
    .factory('bookService',['$http',function($http){
        var Request = function(){
            return $http({
                method: 'get',
                url: '../data/book.json'
            });
        };
        return {
            getBooksByCategory:function(category,callback){
                return Request().success(function(result){
                    callback(result[category]);
                })
            },
            getBookById:function(category,id,callback){
                this.getBooksByCategory(category,function(result){
                    angular.forEach(result,function(item){
                        if(item.id === id){
                            callback(item);
                        }
                    });
                });
            }
        };
    }]);
