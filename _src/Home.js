var Home = (function() {
    var that = {},
         
        
    init = function() {
        document.getElementById("tfbutton").addEventListener("click",_handleClick);
        document.getElementById("tfrandom").addEventListener("click",_handleClick);
        var elems = document.getElementById("abccontainer").childNodes;
        var elems2 = document.getElementById("numbercontainer").childNodes;
        for (var i=0; i<elems.length; i++) {
            elems[i].addEventListener("click",_handleClick);
        }
        for (var i=0; i<elems2.length; i++) {
            elems2[i].addEventListener("click",_handleClick);
        }
    },
    
    _handleClick = function(e) { 
        if(e.target.id =="tfbutton"){
            console.log("clicked search button");
        }
        else if(e.target.id =="tfrandom"){
            console.log("clicked random button");
        }       
        else{
            console.log(e.target.id);
        }
               
        
    }
    ;

    that.init = init;
    return that;
})();