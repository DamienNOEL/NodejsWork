home.controller('IndexCtrl', ['$scope', '$timeout', '$location', '$window', '$http', '$routeParams', 
        function ($scope, $timeout, $location, $window, $http, $routeParams)
        {
            'use strict';

            angular.extend($scope,
                {
                    view: {
                        myVar: 'foo',
                        newTodo: {
                            name: '',
                            desc: ''
                        }
                    },

                    submit: function ()
                    {
                        if(!$scope.view.newTodo.name)
                        {
                            alert('name is empty');
                            return;
                        }
                        if(!$scope.view.newTodo.desc)
                        {
                            alert('desc is empty');
                            return;
                        }

                        var params = {
                            newTodo: $scope.view.newTodo
                        };

                        $http.post('/todos', params).
                            success(function (data, status)
                            {
                                if (status !== 200)
                                {
                                    alert('Error during request');
                                    return;
                                }

                                if(!data || !data.newModel)
                                {
                                    alert('no data receive from server');
                                    return;
                                }

                                alert('name : ' + data.newModel.name + ', desc : ' + data.newModel.desc);
                            }).
                            error(function (data, status)
                            {
                               alert('Error with network connection');
                            });                  
                    },
                }
            );        
        }
    ]
);