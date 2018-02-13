'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port %s...", server.address().port);
});


process.env.DEBUG = 'actions-on-google:*';

// We need the Assistant client for all the magic here
const Assistant = require('actions-on-google').ApiAiAssistant;
// To make our http request (a bit nicer)
const request = require('request');

// the actions we are supporting (get them from api.ai)
const ACTION_TIME_IN_LOCATION = 'tim_in_location';

// The end-points to our calls
const EXT_TIME_API_URL = "https://blockchain.info";
const EXT_CITY = "/q/24hrprice";
const EXT_COUNTRY = "/q/totalbc";

// [START Bitcoin Info]
const timeInfo = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('bitcoinInfoAction Request headers: ' + JSON.stringify(req.headers));
  console.log('bitcoinInfoAction Request body: ' + JSON.stringify(req.body));

  // Fulfill price action business logic
  function priceHandler (assistant) {
    request(EXT_TIME_API_URL + EXT_CITY, function(error, response, body) {
      // The fulfillment logic for returning the bitcoin current price
      console.log("priceHandler response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      const msg = "Right now the price of a bitcoin is " + body + " USD. What else would you like to know?";
      assistant.ask(msg);
    });
  }

  // The Entry point to all our actions
  const actionMap = new Map();
  actionMap.set(ACTION_TIME_IN_LOCATION, priceHandler);
  
  assistant.handleRequest(actionMap);
};
// [END Bitcoin Info]
const functions = require('firebase-functions');
exports.timeInfo = functions.https.onRequest( timeInfo );

