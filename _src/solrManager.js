var Manager;
(function ($) {
    $(document).ready(function(){
        $("#tfbutton").click(function(){
            doSearch();
            getQuestions();
        });
        $(document).keydown(function(event){ 
            if(event.which == 13){
                doSearch();
            }
        });
        $('#A, #B, #C, #D, #E, #F, #G, #H, #I, #J, #K, #L, #M, #N, #O, #P, #Q, #R, #S, #T, #U, #V, #W, #X, #Y, #Z').click(function(event){
            var resultWidget = document.getElementById("Result");
            resultWidget.innerHTML = ' <div id="resultList">'+"Sie wünschen die Ergebnisse für den Buchstaben "+event.target.id+' </div>';
        })
    });
   
  
    
   var doSearch = function(){
       var currentSearch = document.getElementById("tftext").value;
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://localhost:8983/solr/gettingstarted/select?q=*%3A*&fq=answer:'+currentSearch.charAt(0).toUpperCase()+currentSearch.substring(1)+'&wt=json&indent=true'
            //    http://localhost:8983/solr/gettingstarted/select?q=*:*&fq=answer:Copernicus&wt=json
        });

   	    Manager.addWidget(new AjaxSolr.ResultWidget({
      	     id: 'result',
            target: '#docs'
        }));
	
       Manager.addWidget(new AjaxSolr.TextWidget({
           id: 'text',
           target: '#search'
       }));
        Manager.init();
        Manager.store.addByValue('q', '*:*');
        Manager.doRequest();
   };  
   
})(jQuery);




