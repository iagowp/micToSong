// https have a problem with calling spotify api with a http protocol, so I force http
if(window.location.href === "https://iagowp.github.io/micToSong/"){
  window.location = "http://iagowp.github.io/micToSong/";
}
// variable used to control wether or not the ajax function is running when the recognition triggers onend
var started = false;
var recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
  started = true;
  //get what was said in the mic
  var song = event.results[0][0].transcript;
  console.log(song);
  // making a ajax request, and sending function to be executed with result
  query(song, function(data){
    resultsNum = data.info.num_results; // this property can be used to return more results
    // check if the query returned any song
    if(resultsNum !== 0){
      var songs = data.tracks;
      var index = document.getElementById('popularity').value;
      // select is on random
      if(index === 'r'){
        index =  Math.floor(Math.random() * 99);
      }
      // put it on the last song, in case the result is smaller than the option chosen
      if(index > resultsNum){
        index = resultsNum-1;
      }
      // build the url to redirect
      var url = "https://open.spotify.com/track/" + songs[index].href.split(":")[2];
      // redirect user to spotify
      window.location = url;   
    } else {
      alert("Search failed. Sorry, try again please.");
    }
  });

};
// make a query to spotify, and apply callback on result
var query = function(song, callback){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    // state 4 is when it gets a result
    if(request.readyState === 4){
      // parse JSON result from ajax
      var data = JSON.parse(request.responseText);

      callback(data);
    }
  };

  request.open("GET", "http://ws.spotify.com/search/1/track.json?q="+ song, true);
  request.send();
};
//when it ends, and theres no result, warn person
recognition.onend = function(){
  if(started === false){
    alert("Sorry, I couldn't understand what you said, could you try again?");
  } else {
    started = false;
  }
};

var appStart = function(){
  recognition.lang =  document.getElementById('language').value;
  recognition.start();
};


/* todo:
  open in new tab
  give options to choose language -> this looks like a good place to get that data: http://msdn.microsoft.com/en-us/library/ms533052(v=vs.85).aspx
  if confidence (need to define how much is low) on the result(of what the person said) is low, tell user to say it again
  option to get more results
  Make a css file, this looks bad
  make it deal with errors more gracefully
  find a lyrics api
    let the user choose wether hes saying song title/band title or lyrics
    in case its a lyric, query the lyric api
    find the name of the song on the result
    query spotify for the name of the song
    success
  make it a Chrome extension
  add a sign a of life to people waittin
*/