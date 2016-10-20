/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var https = require('https');

app.get('/kbsso', function(req, res){	
	//console.log('req JSON header: '+JSON.stringify(req.headers));
	//console.log('req header: '+req.headers.authorization);

	var options = {
	  host: 'mobile.us.ibm.com',
      port: 15014,
      path: '/services/ppm/mobile/img/portal_logo.png',
	  method: 'GET',      
	  headers: {
		  'Authorization': req.headers.authorization
	  },
	  preventCache: true,
	  sync: true  
	};
	
	var request = https.get(options, function(response) {
	  console.log('STATUS: ' + response.statusCode);
	  //status = response.statusCode;
	  //console.log('REq HEADERS: ' + JSON.stringify(request.headers));
	  //console.log('HEADERS: ' + JSON.stringify(response.headers));
	  
	  response.on('data', function (chunk) {
		//console.log('BODY: ' + chunk);
	  });
	  response.on('end', function() {
		console.log('No more data in response.');
		//request.end();
		res.writeHead(response.statusCode);
		res.end("Welcome to SIH Knowledge Bite"); 
	  })
	  	
	});

	request.on('error', function(e) {
	  console.log('Error - problem with request: ' + e.message);
	});	
	request.end();
});

