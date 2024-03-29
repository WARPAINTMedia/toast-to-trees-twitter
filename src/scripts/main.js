var content = document.querySelector('.content');

function loadedImage(url, callback) {
  // create a new image
  var temp = new Image();
  temp.setAttribute('height', '200');
  temp.setAttribute('width', '200');
  // set the event listener before the src change
  temp.addEventListener('load', function() {
    // if the counter has not reached its limit
    callback(temp);
  });
  // set the src based on an array of images
  temp.src = url;
}

function handleTweet(tweet) {
  // parse that string
  tweet = JSON.parse(tweet);
  // dont serve the tiny profile pics
  var profile = (tweet.user.profile_image_url_https).replace('_normal', '');
  var newElem = document.createElement('div');
  newElem.className = 'tweet';
  // <img src=\""+profile+"\" height=\"200\" width=\"200\" title=\""+tweet.user.screen_name+"\">
  var template = "<div class=\"tweet-image\" ><a href=\"https://twitter.com/"+tweet.user.screen_name+"\" title=\""+tweet.user.screen_name+"\"></a><a href=\"https://twitter.com/@"+tweet.user.screen_name+"\" class=\"tweet-user\">@"+tweet.user.screen_name+"</a></div><div class=\"tweet-text\"><p>"+tweet.tweet+"</p></div>";
  // if there are image attachments
  if (typeof(tweet.entities.media) === 'object') {
    Array.prototype.slice.call(tweet.entities.media, 0).forEach(function(item){
      template += "<div class=\"tweet-media\"><img src=\""+item.media_url_https+"\" alt=\""+tweet.user.screen_name+" media attachment\"></div>";
    });
  }
  newElem.innerHTML = template;
  var clearfix = document.createElement('div');
  // thow in a clearfix
  clearfix.className = "clearfix";
  content.insertBefore(clearfix, content.firstChild);
  // insert the new tweet at the top of the container
  content.insertBefore(newElem, content.firstChild);
  // fadein the image when the profile pic has loaded
  loadedImage(profile, function(temp) {
    // inject the image into the tweet
    newElem.querySelector('.tweet-image a').appendChild(temp);
    newElem.classList.add('fadeIn');
  });
}

var socket = new eio.Socket('ws://localhost:3000');

document.addEventListener('DOMContentLoaded', function() {
  socket.on('open', function() {
    console.log('open');
    // socket.on('tweet', handleTweet);
    socket.on('message', handleTweet);
    socket.on('close', function() {
      console.log('disconnect');
    });
  });
});
