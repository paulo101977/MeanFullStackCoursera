'use strict';


app
.controller('HomeCtrl',[ '$scope' , '$resource' , function ($scope , $resource) {
//.controller('HomeCtrl',[ '$scope' , 'homeService' , function ($scope , homeService) {
      
      $scope.videos = [];
      

      function getAllVideos(){
          var promise = $resource('http://localhost:3000/api_videos/');
          var entry = promise.query(function(){
              $scope.videos = entry;
              
              console.log(parseInt(Math.random()*3));
              
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
