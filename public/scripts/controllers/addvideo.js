app
  .controller('AddVideoCTRL', ['$rootScope' ,'$scope' , '$uibModalInstance' , '$resource' , 
    function ($rootScope , $scope , $uibModalInstance , $resource) {
        
        $scope.isValidYoutubeUrl = function(url){
            if(!url) return false;
            
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return true;
            }
            
            return false;
        }
        
        //save the video instance and update view
        $scope.submit = function(form){
            $uibModalInstance.dismiss();
            
            var Video = $resource('/api_videos/');
            
            var VideoInstance = new Video();
            VideoInstance.description = form.description;
            VideoInstance.title = form.title;
            VideoInstance.url = form.url;
            
            VideoInstance._author = $rootScope.user._id;
            
            //save video instance
            Video.save(VideoInstance , function(newVideo){
                
                if(VideoInstance){

                    //update view
                    if($rootScope.videos){
                        
                        var path = VideoInstance.url.split('?v=');
                        var thumb = 'http://img.youtube.com/vi/'
                            + path[1] 
                            + '/'
                            + parseInt(Math.random()*4)
                            + '.jpg';

                        //set the video author
                        VideoInstance.thumb = thumb;
                        VideoInstance._id = newVideo._id;
                        
                        $rootScope.videos.push(VideoInstance);
                    }
                }
            })

        }

        //cancel action
        $scope.cancel = function(){
            $uibModalInstance.dismiss();
        }
  }]);