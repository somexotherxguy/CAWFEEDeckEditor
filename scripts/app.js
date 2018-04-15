var app = angular.module('app', ['ngRoute']);

app.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'editor',
            templateUrl: 'partials/editor.html'
        })
        .otherwise('/');
}]);

app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        //This is to stop the image from being loaded if nothing is selected there
        if (string === "images/moveicons/.png"){
            return null;
        }
        return string.replace(/[\s]/g, '');
    };
}]);