angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $location, $http, Camera, $cordovaCamera, getData, $cordovaImagePicker) {

      var canvas = document.getElementById('canvas');
      var ctx= canvas.getContext('2d');

  $scope.takePhoto = function(){
      console.log('Getting camera');
      Camera.getPicture({
      quality: 75,
        destinationType: 0,
      targetWidth: 300,
      targetHeight: 400,
      saveToPhotoAlbum: false,
        cameraDirection: 1
    }).then(function(dataURL) {
      alert(dataURL);
      $scope.lastPhoto = "data:image/jpg;base64," + dataURL;
       //$scope.$apply();
//         $scope.$apply();
//        var byteCharacters = atob(dataURL);
//      var contentType = '';
// var byteNumbers = new Array(byteCharacters.length);
// for (var i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
// }
//         var byteArray = new Uint8Array(byteNumbers);
// $scope.process = new Blob([byteArray], {type: contentType});
//         $scope.$apply();
        var img = new Image();
        img.src = $scope.lastPhoto;
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        };
    }, function(err) {
      console.log(err);
    });
  }
      $scope.analyze = function(){
          $scope.process = $scope.URItoblob($scope.lastPhoto);
   

          getData.edit($scope.process).then(function(data){
          alert(JSON.stringify(data));
       }
      )
}

  $scope.URItoblob = function(URI){
    var binary = atob(URI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});

  }


  if($location.absUrl().indexOf("code")!= "-1"){
        alert('NOT EMPTY')
    $http({
      method: 'GET',
      url: "http://localhost:3000/quizlet?code="+$location.absUrl().substring($location.absUrl().indexOf("code=")+5, $location.absUrl().length-10)
    }).then(function successCallback(response) {
            $scope.username = response.data.username;
    }, function errorCallback(response) {
       
      })
      };


})

.controller('AccountCtrl', function($scope,$cordovaInAppBrowser){
 
    
    function makeid()
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for(var i=0; i < 5; i++)
		        text += possible.charAt(Math.floor(Math.random()*possible.length));

		    return text;
		}
    
        var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'DONE?'
    };

	 $scope.openQuizlet = function(){
  
          		var str = makeid();
        var browserRef = $cordovaInAppBrowser.open("https://quizlet.com/authorize?response_type=code&client_id=6DNHhMVpeH&scope=write_set&state="+str, '_blank', options);
     $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
            console.log(JSON.stringify(e))
            console.log(JSON.stringify(event))
            if($location.absUrl().indexOf("http://localhost")===0){
                browserRef.close();
            }
        });              
                              

 
     }
})
    
  .controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $ionicHistory, $stateParams, $ionicLoading) {

    $scope.status;
    $scope.pageswitch = function () {
      $state.go('tab.dash'); 
    }

    if ($stateParams.clear) {
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
    $scope.goto = function () {
      $state.go('tab.account');
    };


    $scope.startApp = function () {
        $state.go('tab.dash');
        console.log("test");;
        window.localStorage['didTutorial'] = true;

    };

    $scope.next = function () {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function () {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };


  })