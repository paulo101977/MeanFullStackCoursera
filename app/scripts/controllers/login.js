

app
  .controller('LoginCTRL', ['$scope' , '$uibModalInstance' , function ($scope , $uibModalInstance) {
    $scope.submit = function(){
        $uibModalInstance.dismiss();
        console.log('')
    }
    
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    }
  }]);