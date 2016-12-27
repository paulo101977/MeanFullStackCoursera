


app
  .controller('HeaderCtrl',[ '$rootScope' , '$scope', '$uibModal' , '$location' ,
                            function ($rootScope , $scope , $uibModal , $location) {
      
      
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
              //controllerAs: '$ctrl',
              size: 'modal-lg',
              /*resolve: {
                items: function () {
                  return $ctrl.items;
                }
              }*/
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
      
}]);