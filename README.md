#Algolia Take-Home

## Synopsis

This repository is the WIP for the Algolia Take-Home Assignment detailed here: [Solutions Hiring Assignment](https://github.com/algolia/solutions-hiring-assignment)

## Objectives and Status

**Download the project files**

- _Status:_ Completed.

**Push the provided dataset to an Algolia index**

- _Status:_ Completed. My account is active on Algolia: VDT23XTJX8 with the indices: restaurants (from restaurants\_list.json) and restaurant\_info (from restaurants\_info.csv).

**Produce the HTML markup and CSS needed to reproduce the UI provided by the client. To do so, you can write vanilla CSS or with a processor of your choice. We've provided configs for Sass and LESS**

- _Status:_ I have commited and pulled in a branch called 'basic-layout' with CSS configurations in my repo here: [Lily-Brown-algolia-takehome](https://github.com/Lily-Brown/algolia-takehome) You can also see below (in [Chanllenges](## Challenges), the front-end changes I have made to the application.

**Using the Algolia JS Helper, implement an as-you-type search experience that enables users to easily find restaurants: both by passing a search query and/or filtering on the “type of cuisine”**

- _Status:_ See [Challenges](## Challenges) for the various attempts made at implementing algolia's instantaneous search to filter results.

**Leverage the user’s location to show restaurants closer to them higher in the results—with a fallback if they dont’t allow for geolocation permissions in the browser**

- _Status:_ Since I had not completed the above Objective, I did not move on to this one.

## Challenges

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

## Customer Questions

The responses to the Customer Questions included in the Solutions Assignment can be found here: https://github.com/Lily-Brown/algolia-takehome/blob/master/customer-questions.md

## Future Work

Algolia has an amazing search API honestly impresses me with its speed and responsiveness. I would be interested in the future to learn more about:

- Customizing widgets for InstantSearch
- Undersetanding what exactly is going on behind the scenes of InstantSearch
- (Obviously) Being able to search on multiple indexes
- What other features, front-end layouts, facets and filters are available 
