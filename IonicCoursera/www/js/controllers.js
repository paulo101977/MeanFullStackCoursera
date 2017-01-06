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

.controller('VideoCTRL', function($rootScope , $scope , $state , $resource ) {
    
    $scope.goBack = function(){
        $state.go('videos');
    }
    
    
});
