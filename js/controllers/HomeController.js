/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/controllers/HomeController.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

app.controller("HomeController", ['$scope',
  function($scope) {
    $scope.tagline = 'Know your worth';
    $scope.message = 'Conrgrats! You just got a new job offer, and it\'s more money than you\'ve ever seen in your life. \
      You probably know that number isn\'t the exact amount of money that goes into your account, so what is? WIM will \
      give you a more realistic estimate of what you will actually recieve, as well as what you can spend after rent \
      car payments, groceries, etc. WIM will also generate graphs, or projections, to see how much you can accumulate \
      over time if you save your money. Your first step is to fill out the form on the next page.';
    $scope.disclaimer = 'This site will not store any information entered and it is completely confidential. Estimates \
      given are just that - estimates. Averages will be used for certain tax brackets, as a 100% accurate calculation is \
      beyond the scope of this application.';
    $scope.gotoOffer = function() {
      var i = 0;
      $('.nav').children('div').each(function() {
        if (i != 1) { 
          $(this).removeClass('active');
        } else {
          $(this).addClass('active');
        }
        i++;
      });
      window.location = "#/offer";
    };
    angular.element(document).ready(function() {
      var i = 0;
      $('.nav').children('div').each(function() {
        if (i == 0) { $(this).addClass('active'); }
        i++;
      });
    });
  }
]);