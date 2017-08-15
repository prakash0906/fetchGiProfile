var app = angular.module('myApp',[]);

app.controller('springboard', ['$scope','$http', function($scope,$http) {
$scope.username='';
 $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term

$scope.arrProfiles=[];

$scope.add=function() {
var url='https://api.github.com/users/'+$scope.username;

    $http.get(url)
.success(function(data, status) {
    if(status ===200 && data !=null && data!=undefined){
       data.avatar_url= 'avatar_url' in data && !(data.avatar_url===null || data.avatar_url===undefined || data.avatar_url==="") ?data.avatar_url:'image/default_profile.jpg';
$scope.arrProfiles.push(data);


    }else{
    console.log("Failure ",data,status);

    }
   })
   .error(function(data, status) {
           $scope.messages = data || "Request failed";
    console.log("Error ",$scope.messages,status);
   
       });
       $scope.username='';
  
}
$scope.remove=function(removeItem) {
  
       for(var i = $scope.arrProfiles.length - 1; i >= 0; i--){
      if($scope.arrProfiles[i].$$hashKey == removeItem.$$hashKey){
          $scope.arrProfiles.splice(i,1);
      }
    }
}
}]);
app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
// app.service('GetService', function(userSearch){
// this.square = function(a) {
// return MathService.multiply(a,a);
// }
// });