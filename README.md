#Algolia Take-Home

## Synopsis

This repository is the WIP for the Algolia Take-Home Assignment detailed here: [Solutions Hiring Assignment](https://github.com/algolia/solutions-hiring-assignment)

## Objectives and Status

**Download the project files**

- _Status:_ Completed.

**Push the provided dataset to an Algolia index**

- _Status:_ Completed. My account is active on Algolia: VDT23XTJX8 with the index: _restaurants\_combined_.

**Produce the HTML markup and CSS needed to reproduce the UI provided by the client. To do so, you can write vanilla CSS or with a processor of your choice. We've provided configs for Sass and LESS**

- _Status:_ Completed. It is necessary to run: ```gulp sass``` to apply the styling.

**Using the Algolia JS Helper, implement an as-you-type search experience that enables users to easily find restaurants: both by passing a search query and/or filtering on the “type of cuisine”**

- _Status:_ Completed. See [Approach](https://github.com/Lily-Brown/algolia-takehome##Approach) for my method to create this integration.

**Leverage the user’s location to show restaurants closer to them higher in the results—with a fallback if they dont’t allow for geolocation permissions in the browser**

- _Status:_ Completed. Added 'aroundLatLngViaIP: true' to SearchParameters. 


## Installation

I have already used lily-brown.github.io for other purposes but if you want to interact with this project, follow the below instructions:

1 - Fork and clone this repository.

2 - CD into the project directory: ```> cd algolia-takehome```

3 - Install Node Packages: ```> npm install```

4 - Apply SASS: ```> gulp sass```

5 - Run the server: ```> gulp```

6 - Gulp should launch the app at: http://localhost:3000/.

## Approach

See: [Project-Challenges](https://github.com/Lily-Brown/algolia-takehome/blob/master/Project-Challenges.md) to see my First Iteration Challenges in trying to combine two indices. 

In this Iteration, I ended up writing a custom script ([combine.js](https://github.com/Lily-Brown/algolia-takehome/blob/master/combine.js)) that took in both the csv and json files provided and returned one json with the relavent data to search on, display, and facet.

### Faceting: Rating

To implement a Rating Facet, I added (in combine.js) a custom field to the _restaurants\_combined_ index called **rating**:

```javascript
line.rating = parseInt(line.stars_count).toString();
```

On display, I used the menu Widget with a custom transformData function to show filled/empty stars based on the **rating** value:

```javascript
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
}
```

### Faceting: Payment Options

To meet the requirement to show only: "American Express, Visa, Discover, and MasterCard" and to condense payment\_options to match the requirement: "Diners Club and Carte Blanche are Discover cards," I updated the **payment\_options** field (in combine.js):

```javascript
var payments = list.payment_options;
var mapPayments = payments.map(function(element) {
  if (element == 'Diners Club' || element == 'Carte Blanche') {
    return 'Discover';
  } else if (element == 'JCB' || element == 'Pay with OpenTable' || element == 'Cash Only') {
    return '';
  } else {
    return element;
  }
});
line.payment_options = mapPayments.filter(function(elem, index, self) {
  return ((index == self.indexOf(elem)) && (elem != ""));
})
```

## UI Screenshot

Screenshot of searching by neighborhood ("SOMA") and filtering by food_type ("Italian") and rating (three stars):

![UI](http://i.imgur.com/ZaUskNL.png)

## Customer Questions

The responses to the Customer Questions included in the Solutions Assignment can be found here: https://github.com/Lily-Brown/algolia-takehome/blob/master/customer-questions.md

## Future Work

Algolia has an amazing search API that honestly impresses me with its speed and responsiveness. I would be interested in the future to learn more about:

- Customizing widgets for InstantSearch
- Understanding what exactly is going on behind the scenes of InstantSearch
- Being able to search on multiple indexes
- What other features, front-end layouts, facets and filters are available 
