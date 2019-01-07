var home = angular.module('home', [
    'ngRoute',

    //@@templates
])

    .config(['$routeProvider',
        function ($routeProvider)
        {
            'use strict';
            $routeProvider.
                when('/', {
                    templateUrl: 'js/modules/index/views/index.html',
                    controller: 'IndexCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }
    ]);