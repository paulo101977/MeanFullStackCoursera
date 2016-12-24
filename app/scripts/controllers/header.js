'use strict';


app
  .controller('HeaderCtrl',[ '$scope', '$uibModal' , function ($scope , $uibModal) {
      
      
      var _self = this;
      $scope.menuClick = function(event){
          event.preventDefault();
      }
      
      $scope.login = function(event){
          event.preventDefault();
          
          console.log('clicked');
          
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: '../views/login.html',
              backdrop: 'static',
              keyboard: false,
              controller: 'LoginCTRL',
              //controllerAs: '$ctrl',
              size: 'modal-lg',
              /*resolve: {
                items: function () {
                  return $ctrl.items;
                }
              }*/
            });
      }
      
}]);