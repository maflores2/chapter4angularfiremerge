angular.module('App', ['ionic', 'firebase'])

///// WEATHER SERVICE FACTORY //////////////////////////////////////////////////
.factory('DSWeatherService',['$sce','$http', function($sce, $http){

    //factory allows us to specify an object to send back
    var dsweatherService = {};
    
    //DarkSky API key
    var key = "4e4bfa1c9d0ee8e8cae8d0c27a34ecbd";

    //get current rest conditions
    dsweatherService.getCurrentConditions = function(city){

        //for the API
        var url = "https://api.darksky.net/forecast/" +
                key + "/" + city.lat + "," + city.lon + "?callback=JSON_CALLBACK";
                
        console.log(url);

        //the current ionic bundle is supporting Angular 1.5.3
        //thus, the following won't work

        //var trustedurl = $sce.trustAsResourceUrl(url);
        //return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});

        return $http.jsonp(url);

    };
    
    return dsweatherService;

}])



.factory("localStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'current-weather') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('current-weather', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('current-weather');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
})
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController as wc', 
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    })
    .state('directions',{
      url: '/directions',
      templateUrl: 'views/directions/directions.html'
    });

  $urlRouterProvider.otherwise('/tour');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})