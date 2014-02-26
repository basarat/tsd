var request = require('request');
var program = require('commander');

program
    .version('0.0.1')
    .option('-p, --proxy <p>', 'Specify proxy url')
    .option('-e, --env', 'Use proxy from process.env')
    .parse(process.argv);

var urls = [
    'https://raw.github.com/borisyankov/DefinitelyTyped/master/package.json',
    'https://api.github.com/rate_limit',
];

function getProxy() {
    if (program.proxy && typeof program.proxy === 'string') {
        console.log('using proxy: ' + program.proxy);
        return program.proxy;
    }

    if (program.env) {
        proxyServer = process.env.HTTPS_PROXY ||
            process.env.https_proxy ||
            process.env.HTTP_PROXY ||
            process.env.http_proxy;

        if (proxyServer) {
            console.log('using proxy from env: ' + proxyServer);
            return proxyServer;
        }
        console.log('');
        console.log('no proxy in process.env !');
        return null;
    }
    console.log('dont use proxy');
    return null;
}

var proxyServer = getProxy();

function doTest() {
    if (urls.length === 0) {
        console.log('');
        console.log('done!');
        return;
    }
    var url = urls.shift();

    console.log('');
    console.log('testing: ' + url);

    var req = {
        headers: {
            'user-agent': 'tsd proxy-test'
        },
        url: url
    };
    if (proxyServer) {
        req.proxy = proxyServer;
    }

    request.get(req).on('response', function (res) {
        console.log('got a response');
        console.log('status %d', res.statusCode);

        // next
        doTest();
    });
}
// hit it!
doTest();
