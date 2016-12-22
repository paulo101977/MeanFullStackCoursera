'use strict';


app
  .controller('LandCtrl',[ '$scope' , '$state' , function ($scope , $state) {
      
      $scope.changeToHome = function(){
          $state.go('home')
      }
}]);