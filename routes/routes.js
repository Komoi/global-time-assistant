const ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
let dateAndTime = require('date-and-time');


var appRouter = function(app) {

app.use(bodyParser());



app.get("/", function(req, res) {
      res.send("Hello World");
  });

app.post("/local_time", jsonParser, function(req, res) {
	  //res.setHeader("Content-Type", "application/json" );
	 // res.writeHead(200);
	 //res.set('Content-Type', 'application/json');

	const assistant = new ActionsSdkAssistant({request: req, response: res});

	/*req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        })*/



	  textResponse = "" //Default response from the webhook to show it's working

		var requestScrape = require("request");

		console.log(req.body);

		const reqBody = req.body;
		var datePeriod = ""
		if(!isEmptyObject(reqBody.result.parameters)){
				datePeriod = reqBody.result.parameters["date-period"]
				if(!datePeriod){
					datePeriod = reqBody.result.parameters["date"]
				}
		} 

		if(!datePeriod){
			var date = new Date();
		} else {
			if(datePeriod.includes('/')){
				var date = dateAndTime.parse(datePeriod.substr(0, datePeriod.indexOf('/')), 'YYYY-MM-DD')
			} else {
				var date =dateAndTime.parse(datePeriod)
			}
		}

		
		var year = date.getFullYear();
		var formatter = new Intl.DateTimeFormat("en-us", { month: "long" }),
   		month = formatter.format(date);	
   		month = month.toLowerCase();

		console.log("https://www.humblebundle.com/monthly/p/" + month + "_" + year + "_monthly")

		requestScrape({
		  uri: "https://www.humblebundle.com/monthly/p/" + month + "_" + year + "_monthly",
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

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}


module.exports = appRouter;
