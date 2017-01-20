

app
  .controller('LoginCTRL', ['$rootScope' , '$scope' , '$uibModalInstance' , '$resource' , 
                            function ($rootScope , $scope , $uibModalInstance , $resource) {
      
    $scope.vloginOpen = true;
    $scope.vregisterOpen = false;
    $scope.vSubmit = true; //enable button
    $scope.vRegister = true; //enable button
    $scope.errorRegister = null;
    $scope.sucess = false;
    $scope.errorLogin = null;
    $scope.errorPassword = null;
    
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
        
        var User = $resource('/login/');
        
        var UserInstance = new User();
        
        UserInstance.email= user.email;
        UserInstance.password = user.password;
        
        //try update the server and get the response
        User.save(UserInstance)
        .$promise
        .then(
            function(value){
                
                if(value.error){
                    $scope.errorPassword = value.error;
                    
                    $scope.vSubmit = true;
                }
                else { //sucess
                    $scope.errorLogin = null;
                    $uibModalInstance.dismiss();//dismiss the modal
                    
                    $rootScope.logged = true;
                }
                
            },//sucess
            function(error){
                $scope.errorLogin = error;
                
            }//error
        )
    }
    
    //register new user
    $scope.save = function(user){
        $scope.vRegister = false;//disable button
        
        var User = $resource('/signup/');
        
        var UserInstance = new User();
        
        UserInstance.username = user.name;
        UserInstance.email= user.email;
        UserInstance.password = user.password;
        
        //try update the server and get the response
        User.save(UserInstance)
        .$promise
        .then(
            function(value){
                $scope.errorRegister = null;
                
                $uibModalInstance.dismiss();//dismiss the modal
            },//sucess
            function(error){
                $scope.errorRegister = error;
            }//error
        )
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