const express = require('express');
const app = express ();
const port = process.env.PORT || 4000;

const indexRoute = require('./routes/index.js');
const postRoute = require('./routes/post.js');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.use('/', indexRoute);
app.use('/receive', postRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));