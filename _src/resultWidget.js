(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
    beforeRequest: function(){
         $(this.target).off();
         $(this.target).empty();
         $(this.target).append('<div class="resultList"><h2 class="answer">Network problem... You may wait or try again.</h2></div>');
         $("#navigation").css("display", "block");
         $("#feedback").css("display", "block");
    },

    afterRequest: function () {
    $(this.target).empty();
    if(this.manager.response.response.numFound > 0){
        var currentSearch = document.getElementById("tftext").value;
        if($(this.id).selector == ("result") && currentSearch.charAt(0)!=0){//normal search
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.template(doc,i));
             } 
        }  
        else if($(this.id).selector == ("cat")){//category search
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.template(doc,i));
             } 
        }  
        else if($(this.id).selector == "random"){// if it's a random search
             $("#navigation").css("display", "none");
             var doc = this.manager.response.response.docs[0];
             $(this.target).append(this.template(doc,0)); 
        }
        else if($(this.id).selector == "letter"){// if it's a letter search
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.letterizer(doc,i));
             } 
        }
        else if($(this.id).selector == "date"){// if it's a number search
             for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
                        var doc = this.manager.response.response.docs[i];
                        $(this.target).append(this.template(doc,i));
             } 
        }
    }
    else{//nothing found
        $(this.target).append(this.template("NF",0)); 
    }
  },

  template: function (doc, i) {
      var output = '<div class="resultList">';
      if(doc == "NF"){//if nothing is found
          var currentSearch = document.getElementById("tftext").value;
          $("#navigation").css("display", "none");
          $("#feedback").css("display", "block");
          $("#feedback").empty();
          $("#feedback").append('<h2>Result: Sadly you got no results.</h2>');
          $("#feedback").append('<p>Do you want to Google '+currentSearch+'?</p>');
          $("#feedback").append('<button id="google" class="button">Google it!</button>');
          $('body').on('click', '#google', function() {
              var str="http://www.google.de/search?hl=en&source=hp&q=" + currentSearch + "&aq=f&oq=&aqi=",
                  replaced=str.replace(" ","+");
              window.location.replace(replaced);
          });
          return null;
      }
      else{//Normal search
            if(doc.round != undefined)output += '<div class="left">'  + "Runde: " +doc.round + '</div>';
            if(doc.value != undefined)output += '<div class="rightened">'  + "Wert: " +doc.value + '</div>';
            if(doc.answer != undefined){
                output += '<h2 id="answerOf'+i+'" class="answer clickObject">' + doc.answer + '</h2>';
                $(this.target).on('click', '#answerOf' + i, function() {
                    $("#tftext").val(doc.answer);
                    $('#tfbutton').click();
                });
            }
            if(doc.question != undefined)output += '<p>' + doc.question + '</p>';
            if(doc.category != undefined){
                output += '<div id="catOf'+i+'" class="left clickObject">'  + "Kategorie: " +doc.category + '</div>';
                $(this.target).on('click', '#catOf' + i, function() {
                    $("#cattext").val(doc.category);
                    $('#catbutton').click();
                    $('#catOf'+i).off();
                });
            }
            if(doc.air_date != undefined){
                output += '<div id="dateOf'+i+'" class="rightened clickObject">' + "Datum: " +doc.air_date + '</div>';
                $(this.target).on('click', "#dateOf" + i, function() {
                    $("#datetext").val(doc.air_date);
                    $('#datebutton').click();
                });
            }
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

