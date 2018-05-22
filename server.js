const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port 			 = 8000;
const db             = require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }));

console.log(db.url);

var banco = null;

app.listen(port, () => {
	console.log('We are live on ' + port);
});

MongoClient.connect(db.url, function(err,database) {
    if (err) 
    	console.error(err)
    
    banco = database.db('okr_ventron');

    require('./app/routes')(app, banco);

})