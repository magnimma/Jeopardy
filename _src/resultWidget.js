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
    var result = "";
    result =this.manager.response.response.docs[0].question[0];
    var template = ' <div id="resultList">'+result+' </div>';
    document.getElementById("Result").innerHTML =template; 
        
    
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

