var request = require('request');
var async = require('async');
var https = require('https');

var BASE_URL = 'https://thethirdpole.net/';


module.exports = {

  aliases: ['ttp', 'thethirdpole', 'third pole'],

  pingAndSend: function (callback) {

    request('http://node-hnapi.herokuapp.com/news', function(err, response, items) {
      if (err || response.statusCode != 200) {
        callback(err);
      }

      items = JSON.parse(items);

      var botPayload = 'Current Third Pole homepage:\n'

      var index = 0;
      async.forEach(items, function(item, cb) {
        var url = item.url;
        if (item.url.indexOf('http') !== 0) {
          url = BASE_URL + item.url
        }

        botPayload += '<%url%|%rank%. %title%>\n'
                        .replace('%url%', url)
                        .replace('%rank%', index + 1)
                        .replace('%title%', item.title);
        index++;
        cb();
      }, function(err) {

        var payload = {
          text: botPayload,
          username: 'thethirdpole'
        };

        callback(null, payload);
      });
    });

  }

}
