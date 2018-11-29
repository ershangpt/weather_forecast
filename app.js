// MODULE
var weatherApp = angular.module("weatherApp",["ngRoute","ngResource"]);

// Routes
weatherApp.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "./pages/home.htm",
        controller: "homeController"
    })

    .when("/forecast", {
        templateUrl: "./pages/forecast.htm",
        controller: "forecastController"
    })
});

// Service
weatherApp.service("cityService", function(){
    var self = this;
    self.cityname = "GKP";
})

// Controllers
weatherApp.controller("homeController", ["$scope", "cityService", function($scope, myService){
    $scope.cityname = myService.cityname;
    $scope.$watch("cityname", function(){
        myService.cityname = $scope.cityname;
    })
    
}]);

weatherApp.controller("forecastController", ["$scope", "$resource" ,"cityService", function($scope, $resource, myService){
    $scope.cityname = myService.cityname;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast",
    { callback: "JSON_CALLBACK"},
    { get : {method: "JSONP"} }
    );
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityname, cnt: 2, appid: "b6907d289e10d714a6e88b30761fae22"});
    console.log($scope.weatherResult)
}]);
