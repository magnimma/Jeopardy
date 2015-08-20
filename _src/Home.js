var Home = (function() {
    var that = {},
         
        
    init = function() {
        $('#el1').on('click', _handleClick);
        $('#el2').on('click', _handleClick);
        $('#el3').on('click', _handleClick);
    },
    
    _handleClick = function(e) { 
        switch(e.target.id){
                 
            case 'el1':
                window.open("DesignURChar/index.html", '_self', false);
                break;
            case 'el2':
                window.open("CheckURJava/index.html", '_self', false);
                break;
            case 'el3':
                window.open("BoolURLogic/index.html", '_self', false);
                break;
             
        }
        
    }
    ;

    that.init = init;
    return that;
})();