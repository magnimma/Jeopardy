(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
    
    /*
    facetLinks: function (facet_field, facet_values) {
      var links = [];
      if (facet_values) {
        for (var i = 0, l = facet_values.length; i < l; i++) {
          links.push(
            $('<a href="#"></a>')
            .text(facet_values[i])
            //.click(this.facetHandler(facet_field, facet_values[i]))
          );
        }
      }
      return links;
    },
    */

    afterRequest: function () {
        
        
        
    var question        = "",
        answer        = "",
        resultWidget  = document.getElementById("Result"),
        currentSearch = document.getElementById("tftext").value.charAt(0).toUpperCase()
                        +document.getElementById("tftext").value.substring(1);
    if(currentSearch.charAt(0)==0){//if not defined
         var template = ' <div id="resultList">'+"Undefined"+' </div>';
         resultWidget.innerHTML = template; 
    }
    else if(currentSearch.charAt(0)>0 && currentSearch.charAt(0)<=9){//if it's an calculation
         var template = ' <div id="resultList">'+"Ergebnis: "+currentSearch+" = "+eval(currentSearch)+' </div>';
         resultWidget.innerHTML = template; 
    }
    else {//normal search
        if(this.manager.response.response.docs.length > 0){//if there is any hit
            question = this.manager.response.response.docs[0].question[0];
            answer = this.manager.response.response.docs[0].answer[0];
            var found = false;
            for(var i = 0; i<answer.length; i++){
                if(answer.substring (i,i+currentSearch.length) == currentSearch){
                    found = true;
                    break;
                }
            }
        
            if(found == true){//if there is a direct match in the answers
                console.log(answer);
                var template = ' <div id="resultList"><p style="text-decoration: underline; font-weight: bold;">Ergebnis(se) für: '+answer+'</p>';
                var questions = this.manager.response.response.docs;
                for ( var j = 0; j < questions.length ; j++){
                    template += '<p>'+questions[j].question[0]+'</p>';
                }
                template += '<p>'+question+'</p>';
                resultWidget.innerHTML =template; 
            }
            else{//if there are one or more matches in the questions and none in the answers
                var template = ' <div id="resultList">Hier eventuell Treffer in den Fragen anzeigen?</div>';
                resultWidget.innerHTML =template; 
            }
        }
        else{//if there is no single hit
            
            var txt;
            var r = confirm("Leider keine Ergebnisse. Möchten Sie in Google nach "+currentSearch+" suchen?");
            if (r == true) {
                var str="http://www.google.de/search?hl=en&source=hp&q=" + currentSearch + "&aq=f&oq=&aqi=";
                var replaced=str.replace(" ","+");
                window.location.replace(replaced)
            } else {
                var template = ' <div id="resultList">'+"Ergebnis: "+"Leider keine Ergebnisse. Versuchen Sie es doch mit einer anderen Eingabe."+' </div>';
                resultWidget.innerHTML =template; 
            }
            
            
        }
    }
        
    
        
        
        
        
        
        
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));
      /*
      var items = [];
      items = items.concat(this.facetLinks('topics', doc.topics));
      console.log(items);
      items = items.concat(this.facetLinks('organisations', doc.organisations));
      console.log(items);
      items = items.concat(this.facetLinks('exchanges', doc.exchanges));
      console.log(items);
      var $links = $('#links_' + doc.id);
      $links.empty();
      for (var j = 0, m = items.length; j < m; j++) {
        $links.append($('<li></li>').append(items[j]));
      }
      */
    }
  },

  template: function (doc) {
      /*
  var snippet = '';
  if (doc.text.length > 300) {
    snippet += doc.dateline + ' ' + doc.text.substring(0, 100);
    snippet += '<span style="display:none;">' + doc.text.substring(100);
    snippet += '</span> <a href="#" class="more">more</a>';
  }
  else {
    snippet += doc.dateline + ' ' + doc.text;
  }

  var output = '<div><h2>' + doc.title + '</h2>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;*/
      return null;
},
  
  /*
  init: function () {
  $(document).on('click', 'a.more', function () {
    var $this = $(this),
        span = $this.parent().find('span');

    if (span.is(':visible')) {
      span.hide();
      $this.text('more');
    }
    else {
      span.show();
      $this.text('less');
    }

    return false;
  });
} 
*/
  
});
})(jQuery);

