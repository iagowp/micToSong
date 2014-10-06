var recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
  console.log(event)
  //get what was said in the mic
  var song = event.results[0][0].transcript;
  console.log(song)
  // query spotify for it
  $.get( "http://ws.spotify.com/search/1/track.json?q="+ song, function( data ) {
    console.log(data)
    // check if the query returned any song
    resultsNum = data.info.num_results; // this property can be used to return more results
    if(resultsNum === 0){
      alert("Search failed. Sorry, try again please.")
    } else {
      var songs = data.tracks;
      console.log(songs);

      var index = $('#popularity').val();

      if(index === 'r'){
        index =  Math.floor(Math.random() * 99);
      }
      if(index > resultsNum) index = resultsNum;

      console.log(index)
      
      // build the url to redirect
      var url = "https://open.spotify.com/track/" + songs[index].href.split(":")[2]
      console.log(url);
      // redirect user to spotify
      window.location = url;     
    }
  });
};

var appStart = function(){
  recognition.lang = $('#language').val(); // need to change this when transforming the ajax function into vanilla javascript
  recognition.start();
};


/* todo: 
  make pure javascript ajax call
  give options to choose language -> this looks like a good place to get that data: http://msdn.microsoft.com/en-us/library/ms533052(v=vs.85).aspx
  if confidence on the result is low, tell user to say it again
  give options to choose in terms of popularity -> right now is most popular, make it able to choose least popular, or a determined number
  option to get more results
  Make a css file, this looks bad
  make it deal with errors more gracefully
  sort the array by popularity, instead of just selecting most popular song
  find a lyrics api
    let the user choose wether hes saying song title/band title or lyrics
    in case its a lyric, query the lyric api
    find the name of the song on the result
    query spotify for the name of the song
    success
  Chrome extension
  add a sign a of life to people waittin
*/