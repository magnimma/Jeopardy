var Home = (function() {
    var that = {},
        answers =  [50],
        manager,
         
     
    init = function() {
        _events();
        
        
    },
    
    /*
     *  Eventfunktion
     */
    _events = function(e) {
        //--------------------------Homepage--------------------------------------------
        document.getElementById("tfrandom").addEventListener("click",_handleClick);
        //--------------------------Suchanfrage-----------------------------------------
        document.getElementById("tfbutton").addEventListener("click",_handleSearch);
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 13) {
                _handleSearch();
            }
        });
        //--------------------------Random-Suche----------------------------------------
        document.getElementById("logo").addEventListener("click",_handleClick);
        //--------------------------ABC/Neueste-Suche-----------------------------------
        var elems = document.getElementById("abccontainer").childNodes,
            elems2 = document.getElementById("numbercontainer").childNodes;
        for (var i=0; i<elems.length; i++) {
            elems[i].addEventListener("click",_handleClick);
        }
        for (var i=0; i<elems2.length; i++) {
            elems2[i].addEventListener("click",_handleClick);
        }
        //------------------------------------------------------------------------------
    },   
        
        
    /*
     *  Suchanfrage
     */
    _handleSearch = function(e) {
           
            $(document).trigger( "searched");
    },
    
    /*
     *  Restliche Buttons
     */
    _handleClick = function(e) { 
        if(e.target.id =="tfbutton"){
            //wird schon abgefangen
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