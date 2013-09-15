var request = require('request'),
iconv = require "iconv"

request({ uri: 'http://www.google.com', encoding: null }, function (error, response, body) {
    var conv;
    if (!error && response.statusCode == 200) {
        conv = new iconv.Iconv('Shift_JIS','UTF-8//TRANSLIT//IGNORE');
        body = conv.convert(body).toString();
    }
});
