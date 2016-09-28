var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
//-----

MongoClient.connect('mongodb://localhost:27017/commentdb', function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established');

        // do some work here with the database.

        app.post('/api/commentForm', function(req, res) {

            var comment = req.body;

            var commentsCollection = db.collection('comments');

            commentsCollection.insert([comment], function (err, result) {
                if (err) {
                    console.log(err);

                    res.send({status:'fail'});
                    
                } else {
                    console.log('Inserted %d documents into the "comments" collection. The documents inserted with "_id" are:', result.length, result);

                    res.send({status:'ok'});

                }
            });


        });

        app.listen(1337, function(){
            console.log('Express server listening on port 1337');
        });


        //Close connection
        // db.close();
    }
});

