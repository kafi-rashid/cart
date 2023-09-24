const express = require("express");
const app = express();
const routes = require("./routes/routes");

app.use(express.json());
  
app.use("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use("/", routes);

const server = app.listen(3000, function() {
    console.log("Server running at http://localhost:" + server.address().port);
});