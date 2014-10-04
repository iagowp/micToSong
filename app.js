var song;
var jsonData;
var index = 0;
var pop = 0;
var length;
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.onresult = function(event) {
  console.log(event)
  //get what was said in the mic
  song = event.results[0][0].transcript;
  console.log(song)
  // query spotify for it
  $.get( "http://ws.spotify.com/search/1/track.json?q="+ song, function( data ) {
    console.log(data)
    // check if the query returned any song
    if(data.info.num_results === 0){
      alert("Search failed. Sorry, but you can try again")
    } else {
      songs = data.tracks;
      console.log(songs);
      //just caching array length
      length = songs.length;
      //loop over the array to get most popular one
      for(var i = 0; i < length; i++){
        if(songs[i].popularity > pop){
          pop = songs[i].popularity;
          index = i;
        }
      }
      // build the url to redirect
      var url = "https://open.spotify.com/track/" + songs[index].href.split(":")[2]
      console.log(url);
      // redirect user to spotify
      window.location = url;     
    }
  });
}


/* todo: 
  make pure javascript ajax call
  give options to choose language
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
*/