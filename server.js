var engine = require('engine.io');
var cfg = require('./config');
var tw = require('node-tweet-stream')(cfg);
var twitterparser = require('twitter-text');

var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("./public"));

// create node.js http server and listen on port
var httpserver = http.createServer(app).listen(3000);
var server = engine.attach(httpserver);

tw.track('ldnont');

server.on('connection', function (socket) {
  console.log('connected');
  tw.on('tweet', function(tweet) {
    tweet.tweet = twitterparser.autoLink(tweet.text, {
      urlTarget:'_blank'
    });
    // engine.io, unline socket.io, cannot send JSON
    socket.send(JSON.stringify(tweet));
  });
});
