app.controller('editor', ['$scope', '$http', '$window', function($scope, $http, $window) {
    var moves;
    $http.get('moves.json').
        then(function onSuccess(data) {
            $scope.sel = '';
            moves = data;
            $scope.moves = [];
            for(x in data.data){
                $scope.moves.push(data.data[x].name);
            }
            
            $scope.frIcon = "images/Startingposition1.png";
            $scope.flIcon = "images/Startingposition2.png";
            $scope.blIcon = "images/Startingposition4.png";
            $scope.brIcon = "images/Startingposition3.png";
            
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
                "start" : ["FR"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "oneB",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "oneC",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "oneD",
                "move" : {},
                "start" : ["FR"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "twoA",
                "move" : {},
                "start" : ["FL"],
                "end" : "",
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "twoB",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "twoC",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "twoD",
                "move" : {},
                "start" : ["FL"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "threeA",
                "move" : {},
                "start" : ["BL"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "threeB",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "threeC",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "threeD",
                "move" : {},
                "start" : ["BL"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "fourA",
                "move" : {},
                "start" : ["BR"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "fourB",
                "move" : {},
                "start" : [],
                "end" : "",
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "fourC",
                "move" : {},
                "start" : [],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
            }
            ,{
                "quadrant" : "fourD",
                "move" : {},
                "start" : ["BR"],
                "end" : [],
                "icon" : {"image" : $scope.frIcon, "gray" : true}
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
            
            $scope.clearMove = function(){
                for(x in $scope.deck){
                    if($scope.deck[x].quadrant === $scope.sel){
                        $scope.deck[x].move = {};
                        $scope.deck[x].start = [];
                        $scope.deck[x].end = [];
                        $scope.deck[x].icon.gray = true;
                    }
                }
            }
            
            $scope.key = '';
            $scope.search = function(value){
                return value.indexOf($scope.key.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})) !== -1; // just in case i need this again -- $scope.key !== '' && 
            }
            
            $scope.setSearch = function(){
                var start, end, index;
                var alt = false;
                var validMoves = [];
                for(x in $scope.deck){
                    if($scope.deck[x].quadrant === $scope.sel){
                        
                        if($scope.deck[x].quadrant.slice(-1) === "A"){
                            start = $scope.deck[x].start;
                            end = $scope.deck[parseInt(x) + 1].start;
                        } else if($scope.deck[x].quadrant.slice(-1) === "B"){
                            start = $scope.deck[x - 1].end;
                            end = $scope.deck[parseInt(x) + 1].start;
                        } else if($scope.deck[x].quadrant.slice(-1) === "C"){
                            start = $scope.deck[x - 1].end;
                            end = [];
                        } else {
                            start = $scope.deck[x].start;
                            end = [];
                            alt = true;
                        }
                        
                        index = x;
                    }
                }
                //console.log(start, " | ", end);
                
                if(start.length > 0 || end.length > 0){
                    for(x in data.data){
                        for(y in data.data[x].stances){
                            if(validMoves.indexOf(data.data[x].name) === -1){
                                if(start.indexOf(data.data[x].stances[y].start) !== -1 && end.indexOf(data.data[x].stances[y].end) !== -1){
                                    validMoves.push(data.data[x].name);
                                } else if(start.length === 0 && end.indexOf(data.data[x].stances[y].end) !== -1){
                                    validMoves.push(data.data[x].name);
                                } else if(start.indexOf(data.data[x].stances[y].start) !== -1 && end.length === 0){
                                    if(alt){
                                        if(data.data[x].stances[y].start !== data.data[x].stances[y].end){
                                            validMoves.push(data.data[x].name);
                                        }
                                    } else {
                                        validMoves.push(data.data[x].name);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for(x in data.data){
                        validMoves.push(data.data[x].name);
                    }
                }
                $scope.moves = validMoves;
                setFocusOnSearch();
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
                    if(data.data[x].name === value && value !== $scope.deck[index].move.name){
                         //Clear the move from a different slot
                        for(y in $scope.deck){
                            if(data.data[x].name === $scope.deck[y].move.name){
                                $scope.deck[y].move.styleIcon = "";
                                $scope.deck[y].move = {};
                                if($scope.deck[y].quadrant.slice(-1) !== "A" && $scope.deck[y].quadrant.slice(-1) !== "D"){
                                    $scope.deck[y].start = [];
                                }
                                $scope.deck[y].end = [];
                                $scope.deck[y].icon.gray = true;
                            }
                        }
                        
                        $scope.deck[index].move.name = data.data[x].name;
                        $scope.deck[index].move.style = data.data[x].style;
                        $scope.deck[index].move.styleIcon = "images/" + data.data[x].style.toLowerCase() + "_icon.png";
                        $scope.deck[index].move.vert = data.data[x].vert;
                        if(data.data[x].horiz){
                            $scope.deck[index].move.horiz = "sweep";
                        } else {
                            $scope.deck[index].move.horiz = "straight"
                        }
                        $scope.deck[index].move.prop = data.data[x].properties.toString();
                        $scope.deck[index].move.propIcons = [];
                        for(y in data.data[x].properties){
                            $scope.deck[index].move.propIcons.push("images/" + data.data[x].properties[y] + "_move_icon.png");
                        }

                        setHits(data.data[x], index);
                    }
                }
            }
            
            //Sets the hits property of the Deck
            function setHits(move, index){
                if($scope.deck[index].quadrant.slice(-1) === "A"){
                    $scope.deck[index].end = [];
                    if($scope.deck[parseInt(index) + 1].start.length === 0){
                        for(x in move.stances){
                            if($scope.deck[index].start.indexOf(move.stances[x].start) !== -1){
                                $scope.deck[index].end.push(move.stances[x].end);
                            }
                        }
                    } else {
                        for(x in move.stances){
                            if($scope.deck[parseInt(index) + 1].start.indexOf(move.stances[x].end) !== -1 && $scope.deck[index].start.indexOf(move.stances[x].start) !== -1){
                                $scope.deck[index].end.push(move.stances[x].end);
                            }            
                        }
                    }
                } else if($scope.deck[index].quadrant.slice(-1) === "B"){
                    $scope.deck[index].start = [];
                    $scope.deck[index].end = [];
                    if($scope.deck[index - 1].end.length === 0 && $scope.deck[parseInt(index) + 1].start.length === 0){
                        for(x in move.stances){
                            $scope.deck[index].start.push(move.stances[x].start);
                            $scope.deck[index].end.push(move.stances[x].end);
                        }
                    } else if($scope.deck[index - 1].end.length !== 0 && $scope.deck[parseInt(index) + 1].start.length !== 0){
                        for(x in move.stances){
                            if($scope.deck[index - 1].end.indexOf(move.stances[x].start) !== -1 && $scope.deck[parseInt(index) + 1].start.indexOf(move.stances[x].end) !== -1){
                                $scope.deck[index].start.push(move.stances[x].start);
                                $scope.deck[index].end.push(move.stances[x].end);
                            }
                        }
                    } else {
                        console.log(move);
                        for(x in move.stances){
                            console.log($scope.deck[index - 1].end.indexOf(move.stances[x].start));
                            if($scope.deck[index - 1].end.indexOf(move.stances[x].start) !== -1 || $scope.deck[parseInt(index) + 1].start.indexOf(move.stances[x].end) !== -1){
                                $scope.deck[index].start.push(move.stances[x].start);
                                $scope.deck[index].end.push(move.stances[x].end);
                            }
                            console.log($scope.deck[index].end);
                        }
                    }
                } else if($scope.deck[index].quadrant.slice(-1) === "C"){
                    $scope.deck[index].start = [];
                    $scope.deck[index].end = [];
                    if($scope.deck[index - 1].end.length === 0){
                        for(x in move.stances){
                            $scope.deck[index].start.push(move.stances[x].start);
                            $scope.deck[index].end.push(move.stances[x].end);
                        }
                    } else {
                        for(x in move.stances){
                            if($scope.deck[index - 1].end.indexOf(move.stances[x].start) !== -1){
                                $scope.deck[index].start.push(move.stances[x].start);
                                $scope.deck[index].end.push(move.stances[x].end);
                            }
                        }
                    }
                } else {
                    $scope.deck[index].end = [];
                    for(x in move.stances){
                        if($scope.deck[index].start.indexOf(move.stances[x].start) !== -1){
                            $scope.deck[index].end.push(move.stances[x].end);
                        }
                    }
                }
                if($scope.deck[index].end.length === 1){
                    for(x in move.stances){
                        if($scope.deck[index].end[0] === move.stances[x].end){
                            if(move.stances[x].hit === "L"){
                                $scope.deck[index].move.hit = "Left";
                            } else{
                                $scope.deck[index].move.hit = "Right";
                            }
                        }
                    }
                } else {
                    $scope.deck[index].move.hit = "Left/Right";
                }
                
                //Update the Icon to match the new ending stance
                updateIconSrc(index);
                
                //Update moves that are affected by the added move
                //Time to get recursive boys
                if($scope.deck[index].quadrant.slice(-1) === "A" && $scope.deck[parseInt(index) + 1].end.length !== 0){
                    var temp = parseInt(index) + 1;
                    for(x in data.data){
                        if(data.data[x].name === $scope.deck[parseInt(index) + 1].move.name){
                            setHits(data.data[x], temp.toString());
                        }
                    }
                } else if($scope.deck[index].quadrant.slice(-1) === "B" && $scope.deck[parseInt(index) + 1].end.length !== 0 && $scope.deck[index - 1].end.length !== 0){
                    var temp = parseInt(index) + 1;
                    for(x in data.data){
                        if(data.data[x].name === $scope.deck[parseInt(index) + 1].move.name){
                            setHits(data.data[x], temp.toString());
                        }
                    }
                }
            }
            
            function updateIconSrc(index){
                if($scope.deck[index].end.length === 1){
                    if($scope.deck[index].end[0] === "FR"){
                        $scope.deck[index].icon.image = "images/Startingposition1.png";
                    } else if($scope.deck[index].end[0] === "FL"){
                        $scope.deck[index].icon.image = "images/Startingposition2.png";
                    } else if($scope.deck[index].end[0] === "BL"){
                        $scope.deck[index].icon.image = "images/Startingposition4.png";
                    } else {
                        $scope.deck[index].icon.image = "images/Startingposition3.png";
                    }
                }
                
                $scope.deck[index].icon.gray = false;
            }
            
            function setFocusOnSearch(){
               $window.document.getElementById("moveSearch").focus();
               $scope.key = "";
            }
            
            //defer.resolve();
        }).
        catch(function onError(data) {
            console.log(data);
        });
}]);