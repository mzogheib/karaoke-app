const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
