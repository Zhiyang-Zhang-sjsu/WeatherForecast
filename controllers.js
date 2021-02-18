// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
  $scope.city = cityService.city;
  
  $scope.$watch('city', function() {
      cityService.city = $scope.city; 
  });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
  $scope.city = cityService.city;
  
  $scope.days = '8';
  if ($routeParams.days !== undefined) {
    $scope.days = (parseInt($routeParams.days) * 8).toString();
  }

  $scope.mykey = ""
  
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?");
  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, appid: $scope.mykey});
  console.log($scope.weatherResult);
  
  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273)) + 32);      
  }

  $scope.convertToDate = function(dt) { 
    return new Date(dt * 1000);  
  };
}]);
