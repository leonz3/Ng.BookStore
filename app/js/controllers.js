var Controllers = angular.module('module.controllers',[]);

Controllers
    .controller('signController',['$scope','$http',function($scope,$http){
        $scope.isSignIn = true;
        $scope.ToggleSign = function(){
            this.isSignIn = !this.isSignIn;
        };
        $scope.SignIn = function(){
            $http.get('../data/user.json').success(function(data){
                angular.forEach(data,function(item){
                    if($scope.name === item.name){
                        if($scope.password === item.password){
                            location.href = '/#/list';
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
            location.href = '/#/list';
        };
    }])
    .controller('listController',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 10,
            currentPage: 1
        };
        $scope.setPagingData = function(data, page, pageSize){
            //var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            //$scope.myData = pagedData;
            //$scope.totalServerItems = data.length;
            //if (!$scope.$$phase) {
            //    $scope.$apply();
            //}
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('../data/book.json').success(function (result) {
                        console.log(result)
                        var largeLoad = result.all;
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get('../data/book.json').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'book',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            enablePinning: true,
            rowTemplate:'<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">'
                + '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>'
                + '<div ng-cell></div></div></div>',
            columnDefs:[{
                field:'index',
                displayName:'序号',
                width:60,
                sortable:false
            },{
                field:'name',
                displayName:'书名',
                enableEdit:true
            },{
                field:'author',
                displayName:'作者',
                enableEdit:true,
                width:120
            },{
                field:'publishTime',
                displayName: '发行时间',
                enableEdit:true,
                width:120
            },{
                field:'price',
                displayName: '价格',
                enableEdit:true,
                width:120
            },{
                field:'id',
                displayName:'操作',
                enableEdit:false,
                pinnable:false,
                sortable:false,
                cellTempale:'<a ui-sref="bookdetail({bookId:row.getProperty(col.field)})"></a>'
            }]
        };

    }])
    .controller('detailController',['$scope',function(){

    }]);