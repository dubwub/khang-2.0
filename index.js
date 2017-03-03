const login = require("facebook-chat-api");
fs = require('fs');

var speakingVietnamese = false;
var lastMapleStoryTime = 0;
var lastShittyAnimeTime = 0;
var ohboyCounter = 0;

// generates random number from min to max inclusive
// used for generating 24
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// to be more realistic, this sends a response after length (usually >300) ms
// otherwise we might get flagged as a bot : (
function sendDelayedMessage(message, thread, api, length) {
	if (speakingVietnamese) {
		message = "sakdfysdf9y399y9sdfy9sdehfdhsfsdzlxckjxclkjjlkfjsdfiofichixuvhoishfiushdf";
	}
	setTimeout(function() {api.sendMessage(message, thread);}, length);
}

// read config credentials
// usage: config.txt should be user email, new line, user password
fs.readFile('config.txt', 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	data = data.split(/\r?\n/) // split by new line
	
	login({email: data[0], password: data[1]}, (err, api) => {
	    if(err) return console.error(err);

	    api.listen((err, message) => {
	    	if (message) {
	    		if (message.body == "khang speak english") {
		    		sendDelayedMessage("k", message.threadID, api, 100);
		    		speakingVietnamese = false;
		    	}
		    	else if (message.body == "khang speak vietnamese" || message.body == "khang speak jibberish") {
		    		sendDelayedMessage("k", message.threadID, api, 100);
		    		speakingVietnamese = true;
		    	}
		    	else if (message.body.toLowerCase() == "oh boy" ||
		    		message.body.toLowerCase() == "ohboy" ||
		    		message.body.toLowerCase() == "oboy" ||
		    		message.body.toLowerCase() == "oboi" ||
		    		message.body.toLowerCase() == "oh boy!") {
		    		ohboyCounter++;
		    		sendDelayedMessage("OH BOY ".repeat(ohboyCounter), message.threadID, api, 100);
		    	}
	    		else if (message.body == "khang introduce yourself") {
		    		sendDelayedMessage("hi my name is khang 2.0", message.threadID, api, 300);
		    		sendDelayedMessage("i havent played maplestory in " + (Date.now() - lastMapleStoryTime) + 
		    			" milliseconds. i havent watched shitty anime in " + (Date.now() - lastShittyAnimeTime) +
		    			" milliseconds.", message.threadID, api, 400);
		    	}
		    	else if (message.body == "khang is playing maplestory") {
		    		sendDelayedMessage("rip", message.threadID, api, 300);
		    		lastMapleStoryTime = Date.now();
		    	}
		    	else if (message.body == "khang is watching anime" || message.body == "khang is watching shitty anime") {
		    		sendDelayedMessage("rip", message.threadID, api, 300);
		    		lastShittyAnimeTime = Date.now();
		    	}
		    	else if (message.body == "24") {
		    		sendDelayedMessage("" + getRandomInt(1, 10) + " " + getRandomInt(1, 10) +
		    			" " + getRandomInt(1, 10) + " " + getRandomInt(1, 10), message.threadID, api, 100);
		    	}
	    	}
	    });
	});
});