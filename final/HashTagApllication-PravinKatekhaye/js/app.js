
// app.js
(function () {
// /twitterApp is dependent on the twitterApp.services module
    angular.module('twitterApp', ['ngRoute', 'ngSanitize', 'twitterApp.services'])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl:'LoginPage.html',
                         controller:'LoginController'
						 
                    })
                    .when('/home', {
                        templateUrl: 'Home.html',
                        controller : 'HomeController'
			
                    })
                    .when('/trend', {
                        templateUrl: 'TopTrend.html',
                        controller : 'TopTrendController'
                    })
                    .when('/favoritehashtag', {
                        templateUrl: 'FavoriteHashTag.html',
                        controller : 'FavoriteHashTagController'
                    })
            }]);
 })();

