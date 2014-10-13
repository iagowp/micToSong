micToSong
=========

DEMO: http://iagowp.github.io/micToSong/

TL:DR; Receives input from Microphone, and redirects you to a Spotify Song

This little app uses voice recognition to detect what you say, than it looks on Spotify for that song. Spotify will return a list with up to 100 songs, than the app will select either the most popular, the least popular or a random song, and redirect you to the song.

If you want to contribute, some mapped features to be added:

give options to choose all languages -> this looks like a good place to get that data: http://msdn.microsoft.com/en-us/library/ms533052(v=vs.85).aspx

if confidence on the result(of what the person said) is low, tell user to say it again


option to get more results


Make a css file, this looks bad


make it deal with errors more gracefully


find a lyrics api
  let the user choose wether hes saying song title/band title or lyrics
  in case its a lyric, query the lyric api
  find the name of the song on the result
  query spotify for the name of the song
  success


Chrome extension


add a sign a of life to people waitting

open in new tab