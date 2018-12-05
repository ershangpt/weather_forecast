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

    .when("/forecast/:days", {
        templateUrl: "./pages/forecast.htm",
        controller: "forecastController"
    })
});

// Service
weatherApp.service("cityService", function(){
    var self = this;
    self.cityname = "New York";
})

// Controllers
weatherApp.controller("homeController", ["$scope", "cityService", function($scope, myService){
    $scope.cityname = myService.cityname;
    $scope.$watch("cityname", function(){
        myService.cityname = $scope.cityname;
    })
    
}]);

weatherApp.controller("forecastController", ["$scope", "$resource", "$routeParams" ,"cityService", function($scope, $resource,$routeParams, myService){
    $scope.cityname = myService.cityname;
    $scope.days = $routeParams.days || 2;
    /*$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast",
    { callback: "JSON_CALLBACK"},
    { get : {method: "JSONP"} }
    );
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityname, cnt: 2, appid: "583c378201d1ff51b561de5bf4fedda5"});*/
    $scope.weatherResult = JSON.parse('{"cod":"200","message":0.0029,"cnt":5,"list":[{"dt":1544022000,"main":{"temp":284.8,"temp_min":284.731,"temp_max":284.8,"pressure":1016.43,"sea_level":1024.1,"grnd_level":1016.43,"humidity":99,"temp_kf":0.06},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":5.32,"deg":193},"rain":{"3h":0.94},"sys":{"pod":"d"},"dt_txt":"2018-12-05 15:00:00"},{"dt":1544032800,"main":{"temp":284.96,"temp_min":284.913,"temp_max":284.96,"pressure":1015.33,"sea_level":1022.78,"grnd_level":1015.33,"humidity":97,"temp_kf":0.05},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":4.37,"deg":219.501},"rain":{"3h":3.5825},"sys":{"pod":"n"},"dt_txt":"2018-12-05 18:00:00"},{"dt":1544043600,"main":{"temp":285.01,"temp_min":284.982,"temp_max":285.01,"pressure":1016.14,"sea_level":1023.7,"grnd_level":1016.14,"humidity":98,"temp_kf":0.03},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":4.31,"deg":259.502},"rain":{"3h":0.0725},"sys":{"pod":"n"},"dt_txt":"2018-12-05 21:00:00"},{"dt":1544054400,"main":{"temp":284.03,"temp_min":284.016,"temp_max":284.03,"pressure":1017.31,"sea_level":1024.85,"grnd_level":1017.31,"humidity":98,"temp_kf":0.02},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":3.91,"deg":253.503},"rain":{"3h":0.049999999999999},"sys":{"pod":"n"},"dt_txt":"2018-12-06 00:00:00"},{"dt":1544065200,"main":{"temp":283.76,"temp_min":283.76,"temp_max":283.76,"pressure":1018.5,"sea_level":1026.05,"grnd_level":1018.5,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":3.01,"deg":253.003},"rain":{"3h":0.105},"sys":{"pod":"n"},"dt_txt":"2018-12-06 03:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5073,"lon":-0.1277},"country":"GB","population":1000000}}');

    $scope.convertToFahrenheit = (degk) => Math.round((1.8 * (degk -273)) + 32);

    $scope.convertToDate = (date) => new Date(date * 1000);    
}]);
