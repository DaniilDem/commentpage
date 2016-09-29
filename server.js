var express = require('express'),
    cors = require('cors'),
    conform = require('conform'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
//-----

MongoClient.connect('mongodb://localhost:27017/commentdb', function (err, db)
{
    if (err)
    {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else
    {
        console.log('Connection established');

        // do some work here with the database.

        app.get('/api/commentsList', function (req, res)
        {

            var comments = db.collection('comments').find();
            comments.toArray(function (err, comment)
            {
                res.status(200).json({'commentsArray': comment.reverse()});
            });
        });

        app.post('/api/commentForm', function (req, res)
        {

            var comment = req.body;

            var validStatus = conform.validate(comment, {
                properties: {
                    nameInput: {
                        description: 'user name',
                        type: 'string',
                        minLength: 3,
                        required: true
                    },
                    themeInput: {
                        description: 'user theme',
                        type: 'string',
                        minLength: 3,
                        required: true
                    },
                    commentInput: {
                        description: 'user comment',
                        type: 'string',
                        minLength: 5,
                        required: true
                    }
                }
            });

            if (validStatus.valid)
            {
                var commentsCollection = db.collection('comments');

                comment.timestamp = Date.now();

                commentsCollection.insert([comment], function (err, result)
                {
                    if (err)
                    {
                        console.log(err);

                        res.status(500).json({error:'not insert to db collection'});

                    } else
                    {
                        console.log('Inserted %d documents into the "comments" collection. The documents inserted with "_id" are:', result.length, result);

                        res.status(200).json({});//TODO: edit, this not true way

                    }
                });
            }
            else
            {
                res.status(500).json({error:validStatus.errors});
            }

        });

        app.listen(1337, function ()
        {
            console.log('Express server listening on port 1337');
        });


        //Close connection
        // db.close();
    }
});

