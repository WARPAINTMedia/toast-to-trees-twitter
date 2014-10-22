var content = document.querySelector('.content');
var socket = io('http://localhost:8000');

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
  var profile = (tweet.user.profile_image_url_https).replace('_normal', '');
  var newElem = document.createElement('div');
  // <img src=\""+profile+"\" height=\"200\" width=\"200\" title=\""+tweet.user.screen_name+"\">
  var template = "<div class=\"tweet-image\" ><a href=\"https://twitter.com/"+tweet.user.screen_name+"\" title=\""+tweet.user.screen_name+"\"></a><a href=\"https://twitter.com/@"+tweet.user.screen_name+"\" class=\"tweet-user\">@"+tweet.user.screen_name+"</a></div><div class=\"tweet-text\"><p>"+tweet.tweet+"</p></div>";
  newElem.className = 'tweet';
  if (typeof(tweet.entities.media) === 'object') {
    Array.prototype.slice.call(tweet.entities.media, 0).forEach(function(item){
      template += "<div class=\"tweet-media\"><img src=\""+item.media_url_https+"\" alt=\"\"></div>";
    });
  }
  newElem.innerHTML = template;
  var clearfix = document.createElement('div');
  clearfix.className = "clearfix";
  content.insertBefore(clearfix, content.firstChild);
  content.insertBefore(newElem, content.firstChild);
  loadedImage(profile, function(temp) {
    newElem.querySelector('.tweet-image a').appendChild(temp);
    newElem.classList.add('fadeIn');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  socket.on('tweet', handleTweet);
});
