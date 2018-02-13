var appRouter = function(app) {
app.get("/", function(req, res) {
      res.send("Hello World");
  });

app.post("/local_time", function(req, res) {
      res.send("{\r\n\"messages\": [\r\n  {\r\n    \"speech\": \"It is 4pm in there\",\r\n    \"type\": 0\r\n  },\r\n  {\r\n    \"speech\": \"It is 4pm in there\",\r\n    \"type\": 0\r\n  }\r\n]\r\n}");
  });
}


module.exports = appRouter;
