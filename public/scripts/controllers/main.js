'use strict';


app
  .controller('MainCtrl',[ '$rootScope' , '$scope' , '$resource' , function ($rootScope , $scope , $resource){
      
      function isLoged(){
         var promise = $resource('http://localhost:8080/isloged/');
         var entry = promise.query(function(){
             //after load request
             if(entry){
                 if(entry[0].message){
                     $rootScope.logged = true;
                 }
                 
                 //request user info
                 if(entry[0].user){
                     console.log(entry[0].user);
                     $rootScope.user = entry[0].user;
                 }
             }
             
         });
          
      }
                        
      isLoged();
    
  }]);
