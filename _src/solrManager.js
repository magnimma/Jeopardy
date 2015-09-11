var Manager;
(function ($) {
    $(document).ready(function(){
        $("#tfbutton").click(function(event){
            console.log(event);
            doSearch("answer");
        });
        $("#tfrandom").click(function(){
            doRandom();
        });
        $(document).keydown(function(event){ 
            if(event.which == 13){
                doSearch("answer");
            }
        });
        $('#A, #B, #C, #D, #E, #F, #G, #H, #I, #J, #K, #L, #M, #N, #O, #P, #Q, #R, #S, #T, #U, #V, #W, #X, #Y, #Z').click(function(event)         {  
            doLetter(event.target.id.toLowerCase());
        })
        $('#1,#2,#3,#4,#5,#6,#7,#8,#9').click(function(event)         {  
            doNumber(event.target.id);
        })
    });
   
  
    
   var doSearch = function(category){
       var currentSearch = document.getElementById("tftext").value;
       if(/*checkCalc(currentSearch) || */currentSearch == null) return null; // don't search if it is an calculation
       localsManager(currentSearch); //add this search to the last searches box
        Manager = new AjaxSolr.Manager({
            solrUrl:'http://localhost:8983/solr/hopes/select?q=*:*&fq={!dismax qf='+category+'}'+currentSearch+'&wt=json&indent=true'
        });

   	    Manager.addWidget(new AjaxSolr.ResultWidget({
      	     id: 'result',
            target: '#docs'
        }));
        Manager.init();
        Manager.store.addByValue('q', '*:*');
        Manager.doRequest();
       
       Manager.addWidget(new AjaxSolr.PagerWidget({
           id: 'pager',
           target: '#pager',
           prevLabel: '&lt;',
           nextLabel: '&gt;',
           innerWindow: 1,
           renderHeader: function (perPage, offset, total) {
               perPage = 20;
               $('#pager-header').html($('<span></span>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
           }
       }));
   }; 
    
    
    var checkCalc = function (currentSearch){
        if(currentSearch.charAt(0)>0 && currentSearch.charAt(0)<=9){//if it's an calculation
            $('#docs').empty();
            try{$('#docs').append(' <div class="resultList">'+"Ergebnis: "+currentSearch+" = "+eval(currentSearch)+' </div>');}
            catch (Exception)
            {$('#docs').append(' <div class="resultList">'+"Ergebnis: "+currentSearch+" = Keine gültige Rechnung"+' </div>');}
            return true;
        }
        return false;
    }
    
    
    var doRandom = function(){
        var randomint = getRandom();
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://localhost:8983/solr/hopes/select?q=*%3A*&sort=random_'+randomint+'+asc&rows=1&wt=json&indent=true'
        });

   	    Manager.addWidget(new AjaxSolr.ResultWidget({
      	     id: 'random',
             target: '#docs'
        }));
       Manager.init();
       Manager.store.addByValue('q', '*:*');
       Manager.doRequest();
   };  
    
    var getRandom = function(){
        var max = 99999;
        return Math.floor(Math.random() * max);
    }
    
    var localsManager = function(item){
        $('#tfoldsearch').show();
        if(localStorage.getItem(0)!=null)moveAllOneUp(4);
        localStorage.setItem(0,item);
        Home._getLocals();
    };
    
    var moveAllOneUp = function(number){
        if(localStorage.getItem(number-1)!=null)localStorage.setItem(number,localStorage.getItem(number-1));
        if(number>1)moveAllOneUp(number-1);
    };
       
    var doLetter = function(letter){
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://localhost:8983/solr/hopes/select?q=*%3A*&fq=answer%3A'+letter+'*&rows=50&sort=sort asc&wt=json&indent=true'
        });

   	    Manager.addWidget(new AjaxSolr.ResultWidget({
      	     id: 'letter',
             target: '#docs'
        }));
       Manager.init();
       Manager.store.addByValue('q', '*:*');
       Manager.doRequest();
    
       Manager.addWidget(new AjaxSolr.PagerWidget({
           id: 'pager',
           target: '#pager',
           prevLabel: '&lt;',
           nextLabel: '&gt;',
           innerWindow: 1,
           renderHeader: function (perPage, offset, total) {
               perPage = 50;
               $('#pager-header').html($('<span></span>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
           }
       }));
   }; 
   
    
   var doNumber = function(number){
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://localhost:8983/solr/hopes/select?q=*%3A*&rows=50&start='+(number*50-50)+'&wt=json&indent=true'
        });

   	    Manager.addWidget(new AjaxSolr.ResultWidget({
      	     id: 'number',
             target: '#docs'
        }));
       Manager.init();
       Manager.store.addByValue('q', '*:*');
       Manager.doRequest();
   }; 
 
   
})(jQuery);




