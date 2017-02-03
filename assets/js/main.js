$(function () {
  console.log('Page loaded');

  //Config
  var applicationID = 'VDT23XTJX8';
  var apiKey = '69344a2c6049b250105c46d2893a7c7d';
  var index = 'restaurants';
  var info = 'restaurant_info';

  var client = algoliasearch(applicationID, apiKey);
  var helper = algoliasearchHelper(client, index);
  var info_helper = algoliasearchHelper(client, info);
  
  helper.setQueryParameter('hitsPerPage', 10);

  helper.on('result', function(content) {
    content.hits.forEach(function(val,index) {
      var objectID = val.objectID;
      info_helper.setQueryParameter('hitsPerPage', 1);
      info_helper.setQuery(objectID)
          .search();
      info_helper.on('result', function(info_content) { 
        var tempHit = info_content.hits[0];
        val.food_type = tempHit.food_type;
        val.stars_count = tempHit.stars_count;
        val.price_range = tempHit.price_range;
        val.dining_style = tempHit.dining_style;
      });
    })
    console.log("content:",content);
    renderHits(content);
  });

  function renderHits(content) {
    $('#container').html(function() {
      return $.map(content.hits, function(hit) {
        console.log('hit',hit.food_type);
        output = hit.food_type
        return "<div class='results-div'>" +
                  "<div class='result-img'>" +
                    "<img src='" + hit.image_url + "'>" +
                    // "<img src='http://www.bluestembrasserie.com/images_homepage/4.jpg'>" +
                  "</div>" +
                  "<div class='result-info'>" +
                    "<div class='result-heading'>" +
                      hit._highlightResult.name.value +
                      // "RESTAURANT NAME" +
                    "</div>" +
                    "<div class='result-rating'>" +
                      // "<span class='rating'>4.1 &#9733; &#9733; &#9733; &#9733;</span> &#9734; (1897 reviews)" +
                      "<span class='rating'>" + hit._highlightResult.food_type + " &#9733; &#9733; &#9733; &#9733;</span> &#9734; (1897 reviews)" +                      
                    "</div>" +
                    "<div class='result-description'>" +
                      "American | Downtown / Union Square | $31 to $50" +
                    "</div>" +
                  "</div>" +
                "</div>";
      });
    });
  }

  $('#search-box').on('keyup', function() {
    helper.setQuery($(this).val())
          .search();
  });

  helper.search();
});
