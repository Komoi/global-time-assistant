var appRouter = function(app) {
app.get("/", function(req, res) {
      res.send("Hello World");
  });

app.post("/local_time", function(req, res) {
	  //res.setHeader("Content-Type", "application/json" );
	 // res.writeHead(200);
	 //res.set('Content-Type', 'application/json');

	  textResponse = "" //Default response from the webhook to show it's working

		var requestScrape = require("request");

		requestScrape({
		  uri: "https://www.humblebundle.com/monthly/p/february_2018_monthly",
		}, function(error, response, body) {
		    var string=body.substring(body.lastIndexOf("sections:")+9 ,body.lastIndexOf(",\n  user_will_receive_future_months:"));

		  console.log(string);

		 // string = '[{"human_name": "Life is Strange Complete Season (Episodes 1-5)", "id": "lifeisstrange_complete"}, {"human_name": "Tacoma", "id": "tacoma"}, {"human_name": "Sid Meiers CivilizationVI", "id": "civilization6"}, {"human_name": "Owlboy", "id": "owlboy"}, {"human_name": "Black the Fall", "id": "blackthefall"}, {"human_name": "Snake Pass", "id": "snakepass"}, {"human_name": "The Norwood Suite", "id": "thenorwoodsuite"}, {"human_name": "Fortune-499", "id": "fortune499"}]'

		var objsArray = []
		  var jsonObj = JSON.parse(string);
		for(var i in jsonObj)
		{
			var finalGame = unescape(jsonObj[i].human_name).replace(/(\r\n|\n|\r)/gm,"")
		 // console.log(finalGame);
		  textResponse = textResponse + (finalGame + ", ")
		}


console.log(textResponse)


		  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  		  res.send(JSON.stringify({ "speech": textResponse, "displayText": textResponse   }));

		});





	/*res.json({
"messages": [
  {
    "speech": "It is 4pm in there",
    "type": 0
  },
  {
    "displayText": "It is 4pm in there",
    "type": 0
  }
]
});
*/
      //res.send("\"messages\": [\r\n  {\r\n    \"speech\": \"It is 4pm in there\",\r\n    \"type\": 0\r\n  },\r\n  {\r\n    \"speech\": \"It is 4pm in there\",\r\n    \"type\": 0\r\n  }\r\n]");
  });

}


module.exports = appRouter;
