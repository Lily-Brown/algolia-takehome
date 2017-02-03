$(function () {

  function getTemplate(templateName) {
    return document.getElementById(templateName + '-template').innerHTML;
  }

  var search = instantsearch({
    appId: 'VDT23XTJX8',
    apiKey: '69344a2c6049b250105c46d2893a7c7d',
    indexName: 'restaurant_info',
    urlSync: true
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for Restaurants by Name, Cuisine, Location'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
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
    instantsearch.widgets.starRating({
      container: '#stars_count',
      attributeName: 'stars_count',
      max: 5,
      labels: {
        andUp: '& Up'
      },
      templates: {
        header: '<span class="side-bar-heading">Rating</span>'
      }
    })
  );

  search.start();
});
