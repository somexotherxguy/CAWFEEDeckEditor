app.controller('editor', ['$scope', '$http', function($scope, $http) {
    var moves;
    $http.get('moves.json').
        then(function onSuccess(data) {
            moves = data;
            
            $scope.fr = [];
            $scope.fl = [];
            $scope.bl = [];
            $scope.br = [];
            $scope.deck = {"oneA" : "", "oneB" : "", "oneC" : "", "oneD" : "", "twoA" : "", "twoB" : "", "twoC" : "", "twoD" : "", "threeA" : "", "threeB" : "", "threeC" : "", "threeB" : "", "fourA" : "", "fourB" : "", "fourC" : "", "fourD" : ""};
            for(x in data.data){
                for(y in data.data[x].stances){
                    if(data.data[x].stances[y].start == "FR"){
                        $scope.fr.push(data.data[x]);
                    } else if(data.data[x].stances[y].start == "FL"){
                        $scope.fl.push(data.data[x]);
                    } else if(data.data[x].stances[y].start == "BL"){
                        $scope.bl.push(data.data[x]);
                    }else if(data.data[x].stances[y].start == "BR"){
                        $scope.br.push(data.data[x]);
                    }
                }
            }
            console.log($scope.fr);
            console.log($scope.fl);
            console.log($scope.bl);
            console.log($scope.br);
            //defer.resolve();
            
        }).
        catch(function onError(data) {
            console.log(data);
        });
}]);