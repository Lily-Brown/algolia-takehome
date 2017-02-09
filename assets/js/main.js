$(function () {

  function getTemplate(templateName) {
    return document.getElementById(templateName + '-template').innerHTML;
  }

  var search = instantsearch({
    appId: 'VDT23XTJX8',
    apiKey: '69344a2c6049b250105c46d2893a7c7d',
    indexName: 'restaurants_combined',
    aroundLatLngViaIP: true,
    urlSync: true
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for Restaurants by Name, Location or Cuisine'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 4,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData: function (hit) {
        var stars = "";
        for(var i=0; i<hit.rating; i++) {
          stars += "★ "
        }
        for(var i=0; i<(5-hit.rating); i++) {
          stars += "☆ "
        }
        hit.stars = stars += "";
        return hit;
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats'
    })
  );

  search.addWidget(
    instantsearch.widgets.menu({
      container: '#food_type',
      attributeName: 'food_type',
      limit: 10,
      operator: 'or',
      templates: {
        header: '<span class="side-bar-heading">Cuisine/Food Type</span>'
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.menu({
      container: '#rating',
      attributeName: 'rating',
      limit: 5,
      sortBy: ['rating:desc'],
      templates: {
        header: '<span class="side-bar-heading">Rating</span>'
      },
      transformData: {
        item: function (item) {
          var rating = parseInt(item.name);
          var stars = "";
          for(var i=0; i<rating; i++) {
            stars += "★ "
          }
          for(var i=0; i<(5-rating); i++) {
            stars += "☆ "
          }
          item.name = stars += "";
          return item;
        }
      },
      cssClasses: {
        item: 'rating-facet'
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.menu({
      container: '#payment_options',
      attributeName: 'payment_options',
      limit: 10,
      operator: 'or',
      templates: {
        header: '<span class="side-bar-heading">Payment Options</span>'
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      maxPages: 20,
      scrollTo: false
    })
  );

  search.start();
});

function showMore() {
  $('#pagination').removeClass("hidden");
  $('#show-pagination').addClass("hidden");
}
