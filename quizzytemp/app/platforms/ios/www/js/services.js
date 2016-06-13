angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])

.factory('getData', [ '$http', function($http){
        var factory = {};
        factory.edit = function(wowUrl) {
    var req = {
 method: 'POST',
 url: 'https://api.projectoxford.ai/vision/v1/ocr?',
 headers: {
   'Content-Type': "application/octet-stream",
'Ocp-Apim-Subscription-Key': "900313fb426048dc9369d4661f07ee66"
 },
 data: wowUrl,
language: 'unk',
        detectOrientation: true        
    
}
 return $http(req).then(function(data){return data}, function(err){alert(JSON.stringify(err));alert("error oops")});
        }
    return factory;
    }]);