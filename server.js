var io = require('socket.io')(8000);
var cfg = require('./config');
var tw = require('node-tweet-stream')(cfg);
var twitterparser = require('twitter-text');

var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("./public"));

//create node.js http server and listen on port
http.createServer(app).listen(3000);

tw.track('ldnont');

io.on('connection', function (socket) {
  tw.on('tweet', function(tweet){
    tweet.tweet = twitterparser.autoLink(tweet.text, {
      urlTarget:'_blank'
    });
    io.emit('tweet', tweet);
  });
  socket.on('disconnect', function () {
    io.sockets.emit('disconnected');
  });
});
