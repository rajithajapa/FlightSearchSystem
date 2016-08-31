'use strict';

var flightApp= angular.module('flightApp', ['ngRoute','core', 'flightDetail','flightList']);
flightApp. config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/flights', {
          template: '<flight-list></flight-list>'
        }).
        when('/flights/:flightId', {
          template: '<flight-detail></flight-detail>'
        }).
        otherwise('/flights');
    }
  ]);
// factory
angular.module('core', ['core.flight']);
var app= angular.module('core.flight', ['ngResource']);
app.factory('Flight', ['$resource',function($resource) {
      return $resource('jsondata/:flightId.json', {}, {
        query: {
          method: 'GET',
          params: {flightId: 'flights'},
          isArray: true
        }
      });
    }
  ]);
 // module for search page 
var myApp= angular.module('flightList', ['core.flight']); // dependencies 
myApp.component('flightList', {
    templateUrl: 'views/flight-list.template.html',
    controller: ['Flight', 
    function FlightListController(Flight) {
      }
    ]
  });
   //module for list page
var flightApp=angular.module('flightDetail', [ 'ngRoute', 'core.flight']);
flightApp.component('flightDetail', {
    templateUrl: 'views/flight-detail.template.html',
    controller: ['$routeParams', 'Flight', 
    function FlightDetailController($routeParams, Flight) {
        var self = this;
        self.data = Flight.get({flightId: $routeParams.flightId}, function(data) {
        });

      }
    ]
  });