(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
    beforeRequest: function(){
         $(this.target).empty();
         $(this.target).append('<div class="resultList"><h2 class="answer">Einen Moment bitte...</h2></div>');
        $("#navigation").css("display", "block");
        $("#feedback").css("display", "none");
    },

    afterRequest: function () {
    $(this.target).empty();
        
    /*
    *   If it is a search result
    */
    if($(this.id).selector == "result"){
        var resultWidget  = document.getElementById("docs"),
            currentSearch = document.getElementById("tftext").value.charAt(0).toUpperCase()
                            +document.getElementById("tftext").value.substring(1);
        if(currentSearch.charAt(0)==0){//if not defined
            $(this.target).append(this.template("NF",0)); 
        }
        else {//normal search
            if(this.manager.response.response.docs.length > 0){//if there is any hit
                    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.template(doc,i));
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
                    $(this.target).append(this.template("NF",0)); 
                }
            }
        }  
    }
        
        
        
    /*
    *   If it is a random
    */    
    if(this.manager.response.response.numFound > 0){
        if($(this.id).selector == "random"){
             $("#navigation").css("display", "none");
             var doc = this.manager.response.response.docs[0];
             $(this.target).append(this.template(doc,0)); 
        }
        else if($(this.id).selector == "letter"){
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.letterizer(doc,i));
             } 
        }
        else if($(this.id).selector == "number"){
              $("#navigation").css("display", "none");
              $("#feedback").css("display", "block");
              $("#feedback").text("Hier sehen sie die neuesten Einträge");
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.letterizer(doc,i));
             } 
         }
    }
    else{
             $("#navigation").css("display", "none");
             $(this.target).append(this.template("NF",0)); 
    }
  },

  template: function (doc, i) {
      var output = '<div class="resultList">';
      if(doc == "NF"){
            output += ' <div>'+"Ergebnis: "+"Leider keine Ergebnisse. Versuchen Sie es doch mit einer anderen Eingabe."+' </div>';
      }
      else{//Normal Search
            if(doc.round != undefined)output += '<div class="left">'  + "Runde: " +doc.round + '</div>';
            if(doc.value != undefined)output += '<div class="rightened">'  + "Wert: " +doc.value + '</div>';
            if(doc.answer != undefined)output += '<h2 class="answer">' + doc.answer + '</h2>';
            if(doc.question != undefined)output += '<p>' + doc.question + '</p>';
            output += '<p>' + "           " + '</p>';    
            if(doc.category != undefined){
                output += '<div id="catOf'+i+'" class="left clickObject">'  + "Kategorie: " +doc.category + '</div>';
                $('body').on('click', '#catOf' + i, function() {
                    $('#tftext').val('* AND category:\''+doc.category+'\'');
                    $('#tfbutton').click();
                });
            }
            if(doc.air_date != undefined)output += '<div class="rightened">' + "Datum: " +doc.air_date + '</div>';
      }
      output += '</div>';
      return output;
  },
    
  letterizer: function (doc,i) {
      if(doc.answer != undefined){
          var output = '<div id=letter'+i+' class="resultList answer clickObject">'+doc.answer+'</div>';
          $('body').on('click', '#letter' + i, function() {
              $('#tftext').val(doc.answer);
              $('#tfbutton').click();
          });
          return output;
      }
      return null;
  },
    
 
  
});
})(jQuery);

