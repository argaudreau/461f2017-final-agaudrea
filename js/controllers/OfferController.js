/*
  Name: Adam Gaudreau, adam_gaudreau@student.uml.edu
  Computer Science Department, UMass Lowell
  Comp.4610, GUI Programming I
  File: /usr/cs/2018/agaudrea/public_html/461f2017/final/js/controllers/OfferController.js
  Created: 26 November 2017
  Last updated by AG: 26 November 2017
*/

app.controller("OfferController", ['$scope', 'saveFormService',
function($scope, saveFormService) {
  $scope.subsection = ['Basic Info', 'Voluntary Contributions', 'Other Payments'];
  $scope.submessage = ['Tell us about your offer.', 'These can be found in your offer letter or paycheck.', 'This will help us get a more accurate estimate.'];
  $scope.submitForm = function(isValid) {
    if (isValid) {
      // Let's go to results
      var i = 0;
      $('.nav').children('div').each(function() {
        if (i != 2) { 
          $(this).removeClass('active');
        } else {
          $(this).removeClass('disabled');
          $(this).addClass('active');
        }
        i++;
      });
      saveFormService.setData($scope.user);
      window.location = "#/results";
    } else {
      $scope.offerForm.submitted = true;
      alert('We found some errors in this form, take a look at the highlighted fields.');
    }
  }
  angular.element(document).ready(function() {
    var i = 0;
    $('.nav').children('div').each(function() {
      if (i == 1) { $(this).addClass('active'); }
      i++;
    });
    // Check to see if we already have data
    if (!angular.equals(saveFormService.getData(), {})) {
      var user = saveFormService.getData();
      $scope.user = user;
      $('input[name="salary"]').val(user.salary);
      $('select[name="state"]').val(user.state);
      $('select[name="paymentFrequency"]').val(user.paymentFrequency);
      $('select[name="fillingStatus"]').val(user.fillingStatus);
      $('input[name="healthcare"]').val(user.healthcare);
      $('input[name="dental"]').val(user.dental);
      $('input[name="retirement"]').val(user.retirement);
      $('input[name="studentLoanBalance"]').val(user.studentLoanBalance);
      $('input[name="rent"]').val(user.rent);
      $('input[name="utilities"]').val(user.utilities);
      $('input[name="car"]').val(user.car);
      $('input[name="groceries"]').val(user.groceries);
    }
  });
}
]);