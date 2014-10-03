var song;
var recognition = new webkitSpeechRecognition();
var jsonData;
var index = 0;
var pop = 0;
var length;
recognition.lang = "en-GB";
recognition.onresult = function(event) {
  console.log(event)
  song = event.results[0][0].transcript;
  console.log(song)
  $.get( "http://ws.spotify.com/search/1/track.json?q="+ song, function( data ) {
    console.log(data)
    jsonData = data.tracks;
    console.log(jsonData);
    length = jsonData.length;
    for(var i = 0; i < length; i++){
      if(jsonData[i].popularity > pop){
        pop = jsonData[i].popularity;
        index = i;
      }
    }
    var url = "https://open.spotify.com/track/" + jsonData[index].href.split(":")[2]
    console.log(url);
    window.location=url;     
  });
}

recognition.start();

/* todo: 
  make pure javascript ajax call
  give options to choose language
  give options to choose in terms of popularity
*/