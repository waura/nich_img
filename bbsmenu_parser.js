var bbsmenuParser = {
    parser: function (htmlData, callback) {
        var pattern;
        var lines = htmlData.split("\n");

        for (var i = 1, len = lines.length; i < len; i++) {
            var pattern = lines[i].match(/^<A HREF=(\S+)>(.+)<\/A><br>$/)
            if (pattern) {
                var bbs = {
                    name: pattern[2],
                    url: pattern[1]
                };
                callback(bbs);
            }
        }
    }
};

module.exports = bbsmenuParser;