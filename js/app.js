/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/app.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

var app = angular.module("wimApp", ['ngRoute', 'ngAnimate']);
// Set up routing
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  	.when('/', {
    	controller: 'HomeController',
    	templateUrl: 'views/home.html'
  	})
  	.when('/offer', {
    	controller: 'OfferController',
    	templateUrl: 'views/offer.html'
    })
    .when('/results', {
      controller: 'ResultsController',
      templateUrl: 'views/results.html'
    })
    .when('/projections', {
      controller: 'ProjectionsController',
      templateUrl: 'views/projections.html'
    })
  	.otherwise({
    	redirectTo: '/'
    });
    $locationProvider.hashPrefix('');
});