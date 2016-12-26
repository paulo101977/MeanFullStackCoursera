app
  .controller('AddVideoCTRL', ['$scope' , '$uibModalInstance' , function ($scope , $uibModalInstance) {
    $scope.submit = function(){
        $uibModalInstance.dismiss();
    }
    
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    }
  }]);