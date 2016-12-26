

app
  .controller('VideoCtrl',[ '$rootScope' ,'$scope' , '$sce' , '$stateParams' , '$resource' , 
    function ($rootScope  , $scope , $sce , $stateParams , $resource) {
    
        //update current
        $rootScope.$watch('currentVideo',function(){
            
            var current = $rootScope.currentVideo;
            
            //clicked on home item
            if(current){
                var video = $rootScope.currentVideo,
                    path;
                
                //the video path id
                path = video.url.split('?v=')[1];

                $scope.video = video;

                $scope.path = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + path) ;
            }
            else { //retrive from database
                var id = $stateParams.id;
                var Video = $resource('http://localhost:3000/api_videos/:id', {id:'@id'});
                var video = Video.get({id:id}, function() {
                    var path = video.url.split('?v=')[1];

                    $scope.video = video;
                    
                    $scope.path = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + path) ;
                });
            }
        })
}]);