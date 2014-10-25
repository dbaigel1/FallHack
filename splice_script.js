/*
<body>
<script>
*/
    // These are the things you need:  an API key, the track ID, and the path to the track
    var apiKey = 'JYT16WJLIG6YRMXXT';
    var trackID = 'THE_TRACK_ID';
    var trackURL = 'audio/THE_AUDIO_FILE.mp3'

    // Set up the key variables
    var remixer;
    var player;
    var track;
    var remixed;

// The main function.
function init() {

    // Make sure the browser supports Web Audio.
    if (window.webkitAudioContext === undefined) {
        error("Sorry, this app needs advanced web audio. Your browser doesn't"
            + " support it. Try the latest version of Chrome");
    } else {
        
        // These set up the WebAudio playback environment, and create the remixer and player.
        var context = new webkitAudioContext();
        remixer = createJRemixer(context, $, apiKey);
        player = remixer.getPlayer();
        $("#info").text("Loading analysis data...");

        // The key line.  This prepares the track for remixing:  it gets
        // data from the Echo Nest analyze API and connects it with the audio file.
        // All the remixing takes place in the callback function.
        remixer.remixTrackById(trackID, trackURL, function(t, percent) {
            track = t;

            // Keep the user update with load times
            $("#info").text(percent + "% of the track loaded");
            if (percent == 100) {
                $("#info").text(percent + "% of the track loaded, remixing...");
            }

            // Do the remixing!
            if (track.status == 'ok') {
                // This array holds the chunks of audio that we're going to play back
                remixed = new Array();

                // This loops over each beat in the track.
                // If the index of the beat is a multiple of four, we append the beat to the playback array.
                for (var i=0; i < track.analysis.beats.length; i++) {
                    if (i % 4 == 0) {
                        remixed.push(track.analysis.beats[i])
                    }
                }
                $("#info").text("Remix complete!");
            }
        });
    }
}
/*
// Run the main function once the page is loaded.
window.onload = init;
</script>

Welcome to One.html
<div id='info'> </div>
<!-- These buttons will play and stop your remix.  -->
<button onClick="player.play(0, remixed);">Play!</button>
<button onClick="player.stop()">Stop!</button>
</body>
*/