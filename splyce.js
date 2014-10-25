var apiKey = "JYT16WJLIG6YRMXXT";
var request = new XMLHttpRequest();
	
function getSongs(){
		
	var artist;
		
	artist = document.getElementById("artist").value;
		
	request.open("GET", "http://developer.echonest.com/api/v4/artist/songs?", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			console.log(request.responseText);
		}
	}
	request.send("api_key="+apiKey+"&name=Weezer");
	
}

function printSongs(){
	// FUNCTION HERE
}