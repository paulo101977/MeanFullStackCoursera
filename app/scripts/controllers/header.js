'use strict';


app
  .controller('HeaderCtrl',[ '$scope' , function ($scope) {
      
      $scope.menuClick = function(event){
          event.preventDefault();
      }
      
      $scope.loggin = function(event){
          event.preventDefault();
      }
      
}]);