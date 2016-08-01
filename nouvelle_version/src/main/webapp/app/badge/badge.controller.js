(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BadgeController',BadgeController);

    BadgeController.$inject = ['$uibModalInstance', '$state', '$stateParams'];

    function BadgeController($uibModalInstance, $state, $stateParams) {
        var vm = this;

        vm.blocName = $stateParams.blocName;
        vm.displayText = " You successfully finished the bloc " + vm.blocName ;

        var byline = document.getElementById('Badge_byline');  	// Find the H2
            bylineText = byline.innerHTML;									// Get the content of the H2
            bylineArr = bylineText.split('');									// Split content into array
            byline.innerHTML = '';											    // Empty current content

            var span;					// Create variables to create elements
            var letter;

            for(i=0;i<bylineArr.length;i++){									// Loop for every letter
                    span = document.createElement("span");					    // Create a <span> element
                    letter = document.createTextNode(bylineArr[i]);	// Create the letter
                    if(bylineArr[i] == ' ') {									// If the letter is a space...
                        byline.appendChild(letter);					            // ...Add the space without a span
                    } else {
        		        span.appendChild(letter);						        // Add the letter to the span
          	            byline.appendChild(span); 					            // Add the span to the h2
                    }
            }



        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        vm.close = function() {

           $uibModalInstance.close(true);
          $state.go('viewCourse', {id: $stateParams.idLesson});
        }
    }
})();
