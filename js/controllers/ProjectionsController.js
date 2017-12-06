/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/controllers/ProjectionsController.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

app.controller("ProjectionsController", ['$scope', 'saveFormService',
function($scope, saveFormService) {
  $scope.title = 'Projections'
  $scope.user = saveFormService.getData();
  // Form submit
  $scope.submitForm = function() {
    var spanSave = $('#save-error'), spanInvest = $('#invest-error'), spanSpend = $('#spend-error'), spanAll = $('#all-error');
    var inputSave = $('input[name="save"]'), inputInvest = $('input[name="invest"]'), inputSpend = $('input[name="spend"]');
    var valid = true;
    // Check for negatives
    if (inputSave.val() < 0) {
      spanSave.removeAttr("hidden");
      valid = false;
    } else {
      spanSave.attr("hidden", true);
    }
    if (inputInvest.val() < 0) {
      spanInvest.removeAttr("hidden");
      valid = false;
    } else {
      spanInvest.attr("hidden", true);
    }
    if (inputSpend.val() < 0) {
      spanSpend.removeAttr("hidden");
      valid = false;
    } else {
      spanSpend.attr("hidden", true);
    }
    // Check to see if they add up to 100
    if (parseInt(inputSave.val()) + parseInt(inputInvest.val()) + parseInt(inputSpend.val()) != 100) {
      spanAll.removeAttr("hidden");
      valid = false;
    } else {
      spanAll.attr("hidden", true);
    }
    // Check if valid
    if (valid) {
      $scope.user.projections.saveRatio = parseInt(inputSave.val()) / 100;
      $scope.user.projections.investRatio = parseInt(inputInvest.val()) / 100;
      $scope.user.projections.spendRatio = parseInt(inputSpend.val()) / 100;
      $scope.makeProjections();
      $scope.makePiechart();
    }
  };
  // Make projections
  $scope.makeProjections = function() {
    // init
    if (!$scope.user.projections) {
      $scope.user.projections = {
        "saveRatio": .5,
        "investRatio": .3,
        "spendRatio": .2,
      }
    }
    // Update values
    var remainder = $scope.user.results.remainder;
    $scope.user.projections.save = Math.ceil(remainder * $scope.user.projections.saveRatio);
    $scope.user.projections.invest = Math.ceil(remainder * $scope.user.projections.investRatio);
    $scope.user.projections.spend = Math.ceil(remainder * $scope.user.projections.spendRatio);
  };
  // Make the pie chart
  $scope.makePiechart = function() {
    /* Snippet modified, but was referenced by https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-3-adding-a-legend.html */
    $('#chart').html("");
    var dataset = [
      { label: 'Save', count: $scope.user.projections.save },
      { label: 'Invest', count: $scope.user.projections.invest },
      { label: 'Spend', count: $scope.user.projections.spend },
    ];
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);
    var pie = d3.pie()
      .value(function(d) { return d.count; })
      .sort(null);
    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });
    var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });
  }
  // On ready
  angular.element(document).ready(function() {
    if (!$scope.user.salary) { window.location = "#/"; }
    $('input[name="save"]').val("50");
    $('input[name="invest"]').val("30");
    $('input[name="spend"]').val("20");
    $scope.makeProjections();
    $scope.makePiechart();
    $scope.$apply();
  });
}
]);