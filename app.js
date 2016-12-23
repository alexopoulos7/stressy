
'use strict';

// set up ========================
let express  = require('express');
let app      = express();                               // create our app w/ express
let bodyParser = require('body-parser');    // pull information from HTML POST (express4)
let stress = require('./controllers/stress.js')
// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.post('/api/stress', (req,res) =>{
    console.log('We got a stress command!');
    let start = stress(req);
    res.json(start);
})
app.use('/bower_components', express.static('bower_components'));

// listen (start app with node server.js) ======================================
let port = process.env.PORT || 3131

app.listen(port);
console.log(`App listening on port ${port}`);
