var Home = (function() {
    var that = {},
        answers =  [50],
         
     
    init = function() {
        _readDatabase();
        _events();
        
        
    },
    
    /*
     *  Eventfunktion
     */
    _events = function(e) {
        document.getElementById("tfbutton").addEventListener("click",_handleClick);
        document.getElementById("tfrandom").addEventListener("click",_handleClick);
        document.getElementById("logo").addEventListener("click",_handleClick);
        //------------------------------------------------------------------------------
        var elems = document.getElementById("abccontainer").childNodes,
            elems2 = document.getElementById("numbercontainer").childNodes;
        for (var i=0; i<elems.length; i++) {
            elems[i].addEventListener("click",_handleClick);
        }
        for (var i=0; i<elems2.length; i++) {
            elems2[i].addEventListener("click",_handleClick);
        }
        //------------------------------------------------------------------------------
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 13) {
                _handleSearch();
            }
        });
    },
    
    _readDatabase = function(e) {
        $.getJSON("_res/_database/questions.json", function(json) {
            for(var i = 0; i<50 ; i++){
                answers[i] = json[i].answer;
                document.getElementById("Result").innerHTML += json[i].answer + ", ";
            }
            
            
            
            var text = "";
            for(var j = 0; j<50 ; j++){
                text+= j + answers[j].charAt(0).toUpperCase() + "; ";
            }
            window.alert(text);
            
            
            
            
            
            
            
            
        });
    },
    
    
     
    
        
        
        
    /*
     *  Suchanfrage
     */
    _handleSearch = function(e) {
            window.alert("Sie suchen nach: What is "+document.getElementById("tftext").value+"?");
    },
    
    /*
     *  Restliche Buttons
     */
    _handleClick = function(e) { 
        if(e.target.id =="tfbutton"){
            _handleSearch();
        }
        else if(e.target.id =="tfrandom"){
            console.log("clicked random button");
        }  
        else if(e.target.id =="logo"){//Homepage Startseite
            location.reload();
        }  
        else if(e.target.id <= "Z" &&e.target.id >= "A" ){
            document.getElementById("Result").innerHTML = "";
            for(var i = 0; i<answers.length ; i++){
                
                if (answers[i].charAt(0).toUpperCase() == e.target.id){
                    document.getElementById("Result").innerHTML += answers[i] + ", ";
                }
            }
            
        }
        else{
            console.log(e.target.id);
        }
               
        
    }
    ;

    that.init = init;
    return that;
})();