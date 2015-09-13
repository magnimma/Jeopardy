var Home = (function() {
    var that = {},
        answers =  [50],
        manager,
         
     
    init = function() {
        _events();
        _getLocals();
        
    },
    
    /*
     *  Eventfunktion
     */
    _events = function(e) {
        $('#logo').click(_handleClick);
        $('#delete').click(_handleClick);
    },
    
    /*
     *  Buttons
     */
    _handleClick = function(e) { 
        if(e.target.id =="logo"){//Homepage Startseite
            location.reload();
        }  
        if(e.target.id =="delete"){//LocalStorage löschen
            localStorage.clear();
                 console.log(localStorage.getItem(0));
            _getLocals();
        } 
    },
        
    _remove = function(){
        $('#tfoldsearch').empty();
        $('#tfoldsearch').append(' <p id="delete">Delete this</p><p id="lastsearch">Last Searches</p>');
        $('body').on('click', '#delete', function() {
              localStorage.clear();
                console.log(localStorage.getItem(0));
                _getLocals();
          });
    }
        
    _getLocals= function(){
        if(localStorage.getItem(0)!=null){
            _remove();
            for(var i = 0; i < 5 ; i++){
                if(localStorage.getItem(i)!=null)_addLocal(localStorage.getItem(i),i);
            }
        }
        else{
            $('#tfoldsearch').hide();
        }
    },
    
    _addLocal= function(item,i){
        $('#tfoldsearch').append('<p id="'+i+'" class="olditem">'+item+'</p>');
        $('body').on('click', '#'+i, function() {
              $('#tftext').val(item);
              $('#tfbutton').click();
          });
        
    }
    ;
    that._getLocals = _getLocals;
    that.init = init;
    return that;
})();