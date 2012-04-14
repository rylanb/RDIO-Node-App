var last_tagline = 0,
  last_albums = [],
  update_freq = 5000,
  last_state = null;

$("#ctrl-play").hide();
$("#ctrl-pause").hide();

/*
  Rdio stuff
*/
function pickRandomSong() {
  do {
    var rand_s = Math.floor(Math.random()*albums.length);
  } while(!$.inArray(rand_s, last_albums));
  console.log(albums)
  if(last_albums.length == (albums.length-1)) last_albums = [];
  last_albums.push(rand_s);
  return albums[rand_s];
}
function changeSong() {
  //start the album
  last_state = null;
  var album = pickRandomSong();
  player.rdio_play(album.key);

  $("#album-name").html('<a target="_blank" href="'+album.shortUrl+'">'+album.name+'</a>');
  $("#band-name").text(album.artist);
  $("#album-image").html($('<img/>').attr("src", album.icon));
}
var player;
var rdioListener = {
  ready: function() {
    player = document.getElementById("CTplayer");
    changeSong();
  },
  playStateChanged: function(state) {
    if(state == 0 || state == 2 || state == 4) {
      $("#ctrl-play").show();
      $("#ctrl-pause").hide();
    } else {
      $("#ctrl-play").hide();
      $("#ctrl-pause").show();
    }

    if(state == 2 && last_state !== null) {
      changeSong();
    }

    last_state = state;
  }
};
var flashvars = {
  playbackToken: playbackToken,
  domain: encodeURIComponent(document.domain),
  listener: 'rdioListener'
};
var params = {
  'allowScriptAccess': 'always'
};
swfobject.embedSWF("http://www.rdio.com/api/swf/", "CTplayer", "1", "1", "9.0.0","", flashvars, params);

//listeners
$("#ctrl-play").click(function(e){
  e.preventDefault();
  player.rdio_play();
  return false;
});
$("#ctrl-pause").click(function(e){
  e.preventDefault();
  player.rdio_pause();
  return false;
});
$("#next-album").click(function(e){
  e.preventDefault();
  changeSong();
  return false;
});
