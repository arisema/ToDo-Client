

// Config
angular.module('toDo')
.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

// Restangular
    RestangularProvider.setBaseUrl('http://localhost:3000/api');

//  Routes
    $urlRouterProvider.otherwise('/');

    $stateProvider

        // States and nested views
        .state('home', {
            url: '/',
            templateUrl: 'src/html/parHomeP.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'src/html/parAbout.html'
        });

});
