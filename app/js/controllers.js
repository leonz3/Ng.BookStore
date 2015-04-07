var Controllers = angular.module('module.controllers',['module.services']);

Controllers
    .controller('signController',['$scope','$http','$state',function($scope,$http,$state){
        $scope.isSignIn = true;
        $scope.ToggleSign = function(){
            this.isSignIn = !this.isSignIn;
        };
        $scope.SignIn = function(){
            $http.get('../data/user.json').success(function(data){
                angular.forEach(data,function(item){
                    if($scope.name === item.name){
                        if($scope.password === item.password){
                            $state.go('list',{category:'all'});
                            return ;
                        }else{
                            console.log('password is error');
                        }
                    }
                });
            });
        };
        $scope.SignUp = function(){
            if($scope.password !== $scope.repeatPassword){
                console.log('the repeat password is not correct');
                return;
            }
            $state.go('list',{category:'all'});
        };
    }])
    .controller('listController',['$scope','$http','$state','$stateParams','bookService',function($scope,$http,$state,$stateParams,bookService){
        var _category = $stateParams.category;
        $scope.filterOptions = {
            filterText: '',
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 10,
            currentPage: 1
        };
        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.books = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    bookService.getBooksByCategory(_category,function(result){
                        data = result.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    bookService.getBooksByCategory(_category,function(result){
                        $scope.setPagingData(result,page,pageSize);
                    })
                    //$http.get('../data/book.json').success(function (largeLoad) {
                    //    $scope.setPagingData(largeLoad[_category],page,pageSize);
                    //});
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'books',
            //rowTemplate:'<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">'
            //+ '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>'
            //+ '<div ng-cell></div></div></div>',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            //enablePinning: true,
            columnDefs:[{
                field:'index',
                displayName:'序号',
                width:50,
                sortable:false
            },{
                field:'name',
                displayName:'书名'
            },{
                field:'author',
                displayName:'作者',
                enableEdit:true,
                width:100
            },{
                field:'publishTime',
                displayName: '发行时间',
                width:120
            },{
                field:'price',
                displayName: '价格',
                width:100
            },{
                field:'id',
                displayName:'操作',
                pinnable:false,
                sortable:false,
                width:80,
                cellTemplate:'<a ui-sref="detail({category:row.getProperty(' + "'type'" + '),id:row.getProperty(col.field)})">详情</a> '
                            + '<a ui-sref="update({category:row.getProperty(' + "'type'" + '),id:row.getProperty(col.field)})">编辑</a>'
            }],
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions
        };

    }])
    .controller('detailController',['$scope','$http','$state','$stateParams','bookService',function($scope,$http,$state,$stateParams,bookService){
        bookService.getBookById($stateParams.category,$stateParams.id,function(result){
            $scope.book = result;
        })
        //$http.get('../data/book.json').success(function(result){
        //    var books = result[_type];
        //    angular.forEach(books,function(item){
        //        if(item.id === _id){
        //            $scope.book = item;
        //        }
        //    });
        //});
    }])
    .controller('editController',['$scope','$http','$state','$stateParams','bookService',function($scope,$http,$state,$stateParams,bookService){
        var _category = $stateParams.category,
            _id = $stateParams.id;
        if(_category && _id){
            $scope.title = '编辑书籍';
            bookService.getBookById(_category,_id,function(result){
                $scope.book = result;
            });
        }else{
            $scope.title = '新增书籍';
            $scope.book = {};
        }
        $scope.submit = function(){
            console.log($scope.book);
            //$http.post('',$scope.book).success(function(){});
        }
    }]);