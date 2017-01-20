app
  .controller('CommentCtrl',[ '$rootScope' ,'$scope' , '$sce' , '$stateParams' , '$resource' , 
    function ($rootScope  , $scope , $sce , $stateParams , $resource) {
        
        
        $scope.obj = {}
        $scope.obj.comment = "";
        
        $scope.isOpen = [];
        
        //open popover
        $scope.edit = function(comment , video , $index){
            $scope.currentComment = comment;
            
            $scope.isOpen[$index] = true; //open popover
        }
        
        //update comment on the server
        $scope.put = function($index , comment , video){
            
            var Comment = 
                $resource('/api_videos/:idVideo/comments/:idComment',
                            {idVideo: video._id , idComment: comment._id},
                            {'update': { method:'PUT' }} //select the RESTful method
                        );
            
            var CommentInstance = new Comment();
            CommentInstance.comment = $scope.currentComment.comment;//update comment
            
            Comment.update({ _id:comment._id }, CommentInstance , function(instance){
                
                $scope.isOpen[$index] = false; //close popover
            });
        }
        
        //close popover
        $scope.cancelEdit = function($index){
            
            console.log('cancelEdit');
            
            $scope.isOpen[$index] = false; //close popover
            

        }
        
    
        //save new comment
        $scope.save = function(form , video){
            
            var Comment = $resource('/api_videos/:idVideo/comments',{idVideo: video._id});
            var CommentInstance = new Comment();
            
            //fill the comment instance
            CommentInstance.comment = $scope.obj.comment;
            CommentInstance._creator = $rootScope.user._id;
            CommentInstance._video = video._id;
            
            
            Comment.save(CommentInstance , function(commentObj){
                
                if(CommentInstance){

                    //update view
                    if($scope.comments){
                        
                        //inject username in real time
                        var comment = {};
                        comment.comment = $scope.obj.comment;
                        comment._id = commentObj._id;
                        comment._creator = {};
                        comment._creator._id = $rootScope.user._id;
                        comment._creator.username = $rootScope.user.username;
                        $scope.comments.push(comment);
                        
                        //reset the form
                        $scope.obj.comment = "";
                    }
                }
            })
        }
        
        
        //delete the comment
        $scope.delete = function(comment , video){
            var Comment = 
            $resource('/api_videos/:idVideo/comments/:idComment')
            .delete({idVideo: video._id, idComment: comment._id},
                function(err,response){
                    if(err) console.log(err)

                    if(response){

                        var index = $scope.comments.indexOf(comment);

                        if(index > -1){
                            $scope.comments.splice(index, 1);
                        } 
                    }
                }
            );
        
        }
        
        //test if user can comment
        $scope.testIfUser = function(comment){
            
            if(!comment || !comment._creator || !comment._creator.username){
                return false;
            }
            
            if(!$rootScope.user){
                return false;
            }
            
            if(comment._creator._id != $rootScope.user._id){
                return false;
            }
            
            return true;
        }
}]);