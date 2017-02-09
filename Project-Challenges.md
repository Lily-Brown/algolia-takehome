#Take-Home Challenges

## First Iteration Challenges

My main challenge with this Assignment was integrating the information for both indices onto the front end as one object. There were 2 main attempts I made to try and accomplish this but neither panned out for me.

### InstantSearch Method 
_See: [Pull WIP Branch: algolia-instant-search](https://github.com/Lily-Brown/algolia-takehome/compare/algolia-instant-search?expand=1) on Github for code_

This implementation focused on allowing for different facets to filter down the data displayed on the page. I used InstantSearch to make this happen with the appropriate widgets attached. 

Example code of some of the widgets:

```javascript
  var search = instantsearch({
    appId: 'VDT23XTJX8',
    apiKey: '69344a2c6049b250105c46d2893a7c7d',
    indexName: 'restaurant_info',
    urlSync: true
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for Restaurants by ObjectID 😖🤷‍'
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
```

Unfortunately, there was a lot of configuration done behind the scenes here that I was unable to understand. Mainly, I wasn't sure where I would be able to create and search on a second index. I did some research on DerivedHelper but was only able to find this bit of documentation: [derive-multi-queries](https://community.algolia.com/algoliasearch-helper-js/reference.html#derive-multi-queries) without example usage.

As is, the current state of this implementation allows the user to filter by food\_type and stars\_count but the search bar only returns results for matches on ObjectID ... which is far from ideal.

See video:

[![InstantSearch](http://i.imgur.com/PY4yDmL.png)](https://www.dropbox.com/home/Public?preview=InstantSearch.mov "Click to Watch!")

https://dl.dropboxusercontent.com/u/14211788/InstantSearch.mov

### AlgoliaHelper Method 
_See: [Pull WIP Branch: algolia](https://github.com/Lily-Brown/algolia-takehome/compare/algolia?expand=1) on Github for code_

I created two algoliasearchHelpers for each of the indexes. The search bar uses the 'name' field from the _restaurant_ index to display results. 

```javascript
  var client = algoliasearch(applicationID, apiKey);
  var helper = algoliasearchHelper(client, index);
  var info_helper = algoliasearchHelper(client, info);
```

Before rendering the hits to the page, I tried iterating through the results of the first query to find and append the missing information to the result/hit object.

```javascript
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
        val.reviews_count = tempHit.reviews_count;
      });
    })
    renderHits(content);
  });
```

I then hoped to call on these values from within the renderHits function but was unable to make this happen. What is most confusing is that when I manipulate the object in the console, the values are defined. However, during run-time, they are displayed as 'undefined.'

```javascript
output = hit;
return "<div class='results-div'>" +
    "<div class='result-img'>" +
      "<img src='" + hit.image_url + "'>" +
    "</div>" +
    "<div class='result-info'>" +
      "<div class='result-heading'>" +
        hit._highlightResult.name.value +
      "</div>" +
      "<div class='result-rating'>" +
        "<span class='rating'>" + hit.stars_count + " &#9733; &#9733; &#9733; &#9733;</span> &#9734; (" + 
          hit.reviews_count + " reviews)" +                     
      "</div>" +
      "<div class='result-description'>" +
        hit.food_type + " | " + hit.neighborhood + " | " + hit.price_range + 
      "</div>" +
    "</div>" +
  "</div>";
```

<img src="http://i.imgur.com/XtEsqb7.png">

See video:

[![AlgoliaHelper](http://i.imgur.com/wHaEeb9.png)](https://www.dropbox.com/home/Public?preview=AlgoliaSearchHelper.mov "Click to Watch!")

https://dl.dropboxusercontent.com/u/14211788/AlgoliaSearchHelper.mov