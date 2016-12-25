'use strict';


app
.controller('HomeCtrl',[ '$rootScope' , '$scope' , '$resource' , '$state' , 
    function ($rootScope , $scope , $resource , $state) {
//.controller('HomeCtrl',[ '$scope' , 'homeService' , function ($scope , homeService) {
      
      $scope.videos = [];
    
      //watch changes on searchText
      $rootScope.$watch('searchText', function(newValue, oldValue) {
        $scope.searchText = newValue;
      });
        
      function changePath(id){
          $state.go('video', {id: id})
      }
    
      $scope.setCurrentVideo = function(event , video){
          event.preventDefault();
          
          $rootScope.currentVideo = video;
          
          changePath(video.id);
      }
      

      function getAllVideos(){
          var promise = $resource('http://localhost:3000/api_videos/');
          var entry = promise.query(function(){
              $scope.videos = entry;
              
              $scope.videos.forEach(function(video){
                  var path = video.url.split('?v=');
                  var thumb = 'http://img.youtube.com/vi/'
                    + path[1] 
                    + '/'
                    + parseInt(Math.random()*4)
                    + '.jpg';
                  video.thumb = thumb;
              })
                  
          });
      }
    
      getAllVideos();
    
      //homeService.getAllVideos();
    
}])
