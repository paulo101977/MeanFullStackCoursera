app
  .controller('CommentCtrl',[ '$rootScope' ,'$scope' , '$sce' , '$stateParams' , '$resource' , 
    function ($rootScope  , $scope , $sce , $stateParams , $resource) {
    
        $scope.send = function(){
            console.log('clicked');
        }
}]);