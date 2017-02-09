var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile = 'restaurants_info.csv';

var restaurants_info = [];

var parser = parse({delimiter: ';'}, function (err, data) {
  data.forEach(function(line,key) {
    var object = {};
    object = {
      objectID: line[0],
      food_type: line[1],
      stars_count: line[2],
      reviews_count: line[3],
      neighborhood: line[4],
      phone_number: line[5],
      price_range: line[6],
      dining_style: line[7]
    }
    restaurants_info = restaurants_info.concat(object);
  })
  var restaurants_list = require('./restaurants_list.json');
  combineLists(restaurants_info, restaurants_list);
})

fs.createReadStream(inputFile).pipe(parser);

var combineLists = function(restaurants_info, restaurants_list) {
  restaurants_info.forEach(function(line, key) {
    restaurants_list.forEach(function(list, key) {
      if(list.objectID == line.objectID) {
        line.name = list.name;
        line.image_url = list.image_url;
        line._geoloc = list._geoloc;
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
      }
    });
    line.rating = parseInt(line.stars_count).toString();
  });
  var json = JSON.stringify(restaurants_info);
  fs.writeFile('restaurants_combined.json', json);
}