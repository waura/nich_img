var request = require('request');
var Iconv = require("iconv").Iconv;
var conv = new Iconv("Shift_JIS","UTF-8//TRANSLIT//IGNORE");
var datParser = require("dat_parser");
var downloader = require("downloader");

var datName = "1375263275.dat"
var urlOpts = {
    uri: "http://hayabusa3.2ch.net/news/dat/" + datName,
    encoding: null
};

function getExt(url) {
    var ext = url.match(/^http:\/\/.+\.(.*?)$/);
    if (ext) {
	return ext[1];
    }
    return null;
}
function isImageUrl(url) {
    var imageExts = [
	"jpg", "JPG",
	"png", "PNG",
	"gif", "GIF",
	"bmp",
    ]
    var ext = getExt(url);
    if (ext) {
	for (var i = 0, len = imageExts.length; i < len; i++) {
	    if (ext === imageExts[i]) {
		return true;
	    }
	}
    }
    return false;
}

request(urlOpts, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        body = conv.convert(body).toString();
	datParser.parse(body, function (dat) {
	    var pattern = dat.resData.match(/http:\/\/.+?\s+/g);
	    if (pattern) {
		for (var i = 0, len = pattern.length; i < len; i++) {
		    pattern[i] = pattern[i].replace(/\s+/g, "");
		    if (isImageUrl(pattern[i]) == true) {
			console.log(pattern[i]);
			
			var url = require('url').parse(pattern[i]);
			var destPath = "download/" + i + "." + getExt(pattern[i]);
			downloader.download(pattern[i], destPath);
		    }
		}
	    }
	});
	//console.log(body);
    }
    else {
	console.log("status = " + response.statusCode);
    }
});
