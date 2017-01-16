angular.module('starter.controllers', [])

.controller('CommentCTRL' , function($rootScope, $scope , $resource){
    $scope.closeModal = function(){
        $rootScope.modalComment.hide();
        $scope.comment = {}
    }
    
    $scope.submit = function(comment , video){
        //update comment on the server
            
        var Comment = 
            $resource('http://localhost:8080/api_videos/:idVideo/comments/:idComment',
                        {idVideo: video._id , idComment: comment._id},
                        {'update': { method:'PUT' }} //select the RESTful method
                    );

        var CommentInstance = new Comment();
        CommentInstance.comment = $scope.currentComment.comment;//update comment

        Comment.update({ _id:comment._id }, CommentInstance , function(instance){

            $scope.isOpen[$index] = false; //close popover
        });

    }
    
    //save new comment
    $scope.save = function(comment , video){
        
        console.dir(comment , video)

        var Comment = $resource('http://localhost:8080/api_videos/:idVideo/comments',{idVideo: video._id});
        var CommentInstance = new Comment();

        //fill the comment instance
        CommentInstance.comment = comment.comment;
        CommentInstance._creator = $rootScope.user._id;
        CommentInstance._video = video._id;


        Comment.save(CommentInstance , function(commentObj){

            if(CommentInstance){

                //update view
                if($scope.comments){

                    //inject username in real time
                    var comment = {};
                    comment.comment = commentObj.comment;
                    comment._id = commentObj._id;
                    comment._creator = {};
                    comment._creator._id = $rootScope.user._id;
                    comment._creator.username = $rootScope.user.username;
                    $scope.comments.push(comment);

                    //reset the form
                    $scope.comment = {};
                    
                    //close modal
                    $scope.closeModal();
                }
            }
        })
    }
})

.controller('RegisterCTRL', function($scope , $state, $resource , $ionicSideMenuDelegate) {
    
    if($ionicSideMenuDelegate.showBackButton) $ionicSideMenuDelegate.showBackButton(true)
  
    $scope.close = function(){
        $state.go("videos")
    }
    
    //register new user
    $scope.save = function(user){
        
        var User = $resource('http://localhost:8080/signup/');
        
        var UserInstance = new User();
        
        UserInstance.username = user.name;
        UserInstance.email= user.email;
        UserInstance.password = user.password;
        
        //try update the server and get the response
        User.save(UserInstance)
        .$promise
        .then(
            function(value){
                $scope.errorRegister = null;
                
                $state.go("videos");//go back
            },//sucess
            function(error){
                $scope.errorRegister = error;
            }//error
        )
    }
})

.controller('AddVideoCTRL', function($rootScope , $scope , $state , $resource, $ionicSideMenuDelegate) {
    
    if($ionicSideMenuDelegate.showBackButton) $ionicSideMenuDelegate.showBackButton(true);
    
    $scope.closeModal = function(){
        $rootScope.modal.hide();
    }
    
    //save the video instance and update view
    $scope.submit = function(form){
        
        $ionicSideMenuDelegate.toggleRight();
        
        $rootScope.modal.hide();

        var Video = $resource('http://localhost:8080/api_videos/');

        var VideoInstance = new Video();
        VideoInstance.description = form.description;
        VideoInstance.title = form.title;
        VideoInstance.url = form.url;
        

        VideoInstance._author = $rootScope.user._id;

        //save video instance
        Video.save(VideoInstance , function(video){

            if(video){

                //update view
                if($rootScope.videos){
                    
                    $scope.video = {};

                    var path = video.url.split('?v=');
                    var thumb = 'http://img.youtube.com/vi/'
                        + path[1] 
                        + '/'
                        + parseInt(Math.random()*4)
                        + '.jpg';

                    //set the video author
                    video.thumb = thumb;
                    
                    console.dir(video)

                    $rootScope.videos.push(video);
                }
            }
            
        })

    }

})


.controller('LoginCTRL', function($rootScope , $scope , $state , $resource, $ionicSideMenuDelegate) {
    if($ionicSideMenuDelegate.showBackButton) $ionicSideMenuDelegate.showBackButton(true);
    
    $scope.user = {};
    
    $scope.errorPassword = null;
    $scope.errorLogin = null;
    
    $scope.submit = function(user){
        var User = $resource('http://localhost:8080/login/');
        
        var UserInstance = new User();
        
        UserInstance.email= user.email;
        UserInstance.password = user.password;
        
        
        //try update the server and get the response
        User.save(UserInstance)
        .$promise
        .then(
            function(user){
                
                if(user.error){
                    $scope.errorPassword = user.error;
                    
                }
                else { //sucess
                    $scope.errorLogin = null;
                    
                    $rootScope.logged = true;
                    
                    $rootScope.user = user;
                    
                    $state.go("videos")
                }
                
            },//sucess
            function(error){
                $scope.errorLogin = error;
                
            }//error
        )
    }
    
    $scope.cancel = function(){
        $scope.user = {};
        $state.go("videos");
    }
})

.controller('VideosCTRL', function($rootScope , $scope , $state , $resource , $ionicSideMenuDelegate , $ionicModal , $location , $ionicNavBarDelegate) {
    
    
    
    //hide back button
    if($ionicSideMenuDelegate.showBackButton) $ionicNavBarDelegate.showBackButton(false);
    
    //modal instance
    $ionicModal.fromTemplateUrl('templates/addvideo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        $rootScope.modal = modal;
    });
    
    $scope.openModal = function(){
        $scope.modal.show();
    }
    
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    
    $scope.toggleMenu = function(){
        $ionicSideMenuDelegate.toggleRight();
    }
    
    $rootScope.$watch('logged',function(newValue){
        $scope.logged = newValue;
    })
    
    $scope.logout = function(){
        $rootScope.logged = false;
        $rootScope.user = {};
        
          
        //logout in the server
        var promise = $resource('http://localhost:8080/logout/');
        promise.query(function(){});
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
    
      function isLoged(){
         var promise = $resource('http://localhost:8080/isloged/');
         var entry = promise.query(function(){
             //after load request
             if(entry){
                 if(entry[0].message){
                     $rootScope.logged = true;
                 }
                 
                 //request user info
                 if(entry[0].user){
                     console.log(entry[0].user);
                     $rootScope.user = entry[0].user;
                 }
             }
             
         });
          
      }
                        
      isLoged();
})

.controller('VideoCTRL', function($rootScope , $scope , $state , $resource , $stateParams , $sce , $document, $ionicModal) {
    
    $scope.status = {};
    
    $scope.status.isOpen = false;
    
    $scope.render_class = "ion-ios-arrow-down";
    $scope.render_down = "ion-ios-arrow-down";
    $scope.render_up = "ion-ios-arrow-up";
    $scope.isRender = true;
    
    
    //remove comment
    //delete the comment
    $scope.deleteComment = function(comment , video){
        var Comment = 
        $resource('http://localhost:8080/api_videos/:idVideo/comments/:idComment')
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
    
    
    //comment modal instance
    $ionicModal.fromTemplateUrl('templates/comment.html', {
        scope: $scope,
        animation: 'animated zoomInDown',
        hideDelay:92
    }).then(function(modal) {
        $scope.modalComment = modal;
        $rootScope.modalComment = modal;
    });
    
    $scope.openModal = function(){
        $scope.modalComment.show();
    }
    
    $scope.closeModal = function() {
        $scope.modalComment.hide();
    };
    
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
        
        $scope.isRender = !$scope.isRender;
        
        $scope.render_class = ($scope.isRender) ? $scope.render_down : $scope.render_up;
    }
    
});
