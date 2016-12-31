 'use strict';


app
.controller('HomeCtrl',[ '$rootScope' , '$scope' , '$resource' , '$state' , 
    function ($rootScope , $scope , $resource , $state) {
//.controller('HomeCtrl',[ '$scope' , 'homeService' , function ($scope , homeService) {
      
      //all videos
      $scope.videos = [];
    
      //watch changes on searchText
      $rootScope.$watch('searchText', function(newValue, oldValue) {
        $scope.searchText = newValue;
      });
    
      //change path url
      function changePath(id){
          $state.go('video', {id: id})
      }
    
      //set the current selected video
      $scope.setCurrentVideo = function(event , video){
          event.preventDefault();
          
          $rootScope.currentVideo = video;
          
          changePath(video.id);
      }
      
      
      //listen any changes to video variable
      $rootScope.$watch('videos' , function(newVideos , oldValue){
          
          if(newVideos){
              
              $scope.videos = newVideos;

          }
      })
      

      //get all videos
      function getAllVideos(){
          var promise = $resource('http://localhost:8080/api_videos/');
          var entry = promise.query(function(){
              $scope.videos = entry;
              
              $rootScope.videos = entry;
              
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
