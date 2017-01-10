angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCTRL', function($scope , $state) {
  
    $scope.login = function(){
        $state.go('videos');
    }
})

.controller('VideosCTRL', function($rootScope , $scope , $state , $resource , $ionicSideMenuDelegate) {
    
    $scope.toggleMenu = function(){
        $ionicSideMenuDelegate.toggleRight();
    }
    
    $scope.videos = [];
    
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
})

.controller('VideoCTRL', function($rootScope , $scope , $state , $resource , $stateParams , $sce , $document) {
    
    $scope.status = {};
    
    $scope.status.isOpen = false;
    
    console.log($stateParams );
    
    //load current video
    function currentVideo(){
        var id = $stateParams.idVideo;
        var Video = $resource('http://localhost:8080/api_videos/:id', {_id:'@id'});
        var video = Video.query({id:id}, function() {
            var path = video[0].url.split('?v=')[1];

            $scope.video = video[0];
            
            
            var thumb = 'http://img.youtube.com/vi/'
                    + path 
                    + '/'
                    + parseInt(Math.random()*4)
                    + '.jpg';

            $scope.video.thumb = thumb;

            $scope.path = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + path) ;
            
            console.log($scope.video);
        });
    }
        
    currentVideo();
    
    /*$scope.goBack = function(){
        $state.go('videos');
    }*/
    
    $scope.play = function(event){
        console.dir( $('#video'));
        
        $('#video')[0].src = $scope.path + "?autoplay=1";
        
        event.preventDefault();
    }
    
    //get all comments
    function comments(){
        var id = $stateParams.idVideo;
        var Comments = $resource('http://localhost:8080/api_videos/:id/comments', {id:'@id'});
        var comments = Comments.query({id:id}, function() {

            $scope.comments = comments;

        });
    }

    comments();
    
    $scope.toggle = function(event){
        event.preventDefault();
        $scope.status.isOpen = !$scope.status.isOpen;
    }
    
});
