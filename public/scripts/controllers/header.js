


app
  .controller('HeaderCtrl',
              [ '$rootScope' , '$scope', '$uibModal' , '$location' , '$resource' ,
                    function ($rootScope , $scope , $uibModal , $location , $resource) {
                        
      
      
      var _self = this;
                        
    
      
      //watch changes on searchText
      $scope.$watch('searchText', function(newValue, oldValue) {
        //apply the changes to rootScope
        $rootScope.searchText = newValue;
      });
      
      
      $scope.menuClick = function(event){
          event.preventDefault();
      }
      
      $scope.login = function(event){
          event.preventDefault();
          
          
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: '../views/login.html',
              backdrop: 'static',
              keyboard: false,
              controller: 'LoginCTRL',
              size: 'modal-lg'
            });
      }
      
      $scope.addVideo = function(event){
          event.preventDefault();
          
          console.log('clicked');
          
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: '../views/addvideo.html',
              keyboard: false,
              controller: 'AddVideoCTRL',
              //controllerAs: '$ctrl',
              size: 'modal-lg',
              /*resolve: {
                items: function () {
                  return $ctrl.items;
                }
              }*/
            });
      }
      
      $scope.show = function(){
         return  $location.path() == '/home'
      }
      
      
      //if user is logged
      $rootScope.$watch('logged' , function(newValue, oldValue){
          //$scope.logged = newValue;
          $scope.logged = newValue;
      })
      
      $scope.logout = function(event){
          event.preventDefault();
          
          //$scope.logged = false;
          $rootScope.logged = false;
          
          //logout in the server
          var promise = $resource('http://localhost:8080/logout/');
          promise.query(function(){});
      }
      
}]);