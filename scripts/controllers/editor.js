app.controller('editor', ['$scope', '$http', function($scope, $http) {
    var moves;
    $http.get('moves.json').
        then(function onSuccess(data) {
            $scope.sel = '';
            moves = data;
            $scope.moves = [];
            for(x in data.data){
                $scope.moves.push(data.data[x].name);
            }
            
            
            
            $scope.fr = [];
            $scope.fl = [];
            $scope.bl = [];
            $scope.br = [];
            $scope.frNames = [];
            $scope.flNames = [];
            $scope.blNames = [];
            $scope.brNames = [];
            $scope.deck = [{
                "quadrant" : "oneA",
                "move" : {},
                "start" : "FR",
                "end" : ""
            }
            ,{
                "quadrant" : "oneB",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "oneC",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "oneD",
                "move" : {},
                "start" : "FR",
                "end" : ""
            }
            ,{
                "quadrant" : "twoA",
                "move" : {},
                "start" : "FL",
                "end" : ""
            }
            ,{
                "quadrant" : "twoB",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "twoC",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "twoD",
                "move" : {},
                "start" : "FL",
                "end" : ""
            }
            ,{
                "quadrant" : "threeA",
                "move" : {},
                "start" : "BL",
                "end" : ""
            }
            ,{
                "quadrant" : "threeB",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "threeC",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "threeD",
                "move" : {},
                "start" : "BL",
                "end" : ""
            }
            ,{
                "quadrant" : "fourA",
                "move" : {},
                "start" : "BR",
                "end" : ""
            }
            ,{
                "quadrant" : "fourB",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "fourC",
                "move" : {},
                "start" : "",
                "end" : ""
            }
            ,{
                "quadrant" : "fourD",
                "move" : {},
                "start" : "BR",
                "end" : ""
            }];
            
            for(x in data.data){
                for(y in data.data[x].stances){
                    if(data.data[x].stances[y].start === "FR"){
                        $scope.fr.push(data.data[x]);
                        $scope.frNames.push(data.data[x].name);
                    } else if(data.data[x].stances[y].start === "FL"){
                        $scope.fl.push(data.data[x]);
                        $scope.flNames.push(data.data[x].name);
                    } else if(data.data[x].stances[y].start === "BL"){
                        $scope.bl.push(data.data[x]);
                        $scope.blNames.push(data.data[x].name);
                    }else if(data.data[x].stances[y].start === "BR"){
                        $scope.br.push(data.data[x]);
                        $scope.brNames.push(data.data[x].name);
                    }
                }
            }
            
            $scope.key = '';
            $scope.search = function(value){
                return $scope.key !== '' && value.indexOf($scope.key) !== -1;
            }
            
            $scope.setSearch = function(){
                var start, end, index;
                var validMoves = [];
                for(x in $scope.deck){
                    if($scope.deck[x].quadrant === $scope.sel){
                        start = $scope.deck[x].start;
                        end = $scope.deck[x].end;
                        index = x;
                    }
                }
                console.log(start, end);
                
                if(start !== "" || end !== ""){
                    for(x in data.data){
                        for(y in data.data[x].stances){
                            if(data.data[x].stances[y].start === start && data.data[x].stances[y].end === end){
                                validMoves.push(data.data[x].name);
                            } else if(start === "" && data.data[x].stances[y].end === end){
                                validMoves.push(data.data[x].name);
                            } else if(data.data[x].stances[y].start === start && end === ""){
                                validMoves.push(data.data[x].name);
                            }
                        }
                    }
                } else {
                    for(x in data.data){
                        validMoves.push(data.data[x].name);
                    }
                }
                $scope.moves = validMoves;
            }
            
            $scope.selectMove = function(){
                console.log($scope.sel);
            }
            
            $scope.addMove = function (value){
                var index;
                
                for(x in $scope.deck){
                    if($scope.deck[x].quadrant === $scope.sel){
                        index = x;
                    }
                }
                
                for(x in data.data){
                    if(data.data[x].name === value){
                        $scope.deck[index].move.name = data.data[x].name;
                        $scope.deck[index].move.vert = data.data[x].vert;
                        $scope.deck[index].move.horiz = data.data[x].horiz;
                        $scope.deck[index].move.prop = data.data[x].properties;
                        //ah fuck its about to get ugly
                        //$scope.deck[index].move.hits = data.data[x].vert;
                    }
                }
                console.log($scope.deck[index].move);
            }
            
            //defer.resolve();
        }).
        catch(function onError(data) {
            console.log(data);
        });
}]);