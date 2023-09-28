const express = require("express");
const app = express();

app.get('/users', (req, res, next) => { console.log(1);
    next();
}, (req, res, next) => {
    console.log(2);
    next('route');
}, (req, res, next) => {
    console.log(3);
    next('something');
});
app.get('/users', (req, res, next) => { console.log(4);
res.status(200).send('Success!'); });
app.use((err, req, res, next) => { console.log(5);
res.status(500).send('Try later');
});

const server = app.listen(3000, function() {
    console.log("Server running at http://localhost:" + server.address().port);
});