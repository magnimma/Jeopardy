var Manager;
(function ($) {
  $(document).on("searched", function(){
    var currentSearch = document.getElementById("tftext").value;
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/gettingstarted/select?q=*%3A*&fq='+currentSearch+'&wt=json&indent=true'
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
  });
})(jQuery);