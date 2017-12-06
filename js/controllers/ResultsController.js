/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/controllers/ResultsController.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

app.controller("ResultsController", ['$scope', 'saveFormService',
function($scope, saveFormService) {
  $scope.title = 'Results'
  $scope.user = saveFormService.getData();
  // Calculate federal income tax
  $scope.getFederalTax = function() {
    var result = 0, salary = $scope.user.salary, bracket = -1,
      taxRates = [.1, .15, .25, .28, .33, .35, .396], taxDiffs = [], taxBases = [];
    // Set brackets
    if ($scope.user.fillingStatus == "single") {
      taxDiffs = [9225, 28225, 53300, 98550, 222200, 1700, salary - 413200];
      taxBases = [0, 9225, 37450, 90750, 189300, 411500, 413200];
    } else {
      taxDiffs = [18450, 56450, 76300, 79250, 181050, 53350, salary - 464850];
      taxBases = [0, 18450, 74900, 151200, 230450, 411500, 464860];
    }
    // Find out what bracket they're in
    if (salary < 9225) { bracket = 1; }
    else if (salary < 37450) { bracket = 2; }
    else if (salary < 90750) { bracket = 3; }
    else if (salary < 189300) { bracket = 4; }
    else if (salary < 411500) { bracket = 5; }
    else if (salary < 413200) { bracket = 6; }
    else { bracket = 7; }
    // Sum up rates from brackets
    for (var i = 0; i < bracket; i++) {
      if (i == bracket - 1) {
        result += (salary - taxBases[i]) * taxRates[i];
      } else {
        result += taxDiffs[i] * taxRates[i];
      }
    }
    result *= .86;
    $scope.user.results = {};
    $scope.user.results.federal = Math.ceil(result);
  }
  $scope.getFicaTax = function() {
    var ficaRate = .0765;
    $scope.user.results.fica = Math.ceil($scope.user.salary * ficaRate);
  }
  // Calculate state income tax
  $scope.getStateTax = function() {
    var taxRates = {
      "AK": 0,
      "AL": .05,
      "AR": .069,
      "AZ": .0454,
      "CA": .133,
      "CO": .0463,
      "CT": .0699,
      "DC": .0895,
      "DE": .066,
      "FL": 0,
      "GA": .06,
      "HI": .0825,
      "IA": .0898,
      "ID": .074,
      "IL": .0495,
      "IN": .0323,
      "KS": .052,
      "KY": .06,
      "LA": .06,
      "MA": .051,
      "MD": .0575,
      "ME": .0715,
      "MI": .0425,
      "MN": .0985,
      "MO": .06,
      "MS": .05,
      "MT": .069,
      "NC": .05499,
      "ND": .029,
      "NE": .0684,
      "NH": .05,
      "NJ": .0897,
      "NM": .049,
      "NV": 0,
      "NY": .0882,
      "OH": .04997, 
      "OK": .05,
      "OR": .099,
      "PA": .0307,
      "RI": .0599,
      "SC": .07,
      "SD": 0,
      "TN": .05,
      "TX": 0,
      "UT": .05,
      "VA": .0575,
      "VT": .0895,
      "WA": 0,
      "WI": .0765,
      "WV": .065,
      "WY": 0
    };
    $scope.user.results.state = Math.ceil($scope.user.salary * taxRates[$scope.user.state]);
  };
  // Calculate local tax if applicable
  $scope.getLocalTax = function() {
    var taxRates = {
      "AL": .0007,
      "DE": .0016,
      "IN": .00245,
      "IA": .00073,
      "KY": .00759,
      "MD": .01547,
      "MI": .0013,
      "NY": .001005,
      "OH": .001006,
      "PA": .00772
    };
    if (taxRates[$scope.user.state] != null) {
      $scope.user.results.local = Math.ceil(taxRates[$scope.user.state] * $scope.user.salary);
    } else {
      $scope.user.results.local = 0;
    }
  };
  // Calculate paycheck amount per pay period
  $scope.getPaycheck = function() {
    var result = $scope.user.salary, div = -1;
    // Deduct retirement
    $scope.user.results.retirementAmount = result * ($scope.user.retirement / 100);
    if ($scope.user.retirement) result -= $scope.user.results.retirementAmount;
    else $scope.user.results.retirementAmount = 0;
    // Deduct healthcare and dental
    if ($scope.user.healthcare) {
      if ($scope.user.paymentFrequency == "weekly") {
        $scope.user.results.healthcareAmount = $scope.user.healthcare * 52;
        result -= $scope.user.results.healthcareAmount;
      } else if ($scope.user.paymentFrequency == "biweekly") {
        $scope.user.results.healthcareAmount = $scope.user.healthcare * 26;
        result -= $scope.user.results.healthcareAmount;
      } else if ($scope.user.paymentFrequency == "monthly") {
        $scope.user.results.healthcareAmount = $scope.user.healthcare * 12;
        result -= $scope.user.results.healthcareAmount;
      }
    } else {
      $scope.user.results.healthcareAmount = 0;
    }
    if ($scope.user.dental) {
      if ($scope.user.paymentFrequency == "weekly") {
        $scope.user.results.dentalAmount = $scope.user.dental * 52;
        result -= $scope.user.results.dentalAmount;
      } else if ($scope.user.paymentFrequency == "biweekly") {
        $scope.user.results.dentalAmount = $scope.user.dental * 26;
        result -= $scope.user.results.dentalAmount;
      } else if ($scope.user.paymentFrequency == "monthly") {
        $scope.user.results.dentalAmount = $scope.user.dental * 12;
        result -= $scope.user.results.dentalAmount;
      }
    } else {
      $scope.user.results.dentalAmount = 0;
    }
    // Deduct all taxes
    result -= ($scope.user.results.federal + $scope.user.results.fica +
      $scope.user.results.state + $scope.user.results.local);
    if ($scope.user.paymentFrequency == "weekly") {
      result /= 52;
    } else if ($scope.user.paymentFrequency == "biweekly") {
      result /= 26;
    } else if ($scope.user.paymentFrequency == "monthly") {
      result /= 12;
    }
    $scope.user.results.paycheck = Math.ceil(result);
  };
  // Get regular payments
  $scope.getRegularPayments = function() {
    // Student loans
    if ($scope.user.studentLoanBalance) {
      $scope.user.results.studentLoanAmount = $scope.user.studentLoanBalance * 12; 
    } else {
      $scope.user.results.studentLoanAmount = 0;
    }
    // Rent
    if ($scope.user.rent) {
      $scope.user.results.rentAmount = $scope.user.rent * 12; 
    } else {
      $scope.user.results.rentAmount = 0;
    }
    // Utilities
    if ($scope.user.utilities) {
      $scope.user.results.utilitiesAmount = $scope.user.utilities * 12; 
    } else {
      $scope.user.results.utilitiesAmount = 0;
    }
    // Car
    if ($scope.user.car) {
      $scope.user.results.carAmount = $scope.user.car * 12; 
    } else {
      $scope.user.results.carAmount = 0;
    }
    // Groceries
    if ($scope.user.groceries) {
      $scope.user.results.groceriesAmount = $scope.user.groceries * 12; 
    } else {
      $scope.user.results.groceriesAmount = 0;
    }
  }
  // Get the leftover cash
  $scope.getRemainder = function() {
    $scope.user.results.remainder = ($scope.user.salary - $scope.user.results.federal - $scope.user.results.fica - $scope.user.results.state - $scope.user.results.local - $scope.user.results.studentLoanAmount - $scope.user.results.rentAmount - $scope.user.results.utilitiesAmount - $scope.user.results.carAmount - $scope.user.results.groceriesAmount - $scope.user.results.retirementAmount - $scope.user.results.healthcareAmount - $scope.user.results.dentalAmount); 
  }
  // Calculate rest of payments
  $scope.getResults = function() {
    $scope.getFederalTax();
    $scope.getFicaTax();
    $scope.getStateTax();
    $scope.getLocalTax();
    $scope.getRegularPayments();
    $scope.getPaycheck();
    $scope.getRemainder();
  };
  $scope.generateSankeyJson = function() {
    $scope.sankeyJson = {};
    var nodes = [{"name": "Salary"}], links = [], source = 1, target = 2;
    // Taxes
    nodes.push({"name": "Taxes"});
    links.push({"source": 0, "target": 1, "value": $scope.user.results.federal + $scope.user.results.state + $scope.user.results.fica + $scope.user.results.local});
    nodes.push({"name": "Federal"});
    if ($scope.user.results.federal != 0) { links.push({"source": source, "target": target, "value": $scope.user.results.federal}); } 
    else { links.push({"source": source, "target": target, "value": 1}); }
    target++;
    nodes.push({"name": "State"});
    if ($scope.user.results.state != 0) { links.push({"source": source, "target": target, "value": $scope.user.results.state}); } 
    else { links.push({"source": source, "target": target, "value": 1}); }
    target++;
    nodes.push({"name": "FICA"});
    if ($scope.user.results.fica != 0) { links.push({"source": source, "target": target, "value": $scope.user.results.fica}); } 
    else { links.push({"source": source, "target": target, "value": 1}); }
    target++;
    nodes.push({"name": "Local"});
    if ($scope.user.results.local != 0) { links.push({"source": source, "target": target, "value": $scope.user.results.local}); } 
    else { links.push({"source": source, "target": target, "value": 1}); }
    target++;
    source = target;
    // Voluntary Contributions
    if ($scope.user.results.healthcareAmount + $scope.user.results.dentalAmount + $scope.user.results.retirementAmount != 0) {
      nodes.push({"name": "Voluntary Contributions"});
      links.push({"source": 0, "target": target, "value": $scope.user.results.healthcareAmount + $scope.user.results.dentalAmount + $scope.user.results.retirementAmount});
      target++;
      nodes.push({"name": "Healthcare"});
      if ($scope.user.results.healthcareAmount != 0) { links.push({"source": 6, "target": target, "value": $scope.user.results.healthcareAmount}); }
      else { links.push({"source": 6, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Dental"});
      if ($scope.user.results.dentalAmount != 0) { links.push({"source": 6, "target": target, "value": $scope.user.results.dentalAmount}); }
      else { links.push({"source": 6, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Retirement"});
      if ($scope.user.results.retirementAmount != 0) { links.push({"source": 6, "target": target, "value": $scope.user.results.retirementAmount}); }
      else { links.push({"source": 6, "target": target, "value": 1}); }
      target++;
      source = target;
    }
    // Regular Payments
    if ($scope.user.results.studentLoanAmount + $scope.user.results.rentAmount + $scope.user.results.utilitiesAmount + $scope.user.results.carAmount + $scope.user.results.groceriesAmount != 0) {
      nodes.push({"name": "Regular Payments"});
      links.push({"source": 0, "target": 10, "value": $scope.user.results.studentLoanAmount + $scope.user.results.rentAmount + $scope.user.results.utilitiesAmount + $scope.user.results.carAmount + $scope.user.results.groceriesAmount});
      target++;
      nodes.push({"name": "Student Loans"});
      if ($scope.user.results.studentLoanAmount != 0) { links.push({"source": 10, "target": target, "value": $scope.user.results.studentLoanAmount}); }
      else { links.push({"source": 10, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Rent"});
      if ($scope.user.results.rentAmount != 0) { links.push({"source": 10, "target": target, "value": $scope.user.results.rentAmount}); }
      else { links.push({"source": 10, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Utilities"});
      if ($scope.user.results.utilitiesAmount != 0) { links.push({"source": 10, "target": target, "value": $scope.user.results.utilitiesAmount}); }
      else { links.push({"source": 10, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Car Payments"});
      if ($scope.user.results.carAmount != 0) { links.push({"source": 10, "target": target, "value": $scope.user.results.carAmount}); }
      else { links.push({"source": 10, "target": target, "value": 1}); }
      target++;
      nodes.push({"name": "Groceries"});
      if ($scope.user.results.groceriesAmount != 0) { links.push({"source": 10, "target": target, "value": $scope.user.results.groceriesAmount}); }
      else { links.push({"source": 10, "target": target, "value": 1}); }
      target++;
      source = target;
    }
    // Remainder
    nodes.push({"name": "Remainder"});
    links.push({"source": 0, "target": nodes.length - 1, "value": $scope.user.results.remainder});
    $scope.sankeyJson.nodes = nodes;
    $scope.sankeyJson.links = links;
  }
  // Make graph
  $scope.makeSankey = function() {
    /* Snippet modified, but referenced from https://bl.ocks.org/mbostock/ca9a0bb7ba204d12974bca90acc507c0 */
    $scope.generateSankeyJson();
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var formatNumber = d3.format(",.0f"),
        format = function(d) { return "$" + formatNumber(d); },
        color = d3.scaleOrdinal(d3.schemeCategory10);

    var sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 1, height - 6]]);

    var link = svg.append("g")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
      .selectAll("path");

    var node = svg.append("g")
        .attr("class", "nodes")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g");

    sankey($scope.sankeyJson);

    link = link
      .data($scope.sankeyJson.links)
      .enter().append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke-width", function(d) { return Math.max(1, d.width); });

    link.append("title")
        .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    node = node
      .data($scope.sankeyJson.nodes)
      .enter().append("g");

    node.append("rect")
        .attr("x", function(d) { return d.x0; })
        .attr("y", function(d) { return d.y0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
        .attr("stroke", "#000");

    node.append("text")
        .attr("x", function(d) { return d.x0 - 6; })
        .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x0 < width / 2; })
        .attr("x", function(d) { return d.x1 + 6; })
        .attr("text-anchor", "start");

    node.append("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

  }
  $scope.gotoProjections = function() {
    var i = 0;
    $('.nav').children('div').each(function() {
      if (i != 3) { 
        $(this).removeClass('active');
      } else {
        $(this).removeClass('disabled');
        $(this).addClass('active');
      }
      i++;
    });
    saveFormService.setData($scope.user);
    window.location = "#/projections";
  }
  // On ready
  angular.element(document).ready(function() {
    // See if we have the info we need, if not reroute them
    if (!$scope.user.salary) { window.location = "#/"; }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $scope.getResults();
    $scope.$apply();
    $scope.makeSankey();
  });
}
]);