app
  .controller('CommentCtrl',[ '$rootScope' ,'$scope' , '$sce' , '$stateParams' , '$resource' , 
    function ($rootScope  , $scope , $sce , $stateParams , $resource) {
        
        /*
        _creator : { type: Schema.ObjectId, ref: 'User' , required: true },
        comment:  { type: String, required: true},
        date: { type: Date, default: Date.now },
        _video: { type: Schema.ObjectId, ref: 'Video' , required: true }
        */
        
        $scope.obj = {}
        $scope.obj.comment = "";
    
        //save new comment
        $scope.save = function(form , video){
            //console.log(form)
            //console.log(video)
            
            var Comment = $resource('http://localhost:8080/api_videos/:idVideo/comments',{idVideo: video._id});
            var CommentInstance = new Comment();
            
            
            CommentInstance.comment = $scope.obj.comment;
            CommentInstance._creator = $rootScope.user._id;
            CommentInstance._video = video._id;
            
            console.log($rootScope.user);
            
            Comment.save(CommentInstance , function(){
                
                if(CommentInstance){

                    //update view
                    if($scope.comments){
                        
                        //inject username in real time
                        //comment._creator.username
                        //comme._creator.username = $rootScope.user.username;
                        var comment = {};
                        comment.comment = $scope.obj.comment;
                        comment._creator = {}
                        comment._creator.username = $rootScope.user.username;
                        console.log(comment)
                        $scope.comments.push(comment)
                        
                        //reset the form
                        $scope.obj.comment = "";
                    }
                }
            })
        }
        
        $scope.testIfUser = function(comment){
            if(comment._creator != $rootScope.user._id){
                return false;
            }
            
            return true;
        }
}]);