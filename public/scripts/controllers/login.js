

app
  .controller('LoginCTRL', ['$scope' , '$uibModalInstance' , function ($scope , $uibModalInstance) {
      
    $scope.vloginOpen = true;
    $scope.vregisterOpen = false;
    $scope.vSubmit = true; //enable button
    $scope.vRegister = true; //enable button
    
    //open the register screen
    $scope.registerOpen = function(){
        $scope.vloginOpen = false;
        $scope.vregisterOpen = true;
    }
    
    //open the login screen
    $scope.loginOpen = function(){
        $scope.vloginOpen = true;
        $scope.vregisterOpen = false;
    }
      
    //login user
    $scope.submit = function(user){
        //$uibModalInstance.dismiss();
        
        $scope.vSubmit = false; //disable button
        console.log(user)
    }
    
    //register new user
    $scope.save = function(user){
        $scope.vRegister = false;//disable button
        console.log(user)
    }
    
    //test if is the same
    $scope.equal = function(password,repassword){
        if(!password || !repassword){
            return false;
        }
        if(password != repassword){
            return false;
        }
        
        return true;
    }
    
    //close modal
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
        
        $scope.vSubmit = true; //enable button
        $scope.vRegister = true; //enable button
    }
  }]);