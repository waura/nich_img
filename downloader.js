var fs = require('fs');
var sys = require('sys');
var http = require('http');

function parse_url(url) {
    var urls = require('url').parse(url);
    return {
        "host" : urls.hostname,
        "port" : urls.port,
        "path" : [ urls.pathname, urls.search, urls.hash ].join('') || '/',
        "secure" : urls.protocol === 'https' ? true : false,
        "statusCode" : urls.protocol === 'https' ? 206 : 200,
        "header" : {
            "Host" : urls.hostname
        }
    };
}

function help(write_stream, url, target) {
    var myAgent = new http.Agent({maxSockets: 1});
    var urls = parse_url(url);
    var option = {
        host: urls.host,
        port: urls.port || 80,
        path: urls.path,
        method: 'GET',
        agent: myAgent
    };

    var request = http.request(option);
    request.end();
    
    request.on('response', function (response) {
        console.log("status = " + response.statusCode);
        if (response.statusCode == urls.statusCode) {
            response.on('end', function () {
                write_stream.end();
                console.log(['complete!', url, target].join(" "));
            });
            sys.pump(response, write_stream);
        }
        else {
            write_stream.end();
            var err = Error(response.statusCode + ":" + JSON.stringify(response.header));
            console.log(err);
        }
    });
    
    request.on('error', function (err) {
        console.log('failed request, ' + err.message);
    });
}

var downloader = {
    download : function (url, target) {
        target = target || require('path').basename(url);
    
        var write_stream = fs.createWriteStream(target);
    
        write_stream.on('open', function (fd) {
            help(write_stream, url, target);
        });
    
        write_stream.on('close', function (fd) {
            fs.stat(url, function (err, stat) {
                if ((!err) && (stat.size === 0)) {
                    fs.unlink(url);
                }
            });
        });
    
        write_stream.on('error', function (mes) {
            write_stream.destroy();
            console.log(mes);
        });
    }
}
module.exports = downloader;
