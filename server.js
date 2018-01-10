const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/login', { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db");
});

app.get('/', (req, res, next) => {
    res.sendFile('public/index.html');
});

app.listen(port, ()=> {
    console.log("App listening on port: " + port);
});
