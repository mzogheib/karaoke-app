require('./api/db/db.js');
const express = require('express')
const app = express()
const routes = require('./api/routes');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api', routes)

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
