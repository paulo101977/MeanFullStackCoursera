
console.log("acessing homeService");

app
.service('homeService', [ '$scope' , '$resource' , function ($scope , $resource) {
      
      this.getAllVideos = function(){
          console.log('Enter here');
          return $resource('http://localhost:3000/api_videos/');
      }
      
} ])