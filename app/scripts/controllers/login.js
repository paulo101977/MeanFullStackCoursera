app
  .controller('LoginCTRL', ['$scope' , '$uibModalInstance' , function ($scope , $uibModalInstance) {
    $scope.submit = function(){
        $uibModalInstance.close();
    }
    
    $scope.cancel = function(){
        $uibModalInstance.close();
    }
  }]);