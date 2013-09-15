var request = require('request');
var Iconv = require('iconv').Iconv;
var conv = new Iconv('Shift_JIS', 'UTF-8//TRANSLIT//IGNORE');
var bbsmenuParser = require("bbsmenu_parser");

var urlOpts = {
    uri: "http://menu.2ch.net/bbsmenu.html",
    encoding: null
};

request(urlOpts, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        body = conv.convert(body).toString();
        
        var bbsmenu = [];
        bbsmenuParser.parser(body, function (bbs) {
            bbsmenu.push(bbs);
        });
        console.log(JSON.stringify(bbsmenu, null, "  "));
    }
});