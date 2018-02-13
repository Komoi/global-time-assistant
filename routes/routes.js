var appRouter = function(app) {
app.get("/", function(req, res) {
      res.send("Hello World");
  });

app.post("/local_time", function(req, res) {
	  //res.setHeader("Content-Type", "application/json" );
	 // res.writeHead(200);
	 //res.set('Content-Type', 'application/json');
 response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working


  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response   }));

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
