const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

express.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.sendFile('public/index.html');
});

app.listen(port, ()=> {
    console.log("App listening on port: " + port);
});
