/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/controllers/NavController.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

app.controller("NavController", ['$scope',
  function($scope) {
    $scope.titles = ["Introduction", "Offer Info", "Results", "Projections"];
    $scope.urls = ['#/', '#/offer', '#/results', '#/projections']
    $scope.changeView = function($event) {
      var element = $($event.currentTarget);
      // Make sure it isn't disabled
      if (!element.hasClass('disabled')) {
        // Change nav bar items
        $('.nav').children('div').each(function() {
          $(this).removeClass('active');
        });
        element.addClass('active');
        var html = element.find('h6').html();
        window.location = $scope.urls[$scope.titles.indexOf(html)];
      }
    }
  }
]);