app.directive('animateShow', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).animate({
                'font-size': '2em'
            }, 50);
        }
    }
})