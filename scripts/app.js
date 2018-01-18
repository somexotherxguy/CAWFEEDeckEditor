var app = angular.module('app', ['ngRoute']);

app.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'editor',
            templateUrl: 'partials/editor.html'
        })
        .otherwise('/');
}]);