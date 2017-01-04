

app
  .controller('VideoCtrl',[ '$rootScope' ,'$scope' , '$sce' , '$stateParams' , '$resource' , 
    function ($rootScope  , $scope , $sce , $stateParams , $resource) {
    
        
        $rootScope.$watch('logged' , function(newValue){
            $scope.logged = newValue;
        })
        
        //load current video
        function currentVideo(){
            var id = $stateParams.id;
            var Video = $resource('http://localhost:8080/api_videos/:id', {_id:'@id'});
            var video = Video.query({id:id}, function() {
                var path = video[0].url.split('?v=')[1];

                $scope.video = video[0];

                $scope.path = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + path) ;
            });
        }
        
        currentVideo();
        
        //get all comments
        function comments(){
            var id = $stateParams.id;
            var Comments = $resource('http://localhost:8080/api_videos/:id/comments', {id:'@id'});
            var comments = Comments.query({id:id}, function() {

                $scope.comments = comments;

            });
        }
        
        comments();
        
}]);