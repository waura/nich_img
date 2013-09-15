var util = require("util");

var datParser = {
    parse: function (datData, callback) {
	var pattern;
	var lines = datData.split("\n");

	if (lines.length > 1) {
	    var pattern = lines[0].match(/^ <.*>(.*)<.*><.*>(.*)<.*><.*>(.*)<.*>(.+) (.+) ID:(.+)<>(.*)<>(.*)$/);
	    if (pattern) {
		console.log("title = " + pattern[8]);
		var dat = {
		    resNumber: i + 1,
		    name: pattern[1],
		    location: pattern[2],
		    mail: pattern[3],
		    date: pattern[4],
		    time: pattern[5],
		    id: pattern[6],
		    resData: pattern[7]};
		//console.log(dat);
		callback(dat);
	    }
		
	    for (var i = 1, len = lines.length; i < len; i++) {
		var pattern = lines[i].match(/^ <.*>(.*)<.*><.*>(.*)<.*><.*>(.*)<.*>(.+) (.+) ID:(.+)<>(.*)<>$/);
		if (pattern) {
		    var dat = {
			resNumber: i + 1,
			name: pattern[1],
			location: pattern[2],
			mail: pattern[3],
			date: pattern[4],
			time: pattern[5],
			id: pattern[6],
			resData: pattern[7]};
		    //console.log(dat);
		    callback(dat);
		}
		else {
		    //console.log("unmatch");
		}
	    }
	}
    }
};

module.exports = datParser;
