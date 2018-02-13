var appRouter = function(app) {
app.get("/", function(req, res) {
      res.send("Hello World");
  });
}

app.post("/local_time", function(req, res) {
      res.send("4:20 pm");
  });
}
module.exports = appRouter;
